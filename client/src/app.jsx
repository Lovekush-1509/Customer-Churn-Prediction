import './app.css'
import React, { useEffect, useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import UserPredictionCard from "./UserPredictionCard";


const COLORS = ["#ff4d4d", "#00ff88"];

export function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Handle CSV Upload
  const handleFileUpload = async(e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file); 
      setLoading(true); 
      // console.log("formData:----------------------------", formData);
        try {
          const response = await fetch(
            "https://customer-churn-prediction-4964.onrender.com/pre",
            {
              method: "POST",
              body: formData,
            }
          );

          const result = await response.json();
          // console.log("response:----------------------------", result);
          setData(result);
        } catch (error) {
          console.error(error);
        }

        setLoading(false);
  };

  const cleanPrediction = (text) =>
    text?.replace(/\n/g, " ").toLowerCase() || "";

  const stats = useMemo(() => {
    if (!data.length) return {};

    const total = data.length;
    const churnCount = data.filter((item) =>
      cleanPrediction(item.Churn_Prediction).includes("churn")
    ).length;

    const stayCount = total - churnCount;

    const avgMonthly =
      data.reduce(
        (sum, item) => sum + Number(item.MonthlyCharges || 0),
        0
      ) / total;

    return {
      total,
      churnRate: ((churnCount / total) * 100).toFixed(1),
      retentionRate: ((stayCount / total) * 100).toFixed(1),
      avgMonthly: avgMonthly.toFixed(2),
    };
  }, [data]);

  const pieData = [
    { name: "Churn", value: Number(stats.churnRate || 0) },
    { name: "Stay", value: Number(stats.retentionRate || 0) },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-8">

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">
          Customer Churn Intelligence Dashboard
        </h1>
        <p className="text-gray-300 mt-2">
          Upload CSV to generate predictions
        </p>
      </div>

      {/* CSV Upload */}
      <div className="flex justify-center mb-10">
        <label className="bg-white/10 backdrop-blur-xl px-6 py-4 rounded-2xl cursor-pointer hover:bg-white/20 transition">
          <span className="font-semibold">Upload CSV File</span>
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
      </div>

      {loading && (
        <p className="text-center text-lg animate-pulse">
          Processing CSV...
        </p>
      )}

      {data.length > 0 && (
        <>
          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-10">
            <StatCard title="Total Customers" value={stats.total} />
            <StatCard title="Churn Rate" value={`${stats.churnRate}%`} red />
            <StatCard
              title="Retention Rate"
              value={`${stats.retentionRate}%`}
              green
            />
            <StatCard
              title="Avg Monthly Charges"
              value={`$${stats.avgMonthly}`}
            />
          </div>

          {/* Donut */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              Churn vs Stay
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={80}
                  outerRadius={110}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

        {/* Display Predictions */}
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {data.map((user, index) => (
            <UserPredictionCard key={index} user={user} />
          ))}
        </div>
    </div>
  );
}

function StatCard({ title, value, red, green }) {
  return (
    <div
      className={`bg-white/10 backdrop-blur-xl rounded-2xl p-6 text-center shadow-xl
      ${red ? "border border-red-500" : ""}
      ${green ? "border border-green-400" : ""}`}
    >
      <p className="text-gray-300 text-sm">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
}