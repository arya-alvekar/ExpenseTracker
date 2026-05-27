import React, { useState } from "react";

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!expense.category || !expense.amount || !expense.date) return;

    onAddExpense({
      category: expense.category,
      amount: Number(expense.amount),
      date: expense.date,
      icon: expense.icon,
    });
  };

  return (
    <div>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Expense Category</label>
          <input
            name="category"
            value={expense.category}
            onChange={handleChange}
            placeholder="Rent, Shopping, Travel, etc"
            className="text-sm font-medium w-full mt-2 px-4 py-3 bg-gray-50 border rounded-lg outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Amount</label>
          <input
            name="amount"
            type="number"
            value={expense.amount}
            onChange={handleChange}
            className="text-sm font-medium w-full mt-2 px-4 py-3 bg-gray-50 border rounded-lg outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Date</label>
          <input
            name="date"
            type="date"
            value={expense.date}
            onChange={handleChange}
            className="text-sm font-medium w-full mt-2 px-4 py-3 bg-gray-50 border rounded-lg outline-none"
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium"
          >
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseForm;