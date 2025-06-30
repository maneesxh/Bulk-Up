import React from "react";
import ReactMarkdown from "react-markdown";

function calculateBMI(height_cm, weight_kg) {
  if (!height_cm || !weight_kg) return null;
  const height_m = height_cm / 100;
  const bmi = weight_kg / (height_m * height_m);
  return bmi.toFixed(1);
}

function getBMICategory(bmi) {
  if (!bmi) return "Unknown";
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

function getSliderColor(bmi) {
  if (bmi < 18.5) return "bg-blue-500";
  if (bmi < 25) return "bg-green-500";
  if (bmi < 30) return "bg-yellow-500";
  return "bg-red-500";
}

export default function PlanDisplay({ plan, loading, error }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      typeof plan === "string" ? plan : JSON.stringify(plan, null, 2)
    );
    alert("Plan copied to clipboard!");
  };

  const downloadPlan = () => {
    const blob = new Blob(
      [typeof plan === "string" ? plan : JSON.stringify(plan, null, 2)],
      { type: "text/plain;charset=utf-8" }
    );
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "fitness_plan.txt";
    link.click();
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-2xl border-4 border-black ring-2 ring-black max-w-3xl mx-auto mt-6 text-center">
        <p className="text-black text-lg animate-pulse">⏳ Generating your plan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-2xl border-4 border-black ring-2 ring-black max-w-3xl mx-auto mt-6">
        <p className="text-red-600 font-bold">❌ {error}</p>
      </div>
    );
  }

  if (!plan) return null;

  const height = plan?.height_cm;
  const weight = plan?.weight_kg;
  const bmi = calculateBMI(height, weight);
  const bmiCategory = getBMICategory(bmi);
  const sliderPosition = bmi ? Math.min(Math.max((bmi - 10) * 4, 0), 100) : 0;
  const sliderColor = getSliderColor(bmi);

  return (
    <div className="bg-white p-6 rounded-lg shadow-2xl border-4 border-black ring-2 ring-black hover:ring-[#C3073F] transition-all duration-300 max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-extrabold text-black text-center mb-4 uppercase tracking-wide">
        Your Personalized Meal Plan
      </h2>

      {bmi && (
        <div className="mb-6 text-black">
          <h3 className="font-bold text-center mb-2">BMI: {bmi} ({bmiCategory})</h3>
          <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-4 ${sliderColor}`}
              style={{ width: `${sliderPosition}%` }}
            ></div>
            <div className="absolute top-[-22px] left-0 w-full text-xs flex justify-between px-1">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
          </div>
        </div>
      )}

      <div className="prose max-w-none text-black mt-4">
        {typeof plan === "string" ? (
          <ReactMarkdown>{plan}</ReactMarkdown>
        ) : (
          <pre className="whitespace-pre-wrap text-sm">
            {JSON.stringify(plan, null, 2)}
          </pre>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        <button
          onClick={copyToClipboard}
          className="bg-black text-white px-5 py-2 rounded-lg font-bold hover:bg-[#C3073F] transition-colors"
        >
          Copy Plan
        </button>
        <button
          onClick={downloadPlan}
          className="bg-black text-white px-5 py-2 rounded-lg font-bold hover:bg-[#C3073F] transition-colors"
        >
          Download Plan
        </button>
      </div>
    </div>
  );
}
