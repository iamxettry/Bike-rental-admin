"use client";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import { LuX } from "react-icons/lu";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};

const RHFImageFieldWithPreview = <T extends FieldValues>({
  name,
  label,
}: Props<T>) => {
  const { control } = useFormContext<T>();
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
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <Box display="flex" flexDirection="column" gap={2}>
          {preview && (
            <div className="flex justify-end items-center mr-10">
              <LuX
                size={24}
                onClick={() => {
                  setPreview(null);
                  onChange(null);
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
              <img
                src={preview}
                alt="Preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          )}
          <Button
            variant="outlined"
            component="label"
            className=" !text-white !border-primary  !bg-primary   hover:bg-orange-500 !capitalize"
            sx={{ alignSelf: "start" }}
          >
            {label}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(event) => {
                const file = event.target.files?.[0] || null;
                onChange(file);
                handlePreview(file);
              }}
            />
          </Button>

          {error && (
            <Typography color="error" variant="caption">
              {error.message}
            </Typography>
          )}
        </Box>
      )}
    />
  );
};

export default RHFImageFieldWithPreview;
