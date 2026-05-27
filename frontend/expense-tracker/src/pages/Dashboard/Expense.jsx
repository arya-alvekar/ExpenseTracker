import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";

const Expense = () => {
  const [expenseData, setExpenseData] = useState([]);

  const fetchExpenses = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.GET_ALL_EXPENSE
      );

      setExpenseData(
        Array.isArray(response.data)
          ? response.data
          : response.data.expense ||
              response.data.expenses ||
              response.data.data ||
              []
      );
    } catch (error) {
      console.log("Expense error:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const chartData = expenseData.map((item) => ({
    name: new Date(item.date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    }),
    amount: item.amount,
  }));

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Download expense error:", error);
    }
  };

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  const handleAddExpense = async (expense) => {
    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, expense);
      setOpenAddExpenseModal(false);
      fetchExpenses();
    } catch (error) {
      console.log("Add expense error:", error);
    }
  };

  const handleDeleteExpense = async () => {
    try {
      await axiosInstance.delete(
        API_PATHS.EXPENSE.DELETE_EXPENSE(selectedExpenseId)
      );

      setShowDeleteModal(false);
      setSelectedExpenseId(null);
      fetchExpenses();
    } catch (error) {
      console.log("Delete expense error:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">Expense Overview</h2>
            <p className="text-xs font-semibold text-gray-400">
              Track your spending trends over time and gain insights into where
              your money goes.
            </p>
          </div>

          <button
            onClick={() => setOpenAddExpenseModal(true)}
            className="text-sm font-medium bg-purple-50 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100 transition"
          >
            + Add Expense
          </button>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient
                  id="expenseGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />

              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  fontSize: "12px",
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
                labelStyle={{
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              />

              <Area
                type="monotone"
                dataKey="amount"
                stroke="#8b5cf6"
                strokeWidth={3}
                fill="url(#expenseGradient)"
                dot={{
                  r: 4,
                  fill: "#8b5cf6",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">All Expenses</h2>

          <button
            onClick={handleDownloadExpenseDetails}
            className="text-sm font-medium bg-purple-50 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100 transition"
          >
            Download
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {expenseData.map((item) => (
            <div
              key={item._id}
              className="group flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition"
            >
              <div>
                <h3 className="text-base font-medium">{item.category}</h3>
                <p className="text-xs text-gray-400">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-red-500 text-sm font-semibold bg-red-50 px-3 py-1 rounded-lg">
                  - ${item.amount}
                </span>

                <button
                  onClick={() => {
                    setSelectedExpenseId(item._id);
                    setShowDeleteModal(true);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-red-500 text-xs font-medium transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {openAddExpenseModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-lg">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-xl font-semibold">Add Expense</h2>
              <button
                onClick={() => setOpenAddExpenseModal(false)}
                className="text-gray-500 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-5">
              <AddExpenseForm onAddExpense={handleAddExpense} />
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-lg">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-xl font-semibold">Delete Expense</h2>

              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-400 text-xl"
              >
                ×
              </button>
            </div>

            <div className="p-5">
              <p className="text-gray-600 text-sm font-semibold">
                Are you sure you want to delete this expense detail?
              </p>

              <div className="flex justify-end mt-6">
                <button
                  onClick={handleDeleteExpense}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Expense;
