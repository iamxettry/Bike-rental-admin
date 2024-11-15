import React from "react";
import Sidebar from "./common/Sidebar";
import Navbar from "./common/Navbar";

const Main = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="grid grid-cols-10">
      <Sidebar />
      <div className="col-span-10  sm:col-span-6 md:col-span-7 lg:col-span-8  p-4 h-full">
        <Navbar />
        <div className="bg-blue-200 h-full">{children}</div>
      </div>
    </div>
  );
};

export default Main;
