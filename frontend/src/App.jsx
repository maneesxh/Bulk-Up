import React, { useState } from "react";
import Hero from "./components/Hero";
import PlanDisplay from "./components/PlanDisplay";
import Footer from "./components/Footer";
import Form from "./components/Form";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';


export default function App() {
  const [plan, setPlan] = useState(null);

  const handleFormSubmit = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setPlan(data.plan);
    } catch (err) {
      console.error("Error generating plan", err);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#0B0C10] text-white">
      {/* Background image layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/949126/pexels-photo-949126.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5,
        }}
      />
      
      <div className="relative z-10 flex flex-col flex-grow">
        <Hero />
        <div className="p-4 sm:p-6 max-w-4xl mx-auto flex-grow">
          <Form onSubmit={handleFormSubmit} />
          <PlanDisplay plan={plan} />
        </div>
        <Footer />
      </div>
    </div>
  );
}
