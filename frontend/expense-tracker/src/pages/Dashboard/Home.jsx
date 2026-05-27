import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import InfoCard from "../../components/Cards/InfoCard";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const Home = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      setDashboardData(response.data);
    } catch (error) {
      console.log("Dashboard error:", error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  if (!dashboardData) return <DashboardLayout>Loading...</DashboardLayout>;

  const chartData = [
    { name: "Total Balance", value: dashboardData.totalBalance },
    { name: "Total Income", value: dashboardData.totalIncome },
    { name: "Total Expenses", value: dashboardData.totalExpenses },
  ];

  const COLORS = ["#7c3aed", "#f97316", "#ef4444"];

  const expenseBarData =
    dashboardData?.last30DaysExpenses?.transactions?.map((txn) => ({
      name: txn.category,
      amount: txn.amount,
    })) || [];

  const incomeChartData =
    dashboardData?.last30DaysIncome?.transactions?.map((txn) => ({
      name: txn.source,
      value: txn.amount,
    })) || [];

  const incomeColors = ["#7c3aed", "#ef4444", "#f97316", "#4338ca"];

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <InfoCard title="Total Balance" value={dashboardData.totalBalance} />
        <InfoCard title="Total Income" value={dashboardData.totalIncome} />
        <InfoCard title="Total Expenses" value={dashboardData.totalExpenses} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-5">Recent Transactions</h2>

          <div className="space-y-4">
            {dashboardData.recentTransactions?.map((txn) => (
              <div key={txn._id} className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium">
                    {txn.type === "income" ? txn.source : txn.category}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {new Date(txn.date).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`text-sm font-semibold ${
                    txn.type === "income" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {txn.type === "income" ? "+" : "-"} ${txn.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-5">Financial Overview</h2>

          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Legend wrapperStyle={{ fontSize: "15px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 w-full">
        <div className="bg-white rounded-2xl p-5 shadow-sm min-w-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold mb-5">Expenses</h2>

            <button className="text-sm bg-gray-100 px-4 py-2 rounded-lg">
              See All →
            </button>
          </div>

          <div className="space-y-4">
            {dashboardData?.last30DaysExpenses?.transactions?.length > 0 ? (
              dashboardData.last30DaysExpenses.transactions
                .slice(0, 5)
                .map((txn) => (
                  <div
                    key={txn._id}
                    className="flex justify-between border-b pb-3"
                  >
                    <div>
                      <h3 className="text-base font-medium">{txn.category}</h3>
                      <p className="text-xs text-gray-400">
                        {new Date(txn.date).toLocaleDateString()}
                      </p>
                    </div>

                    <span className="text-sm font-semibold text-red-500">
                      - ${txn.amount}
                    </span>
                  </div>
                ))
            ) : (
              <p className="text-sm text-gray-400">
                No expenses in last 30 days.
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm min-w-0">
          <h2 className="text-xl font-semibold mb-5">Last 30 Days Expenses</h2>

          <div className="h-72 w-full overflow-x-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={expenseBarData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Income Transactions */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold mb-5">Income</h2>

            <button className="text-sm bg-gray-100 px-4 py-2 rounded-lg">
              See All →
            </button>
          </div>

          <div className="space-y-5">
            {dashboardData?.last30DaysIncome?.transactions
              ?.slice(0, 5)
              .map((txn) => (
                <div
                  key={txn._id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-base font-medium">{txn.source}</h3>

                    <p className="text-xs text-gray-400">
                      {new Date(txn.date).toLocaleDateString()}
                    </p>
                  </div>

                  <span className="text-green-600 text-sm font-semibold">
                    + ${txn.amount}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Income Pie Chart */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-xl font-semibold mb-5">Last 30 Days Income</h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incomeChartData}
                  cx="50%"
                  cy="45%"
                  innerRadius={70}
                  outerRadius={100}
                  dataKey="value"
                >
                  {incomeChartData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={incomeColors[index % incomeColors.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    fontSize: "12px",
                    borderRadius: "10px",
                  }}
                />

                <Legend wrapperStyle={{ fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
