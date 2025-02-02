import { Autocomplete, Box, Checkbox, TextField } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { orange } from "@mui/material/colors";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckedBoxIcon from "@mui/icons-material/CheckBox";
import { Option } from "@/types/options";
type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label: string;
};
const RHFAutoComplete = <T extends FieldValues>({
  name,
  options,
  label,
}: Props<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <Autocomplete
          options={options || []}
          value={value.map((id: string) =>
            options?.find((item) => item.id === id)
          )}
          getOptionLabel={(option) =>
            options?.find((item) => item.id === option.id)?.label ?? ""
          }
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(_, newValue) => {
            onChange(newValue.map((item) => item.id));
          }}
          disableCloseOnSelect
          multiple
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              inputRef={ref}
              error={!!error}
              helperText={error?.message}
              label={label}
              sx={{
                "& label.Mui-focused": {
                  color: orange[700],
                },
                "& label": {
                  color: error && "red",
                },
                "& .MuiOutlinedInput-root": {
                  // "& fieldset": {
                  //   borderColor: error ? "red" : orange[500],
                  // },
                  "&:hover fieldset": {
                    borderColor: orange[700],
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: orange[700],
                  },
                },
              }}
            />
          )}
          renderOption={(props, option, { selected }) => {
            const { key, ...restProps } = props;

            return (
              <Box component="li" key={key} {...restProps}>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon />}
                  checkedIcon={<CheckedBoxIcon />}
                  checked={selected}
                  sx={{
                    color: orange[600],
                    "&.Mui-checked": {
                      color: orange[600],
                    },
                  }}
                />
                {option.label}
              </Box>
            );
          }}
        />
      )}
    />
  );
};

export default RHFAutoComplete;
