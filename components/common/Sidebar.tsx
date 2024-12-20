import { WithMyBike } from "@/assets";
import Image from "next/image";
import React from "react";
import SidebarList from "./SidebarList";
import LogOut from "./LogOut";

const Sidebar = () => {
  return (
    <div className="  h-full ">
      <div className="bg-blue-200">
        <Image
          src={WithMyBike}
          width={400}
          height={2}
          alt="logo"
          className="w-full object-cover"
        />
      </div>
      <div className="p-4  bg-blue-200 h-full">
        <SidebarList />
        <LogOut />
      </div>
    </div>
  );
};

export default Sidebar;
