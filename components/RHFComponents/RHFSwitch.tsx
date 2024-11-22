import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Switch } from "@headlessui/react";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};

const RHFSwitch = <T extends FieldValues>({ name, label }: Props<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex items-center space-x-2 gap-5">
          <label className="text-sm font-medium text-gray-900">{label}</label>
          <Switch
            checked={field.value}
            onChange={field.onChange}
            className={`group inline-flex  h-5 w-9 items-center rounded-full transition ${
              field.value ? "bg-primary" : "bg-gray-400"
            }`}
          >
            <span
              className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${
                field.value ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </Switch>
        </div>
      )}
    />
  );
};

export default RHFSwitch;
