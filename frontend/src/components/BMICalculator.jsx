import React from "react";

function calculateBMI(height_cm, weight_kg) {
  if (!height_cm || !weight_kg) return null;
  const height_m = height_cm / 100;
  const bmi = weight_kg / (height_m * height_m);
  return parseFloat(bmi.toFixed(1));
}

function getBMICategory(bmi) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export default function BMICalculator({ height_cm, weight_kg }) {
  const bmi = calculateBMI(height_cm, weight_kg);
  const category = bmi ? getBMICategory(bmi) : null;

  // Map BMI (10 to 40 range) to bar position percentage
  const getPosition = () => {
    const minBMI = 10;
    const maxBMI = 40;
    const clamped = Math.min(Math.max(bmi, minBMI), maxBMI);
    return `${((clamped - minBMI) / (maxBMI - minBMI)) * 100}%`;
  };

  return (
    bmi && (
      <div className="bg-white mt-8 p-6 rounded-lg shadow-2xl border-4 border-black ring-2 ring-black max-w-3xl mx-auto transition-all">
        <h2 className="text-2xl font-extrabold text-black text-center mb-6">
          Your BMI: {bmi} ({category})
        </h2>

        {/* BMI Spectrum Bar */}
        <div className="relative h-6 rounded-full overflow-hidden bg-gradient-to-r from-red-500 via-green-500 to-red-500">
          {/* Dot Indicator */}
          <div
            className="absolute top-[-6px] w-6 h-6 bg-black border-2 border-white rounded-full shadow-xl transition-all duration-700 ease-in-out"
            style={{ left: `calc(${getPosition()} - 12px)` }}
            title={`BMI: ${bmi}`}
          ></div>
        </div>

        {/* Category Labels */}
        <div className="flex justify-between mt-3 text-sm font-bold text-black px-1">
          <span>Underweight</span>
          <span>Normal</span>
          <span>Overweight</span>
          <span>Obese</span>
        </div>
      </div>
    )
  );
}
