"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { SidebarType } from "@/types/SidebarType";

const SideBarItem = ({ item }: { item: SidebarType }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const pathname = usePathname();
  const handleClick = () => {
    setShowSubMenu(!showSubMenu);
  };

  useEffect(() => {
    if (item?.subList) {
      const isInclude = item?.subList.some((item) =>
        item?.path?.includes(pathname)
      );
      if (isInclude) {
        setShowSubMenu(true);
      }
    }
  }, [item]);

  return (
    <>
      <div
        className={`py-2  px-4 rounded-md hover:bg-blue-100  ${
          pathname === item?.path && "bg-blue-200"
        } `}
      >
        {item?.path ? (
          <Link href={item?.path} className="text-sm font-semibold ">
            {item.title}
          </Link>
        ) : (
          <div
            onClick={handleClick}
            className="text-sm font-semibold  flex justify-between items-center cursor-pointer"
          >
            <span>{item.title}</span>
            <span>
              {showSubMenu ? (
                <LuChevronUp size={20} />
              ) : (
                <LuChevronDown size={20} />
              )}
            </span>
          </div>
        )}
      </div>
      <div
        className={`transition-all duration-400  overflow-hidden ${
          showSubMenu ? "max-h-screen" : "max-h-0"
        }`}
      >
        {item?.subList?.map((subItem) =>
          subItem.path ? (
            <Link
              href={subItem.path}
              key={subItem._id}
              className={`text-sm p-2 rounded-md font-medium pl-6 block hover:bg-blue-100 ${
                pathname === subItem?.path && "bg-blue-200"
              }`}
            >
              {subItem.title}
            </Link>
          ) : (
            <div
              key={subItem._id}
              className="text-sm p-2 font-medium rounded-md pl-6"
            >
              {subItem.title}
            </div>
          )
        )}
      </div>
    </>
  );
};

export default SideBarItem;
