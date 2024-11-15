import { adminSidebarList } from "@/constants/Sidebar";
import React from "react";
import SideBarItem from "./SideBarItem";

const SidebarList = () => {
  return (
    <div className="space-y-2 ">
      {adminSidebarList?.map((item) => {
        return <SideBarItem key={item._id} item={item} />;
      })}
    </div>
  );
};

export default SidebarList;
