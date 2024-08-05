// pages/api/streamMessages.ts
import { IMessage } from "@/models/message";
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

  if (!chatroom) {
    return NextResponse.json({ message: "chatroom is required" }, { status: 400 });
  }

  const client = await initClient();
  const db = client.db("test");
  const collection = db.collection("chatrooms");

  console.log("Starting change stream");

  const pipeline = [
    {
      $match: {
        $or: [
          // {
          //   "fullDocument.senderId": userId,
          //   "fullDocument.receiverId": friendId,
          // },
          {
            "fullDocument._id": new ObjectId(chatroom),
            
          },
        ],
      },
    },
  ];

  const changeStream = collection.watch(pipeline, {
    fullDocument: "updateLookup",
  });

  const resStream = new TransformStream();
  const writer = resStream.writable.getWriter();
  const encoder = new TextEncoder();

  // const sendPing = () => {
  //   writer.write(encoder.encode(": ping\n\n"));
  // };

  // const pingInterval = setInterval(sendPing, 15000); // Send a ping every 15 seconds

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
        const document = {
          ...data.fullDocument,
          _id: (data.fullDocument?._id as ObjectId).toString(), // Convert ObjectId to string
        };

        await writer
          .write(
            encoder.encode(`data: ${JSON.stringify(document.messages)}\n\n`)
          )
          .then((d) => {
            console.log("data", d);
          });
      }
    }
  );

  // changeStream.on("error", (error) => {
  //   console.error("Change stream error:", error);
  //   // clearInterval(pingInterval);
  //   writer.close();
  // });

  // changeStream.on("close", () => {
  //   console.log("Change stream closed");
  //   // clearInterval(pingInterval);
  //   writer.close();
  // });

  return new Response(resStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
