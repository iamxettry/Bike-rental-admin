import { WithMyBike } from "@/assets";
import Image from "next/image";
import React from "react";
import SidebarList from "./SidebarList";

const Sidebar = () => {
  return (
    <div className="col-span-10 sm:col-span-4 md:col-span-3 lg:col-span-2  space-y-2 ">
      <div className="">
        <Image
          src={WithMyBike}
          width={400}
          height={2}
          alt="logo"
          className="w-full object-cover"
        />
      </div>
      <div className="p-6  overflow-y-scroll">
        <SidebarList />
      </div>
    </div>
  );
};

export default Sidebar;
