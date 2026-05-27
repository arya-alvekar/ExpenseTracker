import React from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Navbar />

      <div className="flex">
        <div className="max-[1080px]:hidden">
          <SideMenu />
        </div>

        <main className="flex-1 w-full p-6 bg-gray-50">
  {children}
</main>
      </div>
    </div>
  );
};

export default DashboardLayout;