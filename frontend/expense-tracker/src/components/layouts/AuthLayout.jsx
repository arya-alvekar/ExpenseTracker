import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      
      {/* LEFT */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h1 className="text-4xl text-gray-700 mb-10">
            Expense Tracker
          </h1>

          {children}
        </div>
      </div>

      {/* RIGHT */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-600 to-pink-500 relative overflow-hidden">
        
        {/* Top Card */}
        <div className="absolute top-16 left-16 bg-white rounded-xl shadow-md px-5 py-3 w-[260px]">
          <p className="text-xs text-gray-500">
            Track Your Income & Expenses
          </p>
          <h2 className="text-lg font-semibold mt-1">$430,000</h2>
        </div>

        {/* Bottom Card */}
        <div className="absolute bottom-16 right-16 bg-white rounded-xl shadow-md p-4 w-[280px]">
          <p className="text-sm font-semibold mb-2">
            All Transactions
          </p>

          <div className="h-28 flex items-end gap-2">
            {[40, 60, 80, 50, 30, 70].map((h, i) => (
              <div
                key={i}
                className="w-3 rounded bg-gradient-to-t from-purple-600 to-purple-300"
                style={{ height: `${h}%` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;