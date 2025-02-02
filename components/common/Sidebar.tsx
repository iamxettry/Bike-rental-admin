import { WithMyBike } from "@/assets";
import Image from "next/image";
import React from "react";
import SidebarList from "./SidebarList";
import LogOut from "./LogOut";

const Sidebar = () => {
  return (
    <div className="fixed -top-1 left-0 h-full w-[270] bg-blue-200 flex flex-col overflow-y-scroll scrollbar-thin  ">
      {/* Logo Section */}
      <div>
        <Image
          src={WithMyBike}
          width={400}
          height={2}
          alt="logo"
          className="w-full object-cover"
        />
      </div>

      {/* Sidebar List */}
      <div className="flex-grow p-4">
        <SidebarList />
      </div>

      {/* Logout Button */}
      <div className="mb-4">
        <LogOut />
      </div>
    </div>
  );
};

export default Sidebar;
