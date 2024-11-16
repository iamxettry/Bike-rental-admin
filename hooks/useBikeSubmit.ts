import { bikeType } from "@/Bikes/types/bikeSchema";
import { SubmitHandler, useFormContext } from "react-hook-form";

const useBikeSubmit = () => {
  const { handleSubmit, formState } = useFormContext<bikeType>();
  const onSubmit: SubmitHandler<bikeType> = async (data) => {
    console.log("data", data);
  };
  return {
    handleSubmit: handleSubmit(onSubmit),
    formState,
  };
};

export default useBikeSubmit;
