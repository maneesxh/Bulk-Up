import React, { useState } from "react";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import ChatInterface from "./components/ChatInterface";
import chatbotLogic from "./utils/chatbotLogic";

export default function App() {
  const [messages, setMessages] = useState([
    { from: "bot", text: chatbotLogic.start.text }
  ]);
  const [step, setStep] = useState(chatbotLogic.start);

  const handleUserInput = async (input) => {
  const updatedMessages = [...messages, { from: "user", text: input }];

  // Validate input
  if (step.validate && !step.validate(input)) {
    updatedMessages.push({
      from: "bot",
      text: "⚠️ Please enter a valid input.",
    });
    setMessages(updatedMessages);
    return;
  }

  // Save the answer and get the next step
  const nextStep = await chatbotLogic.getNextStep(step.key, input);

  // Add bot response if available
  if (nextStep.response) {
    updatedMessages.push({ from: "bot", text: nextStep.response });
  } else if (nextStep.text) {
    updatedMessages.push({ from: "bot", text: nextStep.text });
  }

  // Auto-submit handled inside chatbotLogic
  setMessages(updatedMessages);
  setStep(nextStep);
};


  return (
    <div className="min-h-screen flex flex-col bg-[#0B0C10] text-white">
      <Hero />
      <div className="flex-grow p-4 sm:p-6 max-w-4xl mx-auto z-10">
        <ChatInterface messages={messages} onSubmit={handleUserInput} step={step} />
      </div>
      <Footer />
    </div>
  );
}
