import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import AddIncomeForm from "../../components/Income/AddIncomeForm";

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);

  const fetchIncome = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);

      console.log("Income response:", response.data);

      setIncomeData(
        Array.isArray(response.data)
          ? response.data
          : response.data.income || response.data.data || []
      );
    } catch (error) {
      console.log("Income error:", error);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  const chartData = incomeData.map((item) => ({
    name: new Date(item.date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    }),
    amount: item.amount,
  }));

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  const handleAddIncome = async (income) => {
    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, income);
      setOpenAddIncomeModal(false);
      fetchIncome();
    } catch (error) {
      console.log("Add income error:", error);
    }
  };

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Download income error:", error);
    }
  };

  const handleDeleteIncome = async () => {
    try {
      await axiosInstance.delete(
        API_PATHS.INCOME.DELETE_INCOME(selectedIncomeId)
      );

      setShowDeleteModal(false);
      setSelectedIncomeId(null);

      fetchIncome();
    } catch (error) {
      console.log("Delete income error:", error);
    }
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedIncomeId, setSelectedIncomeId] = useState(null);

  return (
    <DashboardLayout>
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">Income Overview</h2>
            <p
              className="text-xs font-semibold 
            text-gray-400"
            >
              Track your earnings over time and analyze your income trends.
            </p>
          </div>

          <button
            onClick={() => setOpenAddIncomeModal(true)}
            className="text-sm font-medium bg-purple-50 text-purple-600 px-4 py-2 rounded-lg"
          >
            + Add Income
          </button>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  fontSize: "12px",
                  padding: "6px",
                  borderRadius: "8px",
                }}
                labelStyle={{
                  fontSize: "12px",
                }}
                itemStyle={{
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="amount" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Income Sources</h2>

          <button
            onClick={handleDownloadIncomeDetails}
            className="text-sm font-medium bg-purple-50 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100 transition"
          >
            Download
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {incomeData.map((item) => (
            <div
              key={item._id}
              className="group flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition"
            >
              <div>
                <h3 className="text-base font-medium">{item.source}</h3>
                <p className="text-xs text-gray-400">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-green-600 text-sm font-semibold bg-green-50 px-3 py-1 rounded-lg">
                  + ${item.amount}
                </span>

                <button
                  onClick={() => {
                    setSelectedIncomeId(item._id);
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

      {openAddIncomeModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-lg">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-xl font-semibold">Add Income</h2>
              <button
                onClick={() => setOpenAddIncomeModal(false)}
                className="text-gray-500 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-5">
              <AddIncomeForm onAddIncome={handleAddIncome} />
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-lg">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-xl font-semibold">Delete Income</h2>

              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-400 text-xl"
              >
                ×
              </button>
            </div>

            <div className="p-5">
              <p className="text-gray-600 text-sm font-semibold">
                Are you sure you want to delete this income detail?
              </p>

              <div className="flex justify-end mt-6">
                <button
                  onClick={handleDeleteIncome}
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

export default Income;
