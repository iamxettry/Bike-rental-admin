import React from "react";
import {
  useController,
  UseControllerProps,
  FieldValues,
} from "react-hook-form";

interface RHFImageFieldWithPreviewProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label: string;
}

const RHFImg = <T extends FieldValues>({
  label,
  control,
  name,
}: RHFImageFieldWithPreviewProps<T>) => {
  const {
    field: { value, onChange },
  } = useController({ name, control });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onChange(event.target.files);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
      />
      {value && value[0] && (
        <img
          src={URL.createObjectURL(value[0])}
          alt="Preview"
          className="mt-2 w-full h-auto rounded-md"
        />
      )}
    </div>
  );
};

export default RHFImg;
