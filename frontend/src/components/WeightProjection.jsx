import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function WeightProjection({ currentWeight, goal, activityLevel }) {
  if (!currentWeight || !goal || !activityLevel) return null;

  // Determine weekly change in weight
  const getWeeklyChange = () => {
    let baseChange = goal === "weight gain" ? 0.5 : -0.5; // default 0.5 kg/week gain or loss

    switch (activityLevel) {
      case "sedentary":
        return baseChange * 0.75;
      case "moderate":
        return baseChange;
      case "active":
        return baseChange * 1.25;
      default:
        return baseChange;
    }
  };

  const weeklyChange = getWeeklyChange();

  const labels = Array.from({ length: 8 }, (_, i) => `Week ${i + 1}`);
  const projectedWeights = labels.map((_, i) =>
    (parseFloat(currentWeight) + weeklyChange * (i + 1)).toFixed(1)
  );

  const data = {
    labels,
    datasets: [
      {
        label: `Projected Weight (${goal})`,
        data: projectedWeights,
        borderColor: goal === "weight gain" ? "#21BF73" : "#C3073F",
        backgroundColor: "rgba(0,0,0,0.2)",
        tension: 0.4,
        pointRadius: 4,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Weight (kg)",
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl mt-6 text-black max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">📈 8-Week Weight Projection</h2>
      <Line data={data} options={options} />
    </div>
  );
}
