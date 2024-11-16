import AddBikeNav from "@/Bikes/components/AddBikeNav";
import AdminWarpper from "@/components/common/AdminWarpper";
import React from "react";

const page = () => {
  return (
    <>
      <AdminWarpper>
        <AddBikeNav />
      </AdminWarpper>
    </>
  );
};

export default page;
