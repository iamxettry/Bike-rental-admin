import RHFTextField from "@/components/RHFComponents/RHFTextField";
import React from "react";
import { LocationType } from "../types/locationSchema";
import useLocationSubmit from "@/hooks/useLocationSubmit";
import { Button } from "@mui/material";

const LocationForm = () => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useLocationSubmit();
  return (
    <form onSubmit={handleSubmit} className="grid space-y-4 overflow-y-auto">
      <span></span>
      <RHFTextField<LocationType> name="city" label="City Name" />

      {/* {bikeId ? (
        <Button variant="contained" type="submit" className="!bg-primary">
          {isSubmitting ? "Updating..." : "Update"}
        </Button>
      ) : (
      )} */}
      <Button variant="contained" type="submit" className="!bg-primary">
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default LocationForm;
