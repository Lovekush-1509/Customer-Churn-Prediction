import React from "react";

export default function UserPredictionCard({ user }) {
  const prediction =
    user.Churn_Prediction?.replace(/\n/g, " ").toLowerCase() || "";

  const isChurn = prediction.includes("churn");

  return (
    <div className={`bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl border
      ${isChurn ? "border-red-500" : "border-green-400"}`}>

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {user.gender === 1 ? "Male" : "Female"} Customer
        </h2>

        <span className={`px-4 py-1 rounded-full text-sm font-semibold
          ${isChurn ? "bg-red-500" : "bg-green-500"}`}>
          {isChurn ? "Going to Churn" : "Will Stay"}
        </span>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">

        <div>
          <p className="text-gray-400">Tenure</p>
          <p>{user.tenure} months</p>
        </div>

        <div>
          <p className="text-gray-400">Monthly Charges</p>
          <p>${user.MonthlyCharges}</p>
        </div>

        <div>
          <p className="text-gray-400">Total Charges</p>
          <p>${user.TotalCharges}</p>
        </div>

        <div>
          <p className="text-gray-400">Contract Type</p>
          <p>
            {user.Contract === 0
              ? "Month-to-Month"
              : user.Contract === 1
              ? "One Year"
              : "Two Year"}
          </p>
        </div>

        <div>
          <p className="text-gray-400">Senior Citizen</p>
          <p>{user.SeniorCitizen ? "Yes" : "No"}</p>
        </div>

        <div>
          <p className="text-gray-400">Internet Service</p>
          <p>
            {user.InternetService === 0
              ? "DSL"
              : user.InternetService === 1
              ? "Fiber"
              : "No Internet"}
          </p>
        </div>

      </div>
    </div>
  );
}