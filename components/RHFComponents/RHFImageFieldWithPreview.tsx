import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Button, Box, Typography } from "@mui/material";
import { LuX } from "react-icons/lu";
import Image from "next/image";
import { useModal } from "@/hooks/useModalStore";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  width?: number;
  height?: number;
};

const RHFImageFieldWithPreview = <T extends FieldValues>({
  name,
  label,
  width = 400, // Default width
  height = 300, // Default height
}: Props<T>) => {
  const { control } = useFormContext<T>();
  const { preview, setPreview } = useModal();

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
                width: `${width}px`, // Dynamic width
                height: `${height}px`, // Limit the width
                border: "1px solid #ddd",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <Image
                src={preview}
                alt="Preview"
                priority
                width={400}
                height={300}
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
