import AddBikeDrawer from "@/Bikes/components/AddBikeDrawer";
import AddBikeNav from "@/Bikes/components/AddBikeNav";
import BikeFormProvider from "@/Bikes/components/BikeFormProvider";
import BikeList from "@/Bikes/components/BikeList";
import AdminWarpper from "@/components/common/AdminWarpper";
import React from "react";

const page = () => {
  return (
    <>
      <AdminWarpper>
        <BikeFormProvider>
          <AddBikeDrawer />
          <AddBikeNav />
          <BikeList />
        </BikeFormProvider>
      </AdminWarpper>
    </>
  );
};

export default page;
