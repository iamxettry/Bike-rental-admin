import React, { useEffect } from "react";
import { bikeType } from "../types/bikeSchema";
import useBikeSubmit from "@/hooks/useBikeSubmit";
import RHFTextField from "@/components/RHFComponents/RHFTextField";
import RHFSelectField from "@/components/RHFComponents/RHFSelectField";
import RHFNumberField from "@/components/RHFComponents/RHFNumberField1";
import { Button } from "@mui/material";
import RHFImageFieldWithPreview from "@/components/RHFComponents/RHFImageFieldWithPreview";
import { useModal } from "@/hooks/useModalStore";

const BikeForm = () => {
  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useBikeSubmit();
  const { bikeId } = useModal();
  useEffect(() => {
    const sub = watch((value) => console.log(value));
    return () => sub.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={handleSubmit} className="  grid space-y-4 overflow-y-auto">
      <span></span>
      <RHFTextField<bikeType> name="name" label="Name" />
      <RHFTextField<bikeType> name="brand" label="Brand" />
      <RHFTextField<bikeType> name="model" label="Model" />
      <RHFNumberField<bikeType> name="year" label="Year" />
      <RHFTextField<bikeType> name="color" label="Color" />
      <RHFNumberField<bikeType> name="price" label="Price" />
      <h1 className="font-semibold text-gray-700">Features</h1>
      <div className=" gap-4 flex -mt-2 ">
        <RHFSelectField<bikeType>
          name="start"
          options={[
            { label: "Self Start Only", value: "SELF_START_ONLY" },
            { label: "Kick & Self Start", value: "KICK_AND_SELF_START" },
            { label: "Kick Start Only", value: "KICK_START_ONLY" },
          ]}
          label="Start"
        />
        <RHFTextField<bikeType> name="engine" label="Engine" />
        <RHFTextField<bikeType> name="distance" label="Distance" />
      </div>

      <RHFTextField<bikeType> name="description" label="Description" />

      <RHFImageFieldWithPreview<bikeType> name="image" label="Select Image" />

      {bikeId ? (
        <Button variant="contained" type="submit" className="!bg-primary">
          {isSubmitting ? "Updating..." : "Update"}
        </Button>
      ) : (
        <Button variant="contained" type="submit" className="!bg-primary">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      )}

      <span></span>
    </form>
  );
};

export default BikeForm;
