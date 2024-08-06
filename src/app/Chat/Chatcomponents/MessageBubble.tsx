"use client";
import React, { useState, useRef, useEffect } from "react";

interface MessageBubbleProps {
  messageId: string;
  message: string;
  isOwnMessage?: boolean;
  timestamp?: string;
  onEdit: (messageId: string, newMessage: string) => void;
  onDelete: (messageId: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  messageId,
  message,
  isOwnMessage,
  timestamp,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message);
  const [inputWidth, setInputWidth] = useState<string | number>("auto");
  const messageRef = useRef<HTMLDivElement>(null);
  const [currMessage, setCurrMessage] = useState(message);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (messageRef.current && !isEditing) {
      setInputWidth(messageRef.current.offsetWidth);
    }
  }, [isEditing]);

  const formattedTimestamp = timestamp
    ? new Date(timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const handleEdit = () => {
    onEdit(messageId, editedMessage);
    setIsEditing(false);
    setCurrMessage(editedMessage);
  };

  const handleDelete = () => {
    onDelete(messageId);
    setShowDeleteConfirm(false);
  };

  return (
    <div
      className={`p-2 mb-2 flex ${
        isOwnMessage ? "justify-end" : "justify-start"
      }`}
    >
      <div
        ref={messageRef}
        className={`p-3 rounded-lg max-w-[80%] min-w-auto ${
          isOwnMessage ? "bg-[#65AD87] text-white" : "bg-gray-100"
        }`}
        style={{ backgroundColor: isOwnMessage ? "#65AD87" : "#f1f1f1" }}
      >
        {isEditing ? (
          <div>
            <input
              type="text"
              
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              className={`bg-[#65AD87] w-full rounded-lg text-white border-none outline-none`}
              style={{
                backgroundColor: isOwnMessage ? "#65AD87" : "#f1f1f1",
                width: inputWidth,
                
              }}
            />
            <div>
              {timestamp && (
                <div
                  className={`text-xs text-gray-500 mt-1 ${
                    isOwnMessage ? "text-right" : "text-left"
                  }`}
                >
                  {formattedTimestamp}
                </div>
              )}

              <div className="flex justify-end mt-2">
                <button
                  onClick={handleEdit}
                  className="text-xs text-white mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="text-xs text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {currMessage}
            {timestamp && (
              <div
                className={`text-xs text-gray-500 mt-1 ${
                  isOwnMessage ? "text-right" : "text-left"
                }`}
              >
                {formattedTimestamp}
              </div>
            )}

            {isOwnMessage && (
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs text-gray-200 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="text-xs text-red-300"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
        {showDeleteConfirm && (
          <div className="fixed inset-1 flex items-center justify-center bg-gray-800 bg-opacity-35 z-50">
            <div className="bg-white text-black p-4 rounded-lg">
              <p>Are you sure you want to delete this message?</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="text-xs text-gray-500 mr-4"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="text-xs text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
