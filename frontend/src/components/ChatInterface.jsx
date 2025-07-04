import React, { useEffect, useRef } from "react";
import MessageInput from "./MessageInput";

export default function ChatInterface({ messages, onSubmit, step }) {
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-white text-black rounded-lg p-4 shadow-xl border-2 border-black min-h-[500px] flex flex-col">
      <div className="space-y-2 mb-4 max-h-[400px] overflow-y-auto flex-grow">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[80%] px-4 py-2 rounded-lg ${
              msg.from === "bot"
                ? "bg-gray-200 text-left"
                : "bg-[#C3073F] text-white self-end ml-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSubmit={onSubmit} step={step} />
    </div>
  );
}
