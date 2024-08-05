import { MongoClient, ChangeStreamDocument, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

let client: MongoClient | null = null;

async function initClient() {
  if (!client) {
    const uri = process.env.MONGODB_URI!;
    client = new MongoClient(uri);
    await client.connect();
  }
  return client;
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  console.log("New connection");
  const chatroom = req.nextUrl.searchParams.get("chatroom");
  const currentuser = req.nextUrl.searchParams.get("senderId");

  if (!chatroom) {
    return NextResponse.json(
      { message: "chatroom is required" },
      { status: 400 }
    );
  }

  try {
    const client = await initClient();
    const db = client.db("test");
    const collection = db.collection("chatrooms");
    console.log("Starting change stream");

    const pipeline = [
      {
        $match: {
          "fullDocument._id": new ObjectId(chatroom),
        },
      },
    ];

    const changeStream = collection.watch(pipeline, {
      fullDocument: "updateLookup",
    });

    const resStream = new TransformStream();
    const writer = resStream.writable.getWriter();
    const encoder = new TextEncoder();

    // Send a ping every 10 seconds to keep the connection alive
    const pingInterval = setInterval(() => {
      writer.write(encoder.encode("data: ping\n\n"));
    }, 10000);

    changeStream.on(
      "change",
      async (
        data: ChangeStreamDocument<Document> & {
          fullDocument?: any;
        }
      ) => {
        if (data.fullDocument) {
          console.log("--------------------");
          console.log("Starting sending res....");
          // console.log("recv", data.fullDocument.messages);

          if (
            data.fullDocument.messages[data.fullDocument.messages.length - 1]
              .senderId !== currentuser
          ) {
            await writer
              .write(
                encoder.encode(
                  `data: ${JSON.stringify(
                    data.fullDocument.messages[
                      data.fullDocument.messages.length - 1
                    ]
                  )}\n\n`
                )
              )
              .then((d) => {
                console.log(
                  "data",
                  JSON.stringify(
                    data.fullDocument.messages[
                      data.fullDocument.messages.length - 1
                    ]
                  )
                );
              });
          }
        }
      }
    );

    changeStream.on("error", (error) => {
      console.error("Change stream error:", error);
      clearInterval(pingInterval);
      writer.close();
    });

    changeStream.on("close", () => {
      console.log("Change stream closed");
      clearInterval(pingInterval);
      writer.close();
    });

    return new Response(resStream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}