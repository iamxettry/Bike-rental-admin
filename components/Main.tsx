import React from "react";
import Sidebar from "./common/Sidebar";
import Navbar from "./common/Navbar";

const Main = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="grid grid-cols-10 h-full">
      <div className="col-span-10 sm:col-span-4 md:col-span-3 lg:col-span-2 h-full">
        <Sidebar />
      </div>
      <div className="col-span-10  sm:col-span-6 md:col-span-7 lg:col-span-8   h-full">
        <Navbar />
        {/* <div className="h-1.5 w-full bg-primary"></div> */}
        <div className="  bg-gradient-to-r to-blue-200 from-pink-100  p-6 h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Main;
