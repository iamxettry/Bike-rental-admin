import AdminWarpper from "@/components/common/AdminWarpper";
import LocationDrawer from "@/settings/components/LocationDrawer";
import LocationList from "@/settings/components/LocationList";
import LocationNav from "@/settings/components/LocationNav";
import LocationProvider from "@/settings/components/LocationProvider";
import React from "react";

const LocationPage = () => {
  return (
    <>
      <AdminWarpper>
        <LocationProvider>
          <LocationNav />
          <LocationDrawer />
          <LocationList />
        </LocationProvider>
      </AdminWarpper>
    </>
  );
};

export default LocationPage;
