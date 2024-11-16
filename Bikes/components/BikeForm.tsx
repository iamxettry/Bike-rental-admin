import React from "react";
import { bikeType } from "../types/bikeSchema";
import useBikeSubmit from "@/hooks/useBikeSubmit";
import RHFTextField from "@/components/RHFComponents/RHFTextField";
import RHFImageFieldWithPreview from "@/components/RHFComponents/RHFImageFieldWithPreview";
import RHFSelectField from "@/components/RHFComponents/RHFSelectField";

const BikeForm = () => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useBikeSubmit();
  return (
    <form onSubmit={handleSubmit} className="  grid space-y-4 overflow-y-auto">
      <span></span>
      <RHFTextField<bikeType> name="name" label="Name" />
      <RHFTextField<bikeType> name="brand" label="Brand" />
      <RHFTextField<bikeType> name="model" label="Model" />
      <RHFTextField<bikeType> name="year" label="Year" type="number" />
      <RHFTextField<bikeType> name="color" label="Color" />
      <RHFTextField<bikeType> name="price" label="Price" type="number" />
      <h1 className="font-semibold text-gray-700">Features</h1>
      <div className=" gap-4 flex -mt-2 ">
        <RHFSelectField<bikeType>
          name="features.start"
          options={[
            { label: "Kick Start", value: "kick" },
            { label: "Self Start", value: "self" },
          ]}
          label="Start"
        />
        <RHFTextField<bikeType> name="features.engine" label="Engine" />
        <RHFTextField<bikeType> name="features.distance" label="Distance" />
      </div>

      <RHFTextField<bikeType> name="description" label="Description" />
      <RHFImageFieldWithPreview<bikeType> name="image" label="Select Image" />
      <button type="submit" className="">
        Submit
      </button>
    </form>
  );
};

export default BikeForm;
