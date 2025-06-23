import React, { useState } from "react";

export default function Form({ onSubmit }) {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height_cm: "",
    weight_kg: "",
    activity_level: "",
    goal: "",
    diet_type: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-2xl ring-2 ring-[#000000] hover:ring-[#C3073F] transition-all duration-300 space-y-4 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-extrabold text-black mb-2 text-center uppercase tracking-wide">
        Enter Your Details
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="bg-white text-black p-3 rounded border border-black focus:outline-none focus:ring-2 focus:ring-black"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="bg-white text-black p-3 rounded border border-black focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input
          type="number"
          name="height_cm"
          placeholder="Height (cm)"
          value={formData.height_cm}
          onChange={handleChange}
          className="bg-white text-black p-3 rounded border border-black focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="number"
          name="weight_kg"
          placeholder="Weight (kg)"
          value={formData.weight_kg}
          onChange={handleChange}
          className="bg-white text-black p-3 rounded border border-black focus:outline-none focus:ring-2 focus:ring-black"
        />

        <select
          name="activity_level"
          value={formData.activity_level}
          onChange={handleChange}
          className="bg-white text-black p-3 rounded border border-black focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Activity Level</option>
          <option value="sedentary">Sedentary</option>
          <option value="moderate">Moderate</option>
          <option value="active">Active</option>
        </select>

        <select
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          className="bg-white text-black p-3 rounded border border-black focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Goal</option>
          <option value="weight loss">Weight Loss</option>
          <option value="weight gain">Weight Gain</option>
          <option value="weight maintenance">Weight Maintenance</option>
        </select>

        <select
          name="diet_type"
          value={formData.diet_type}
          onChange={handleChange}
          className="bg-white text-black p-3 rounded border border-black focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Diet Type</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="non-vegetarian">Non-Vegetarian</option>
          <option value="vegan">Vegan</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full mt-4 bg-black text-white p-3 rounded-lg font-bold text-lg shadow-md hover:bg-[#C3073F] transition-all duration-300"
      >
        Generate Plan
      </button>
    </form>
  );
}
