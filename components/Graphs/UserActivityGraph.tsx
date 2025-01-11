"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { LuChevronDown } from "react-icons/lu";
import clsx from "clsx";
import { CheckmarkIcon } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import GraphServices from "@/services/GraphServices";
import Loading from "../utils/Loading";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getCurrentWeek } from "../../functions/function";

// yearly option
const yearOption = [
  { id: 1, year: 2025 },
  { id: 2, year: 2026 },
];
// week option
const weekOption = [
  { id: 1, week: 1 },
  { id: 2, week: 2 },
  { id: 3, week: 3 },
  { id: 4, week: 4 },
];

const UserActivityGraph = () => {
  const currentWeek = getCurrentWeek();
  const [selectedYear, setSelectedYear] = useState<{
    id: number;
    year: number;
  } | null>(yearOption[0]);
  const [queryYear, setQueryYear] = useState("");
  const filteredYear =
    queryYear === ""
      ? yearOption
      : yearOption.filter((yr) => {
          return yr.year == Number(queryYear);
        });

  const [selectedWeek, setSelectedWeek] = useState<{
    id: number;
    week: number;
  } | null>(weekOption.find((wk) => wk.week === currentWeek) || weekOption[0]);
  const [queryWeek, setQueryWeek] = useState("");
  const filteredWeek =
    queryYear === ""
      ? weekOption
      : weekOption.filter((wk) => {
          return wk.week == Number(queryWeek);
        });

  // get user activity
  const { data: userActivityData, isLoading: isActivityLoading } = useQuery({
    queryFn: async () =>
      await GraphServices.getWeeklyUsers(
        selectedYear?.year,
        selectedWeek?.week
      ),
    queryKey: ["weekly-users", selectedYear?.year, selectedWeek?.week],
    select: (data) => data,
  });
  return (
    <>
      <Card className="col-span-2  shadow-md shadow-indigo-300">
        <CardHeader className="grid grid-cols-4 place-items-center">
          <CardTitle className="col-span-2">Uer Acticity</CardTitle>
          <div className="  text-black flex gap-2  col-span-2">
            {/* year combobox */}
            <Combobox<{ id: number; year: number } | null>
              value={selectedYear}
              onChange={(value) => setSelectedYear(value)}
              onClose={() => setQueryYear("")}
            >
              <div className="relative">
                <ComboboxInput
                  className={clsx(
                    "w-full rounded-lg border border-gray-300 bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 ",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  )}
                  displayValue={(yr: { id: number; year: number }) =>
                    yr ? String(yr.year) : ""
                  }
                  readOnly
                  onChange={(event) => setQueryYear(event.target.value)}
                />
                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                  <LuChevronDown className="size-4 fill-white/60 group-data-[hover]:fill-white" />
                </ComboboxButton>
              </div>

              <ComboboxOptions
                anchor="bottom"
                transition
                className={clsx(
                  "w-[var(--input-width)] rounded-xl border border-gray-300 bg-purple-100 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
                  "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                )}
              >
                {filteredYear.map((year) => (
                  <ComboboxOption
                    key={year.id}
                    value={year}
                    className="group flex cursor-default items-center gap-2 rounded-md py-1.5 px-3 select-none data-[focus]:bg-white/10"
                  >
                    <CheckmarkIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                    <div className="text-sm/6 ">{year.year}</div>
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            </Combobox>
            {/* week combobox */}
            <Combobox<{ id: number; week: number } | null>
              value={selectedWeek}
              onChange={(value) => setSelectedWeek(value)}
              onClose={() => setQueryWeek("")}
            >
              <div className="relative">
                <ComboboxInput
                  className={clsx(
                    "w-full rounded-lg border border-gray-300 bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 ",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  )}
                  displayValue={(wk: { id: number; week: number }) =>
                    wk ? String(wk.week) : ""
                  }
                  readOnly
                  onChange={(event) => setQueryWeek(event.target.value)}
                />
                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                  <LuChevronDown className="size-4 fill-white/60 group-data-[hover]:fill-white" />
                </ComboboxButton>
              </div>

              <ComboboxOptions
                anchor="bottom"
                transition
                className={clsx(
                  "w-[var(--input-width)] rounded-xl border border-gray-300 bg-purple-100 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
                  "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                )}
              >
                {filteredWeek.map((week) => (
                  <ComboboxOption
                    key={week.id}
                    value={week}
                    className="group flex cursor-default items-center gap-2 rounded-md py-1.5 px-3 select-none data-[focus]:bg-white/10"
                  >
                    <CheckmarkIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                    <div className="text-sm/6 ">{week.week}</div>
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            </Combobox>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex justify-center items-center">
            {isActivityLoading ? (
              <Loading />
            ) : (
              <ResponsiveContainer width={"100%"} height="100%">
                <BarChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="active" fill="#3b82f6" name="Active Users" />
                  <Bar dataKey="new" fill="#10b981" name="New Users" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default UserActivityGraph;
