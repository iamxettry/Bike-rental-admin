"use client";
import { Box } from "@mui/material";
import Image from "next/image";
import { useRef, useState } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { LuX } from "react-icons/lu";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};
const RHFImageField = <T extends FieldValues>({ name, label }: Props<T>) => {
  const { register, setValue } = useFormContext<T>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handlePreview = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setValue(name, file);
    }
    handlePreview(file);
  };
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-semibold text-gray-700 hidden">
        {label}
      </label>
      <div className="flex flex-col gap-1">
        {preview && (
          <div className="flex justify-end items-center mr-10">
            <LuX
              size={24}
              onClick={() => {
                setPreview(null);
                // inputRef.current!.value = "";
              }}
              className="cursor-pointer  text-red-500"
            />
          </div>
        )}
        {preview && (
          <Box
            sx={{
              width: "400px",
              height: "200px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              overflow: "hidden",
              objectFit: "contain",
            }}
          >
            <Image
              src={preview}
              alt="Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        )}
        <label
          htmlFor={name}
          onClick={() => inputRef.current?.click()}
          className="px-4 py-2 text-white bg-primary rounded-md cursor-pointer  hover:bg-orange-500"
        >
          Choose File
        </label>
        <input
          type="file"
          id={name}
          {...register(name)}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default RHFImageField;
