"use client";
import React, { useEffect, useState, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { useProfile } from "../../stores/UserStore";
import Icebreaker from "@/app/components/icebreakerComponents/icebreaker";

interface ChatProps {
  friendId: string | null;
  chatroom: string | null;
}

interface Message {
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
  _id: string;
  imageUrl?: string;
}

const Chat: React.FC<ChatProps> = ({ friendId, chatroom }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const profile = useProfile();
  const userId = profile.userId;
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [first, setFirst] = useState<Boolean>(true);

  useEffect(() => {
    console.log(
      "useEffect triggered with friendId:",
      friendId,
      "and userId:",
      userId
    );

    const fetchMessages = async () => {
      if (friendId && userId) {
        try {
          console.log("Fetching messages for:", {
            senderId: userId,
            receiverId: friendId,
          });
          const response = await fetch(
            `/api/chats/getmessage?chatroom=${chatroom}`
          );
          if (!response.ok) throw new Error("Failed to fetch messages");
          const data = await response.json();
          //convert object
          console.log("Fetched messages:", data);
          if (data && Array.isArray(data.messages)) {
            setMessages(data.messages);
          } else {
            console.error("Fetched data is not in the expected format:", data);
          }
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();

    if (eventSource) {
      console.log("Closing previous EventSource");
      eventSource.close();
    }

    if (friendId && userId) {
      const newEventSource = new EventSource(
        `/api/streamMessages?chatroom=${chatroom}&senderId=${userId}`
      );
      console.log("New EventSource created:", newEventSource);

      newEventSource.onmessage = (event) => {
        console.log("Received event:", event.data);
        try {
          setFirst(false);
          const newMessage: Message = JSON.parse(event.data);
          console.log("Parsed new message:", newMessage);
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages, newMessage];
            console.log("Updated messages:", updatedMessages);
            return updatedMessages;
          });
        } catch (error) {
          console.error("Error parsing message data:", error);
        }
      };

      newEventSource.onerror = (error) => {
        console.error("SSE error:", error);
        newEventSource.close();
      };

      setEventSource(newEventSource);

      return () => {
        console.log("Cleaning up EventSource");
        newEventSource.close();
      };
    }
  }, [friendId, userId]);

  useEffect(() => {
    console.log("Messages updated:", messages);
    first
      ? bottomRef.current?.scrollIntoView({ behavior: "auto" }) // Auto Scroll to bottom on first render
      : bottomRef.current?.scrollIntoView({ behavior: "smooth" }); // Smooth Scroll to bottom on messages update
  }, [messages]);

  useEffect(() => {
    console.log("EventSource updated:", eventSource);
  }, [eventSource]);

  const handleEditMessage = async (messageId: string, newMessage: string) => {
    try {
      const response = await fetch("/api/chats/editmessage", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messageId, newMessage,chatroomId: chatroom }),
      });

      if (response.ok) {
        console.log("Message Edited Successfully");
      } else {
        console.error("Error editing message");
      }
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === messageId ? { ...msg, message: newMessage } : msg
        )
      );
    } catch (error) {
      console.error("Error editing message:", error);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      const response = await fetch("/api/chats/deletemessage", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messageId, chatroomId: chatroom }),
      });

      if (response.ok) {
        console.log("Message Deleted Successfully");
      } else {
        console.error("Error deleting message");
      }

      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== messageId)
      );
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };
  const handleSend = async (
    message: string,
    timestamp: string,
    image?: File
  ) => {
    if (friendId && userId) {
      try {
        const formData = new FormData();
        formData.append("senderId", userId);
        formData.append("receiverId", friendId);
        formData.append("message", message);
        formData.append("timestamp", timestamp);
        if (image) {
          formData.append("image", image);
        }
        console.log("Sending message:", formData);

        const response = await fetch("/api/chats/sendmessage", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Failed to send message");
        const newMessage = await response.json();
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div
      className="flex flex-col h-[630px] rounded-lg shadow-lg relative bg-cover bg-center  overflow-y-auto custom-scrollbar"
      style={{ backgroundImage: "url('/assets/extras/bga2.png')" }}
    >
      <div className="absolute inset-0 bg-[rgba(124,181,151,0.3)]"></div>{" "}
      {/* Overlay */}
      <div className="relative flex flex-col h-full">
        <ChatHeader friendId={friendId} />
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <Icebreaker userId={userId} friendId={friendId} />
          </div>
        </div>
        <div className="flex-1 p-4 overflow-y-auto h-0 chat-messages-container">
          <div className="flex flex-col ">
            {messages.map((msg) => (
              <MessageBubble
                messageId={msg._id}
                message={msg.message}
                isOwnMessage={msg.senderId === userId}
                timestamp={msg.timestamp}
                image={msg.imageUrl}
                onEdit={handleEditMessage}
                onDelete={handleDeleteMessage}
              />
            ))}
            <div ref={bottomRef} />
          </div>
        </div>
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default Chat;
