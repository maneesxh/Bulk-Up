import React from "react";
import ReactMarkdown from "react-markdown";

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

  return (
    <div className="bg-white p-6 rounded-lg shadow-2xl border-4 border-black ring-2 ring-black hover:ring-[#C3073F] transition-all duration-300 max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-extrabold text-black text-center mb-4 uppercase tracking-wide">
        Your Personalized Meal Plan
      </h2>

      <div className="prose max-w-none text-black">
        {typeof plan === "string" ? (
          <ReactMarkdown>{plan}</ReactMarkdown>
        ) : (
          <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(plan, null, 2)}</pre>
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
