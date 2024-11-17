"use client";
import React, { useState } from "react";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";
import Cookies from "js-cookie";

import AuthServices from "@/services/AuthServices";
import { useQuery } from "@tanstack/react-query";
const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const { scrollY }: { scrollY: MotionValue<number> } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (typeof latest === "number" && typeof previous === "number") {
      if (latest > previous && latest > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    }
  });
  const userId = Cookies.get("user_id") as string;
  const { data, isFetched } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => AuthServices.fetchUserData(userId),
    enabled: !!userId,
    select: (data) => data,
  });
  return (
    <motion.nav
      // variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      // animate={hidden ? "hidden" : "visible"}
      // transition={{ duration: 0.35, ease: "easeInOut" }}
      className=" sticky top-0 left-0  z-50  bg-gradient-to-r from-blue-200 to-pink-100 p-0.5   drop-shadow-xl"
    >
      <div className="flex justify-end items-center  p-7">
        <h1 className="text-black font-semibold mr-4">
          {isFetched ? (
            <>
              <span className="">
                {data?.first_name} {data?.last_name}
              </span>
            </>
          ) : (
            "Loading..."
          )}
        </h1>
      </div>
    </motion.nav>
  );
};

export default Navbar;
