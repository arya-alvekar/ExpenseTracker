import React, { useState } from "react";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (e) => {
    setIncome({ ...income, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!income.source || !income.amount || !income.date) return;

    onAddIncome({
      source: income.source,
      amount: Number(income.amount),
      date: income.date,
      icon: income.icon,
    });
  };

  return (
    <div>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Income Source</label>
          <input
            name="source"
            value={income.source}
            onChange={handleChange}
            placeholder="Freelance, Salary, etc"
            className="text-sm font-medium w-full mt-2 px-4 py-3 bg-gray-50 border rounded-lg outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Amount</label>
          <input
            name="amount"
            type="number"
            value={income.amount}
            onChange={handleChange}
            className="text-sm font-medium w-full mt-2 px-4 py-3 bg-gray-50 border rounded-lg outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Date</label>
          <input
            name="date"
            type="date"
            value={income.date}
            onChange={handleChange}
            className="text-sm font-medium w-full mt-2 px-4 py-3 bg-gray-50 border rounded-lg outline-none"
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium"
          >
            Add Income
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddIncomeForm;