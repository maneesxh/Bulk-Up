import React, { useState } from "react";

export default function MessageInput({ onSubmit, step }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSubmit(input.trim());
    setInput("");
  };

  const handleOptionClick = (option) => {
    onSubmit(option);
  };

  return (
    <div>
      {/* Text input only shown if no options */}
      {!step.options && (
        <form onSubmit={handleSubmit} className="flex mt-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your answer..."
            className="flex-grow p-3 border border-gray-300 rounded-l focus:outline-none text-black"
          />
          <button
            type="submit"
            className="bg-[#C3073F] text-white px-4 py-2 rounded-r font-semibold"
          >
            Send
          </button>
        </form>
      )}

      {/* Option buttons shown when step.options exist */}
      {step.options && (
        <div className="flex flex-wrap gap-2 mt-3">
          {step.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionClick(opt)}
              className="bg-black text-white px-4 py-2 rounded-full hover:bg-[#C3073F] transition-colors"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
