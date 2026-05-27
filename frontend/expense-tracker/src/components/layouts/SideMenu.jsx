import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const SideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Income",
      path: "/income",
    },
    {
      label: "Expense",
      path: "/expense",
    },
  ];

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const { user } = useContext(UserContext);

  return (
    <div className="w-64 h-[calc(100vh-65px)] bg-white border-r border-gray-200 p-5">
      <div className="mb-10">
        <div className="w-20 h-20 rounded-full bg-purple-100 mx-auto mb-3"></div>

        <h2 className="text-center text-lg font-semibold">
          {user?.fullName || "User"}
        </h2>
      </div>

      <div className="space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full text-left text-sm px-4 py-3 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-purple-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {item.label}
          </button>
        ))}

        <button
          onClick={logout}
          className="w-full text-left text-sm px-4 py-3 rounded-lg hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideMenu;