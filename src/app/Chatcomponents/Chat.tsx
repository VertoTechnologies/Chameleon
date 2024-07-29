'use client';
import React, { useEffect, useState, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { useProfile } from "../components/slaystore";
import Icebreaker from "../components/icebreaker";

interface ChatProps {
  friendId: string | null;
}

interface Message {
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
  _id: string;
}

const Chat: React.FC<ChatProps> = ({ friendId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const profile = useProfile();
  const userId = profile.userId;
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [first, setFirst] = useState<Boolean>(true);

  useEffect(() => {
    console.log("useEffect triggered with friendId:", friendId, "and userId:", userId);

    const fetchMessages = async () => {
      if (friendId && userId) {
        try {
          console.log("Fetching messages for:", { senderId: userId, receiverId: friendId });
          const response = await fetch(`/api/getmessage?senderId=${userId}&receiverId=${friendId}`);
          if (!response.ok) throw new Error("Failed to fetch messages");
          const data = await response.json();
          console.log("Fetched messages:", data);
          setMessages(data);
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
      const newEventSource = new EventSource(`/api/streamMessages?friendId=${friendId}&userId=${userId}`);
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
      ? bottomRef.current?.scrollIntoView({ behavior: "auto" })   // Auto Scroll to bottom on first render
      : bottomRef.current?.scrollIntoView({ behavior: "smooth" }); // Smooth Scroll to bottom on messages update
  }, [messages]);

  useEffect(() => {
    console.log("EventSource updated:", eventSource);
  }, [eventSource]);

  const handleSend = async (message: string, timestamp: string) => {
    if (friendId && userId) {
      try {
        setFirst(false);
        console.log("Sending message:", { senderId: userId, receiverId: friendId, message, timestamp });
        const response = await fetch("/api/sendmessage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderId: userId,
            receiverId: friendId,
            message,
            timestamp,
          }),
        });
        if (!response.ok) throw new Error("Failed to send message");
        const newMessage = await response.json();
        console.log("Message sent successfully:", newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="flex flex-col h-full rounded-lg shadow-lg relative bg-cover bg-center" style={{ backgroundImage: "url('/assets/extras/Background.png')" }}>
      <div className="absolute inset-0 bg-[rgba(101,173,135,0.3)]"></div> {/* Overlay */}
      <div className="relative flex flex-col h-full">
        <ChatHeader friendId={friendId} />
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <Icebreaker userId={userId} friendId={friendId} />
          </div>
        </div>
        <div className="flex-1 p-4 overflow-y-auto h-0 chat-messages-container">
          <div className="flex flex-col">
            {messages.map((msg) => (
              <MessageBubble key={msg._id} message={msg.message} isOwnMessage={msg.senderId === userId} timestamp={msg.timestamp} />
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
