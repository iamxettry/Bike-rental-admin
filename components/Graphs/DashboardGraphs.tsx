"use client";
import React from "react";
import { useResizeDetector } from "react-resize-detector";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Rectangle,
} from "recharts";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Container,
  ContainerContent,
  ContainerTitle,
} from "@/components/ui/Container";

import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import clsx from "clsx";
import { CheckmarkIcon } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import GraphServices from "@/services/GraphServices";
import Loading from "../utils/Loading";
import { MonthlyRentalsType, HourlyUsageType } from "@/types/common";
import UserActivityGraph from "./UserActivityGraph";
const graphOption = [
  { id: 1, name: "Line Graph" },
  { id: 2, name: "Bar Graph" },
];
const yearOption = [
  { id: 1, year: 2024 },
  { id: 2, year: 2025 },
];

// get monthly rentals

const DashboardGraphs = () => {
  const [selectedGraph, setSelectedGraph] = useState<{
    id: number;
    name: string;
  } | null>(graphOption[0]);
  const [query, setQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<{
    id: number;
    year: number;
  } | null>(yearOption[0]);
  const [queryYear, setQueryYear] = useState("");

  const [chartWidth, setChartWidth] = useState<number | undefined>(undefined);

  const onResize = ({ width }: { width: number | null }) => {
    if (width !== null && width !== chartWidth) {
      setChartWidth(width);
    }
  };

  const { ref } = useResizeDetector({
    onResize,
    handleHeight: false,
  });
  const filteredGraph =
    query === ""
      ? graphOption
      : graphOption.filter((graph) => {
          return graph.name.toLowerCase().includes(query.toLowerCase());
        });
  const filteredYear =
    queryYear === ""
      ? yearOption
      : yearOption.filter((yr) => {
          return yr.year == Number(queryYear);
        });

  //  Fetch  monthly rental data

  const { data: MonthlyRentals, isLoading: isMonthlyRentalLoading } = useQuery({
    queryFn: async () =>
      await GraphServices.getMonthlyRentals(
        selectedYear ? selectedYear.year : new Date().getFullYear()
      ),
    queryKey: ["monthly-rentals", selectedYear],
    select: (data) => data,
  });
  const { data: dailyUsage, isLoading: isLoadingDailyUsage } = useQuery({
    queryFn: async () => await GraphServices.getHourlyUsage(),
    queryKey: ["hourly-usage"],
    select: (data) => data,
  });

  // Bike Status Data
  const { data: bikeStatus, isLoading: isBikeStatusLoading } = useQuery({
    queryFn: async () => await GraphServices.getBikeDistribution(),
    queryKey: ["bike-status"],
    select: (data) => data,
  });
  // Bike Revenue Data
  const { data: monthlyRevenueRentals, isLoading: isRevenueLoading } = useQuery(
    {
      queryFn: async () => await GraphServices.getMonthlyRevenueRentals(),
      queryKey: ["monthly-revenue-rentals"],
      select: (data) => data,
    }
  );
  const { data: paymentMethods, isLoading: isPaymentLoading } = useQuery({
    queryFn: async () => await GraphServices.getPaymentMethods(),
    queryKey: ["payment-methods"],
    select: (data) => data,
  });

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <Container>
      <ContainerTitle></ContainerTitle>
      <ContainerContent>
        <Card
          ref={ref}
          className="col-span-2 shadow-md shadow-indigo-300 overflow-hidden max-w-full max-h-full"
        >
          <CardHeader className="grid grid-cols-3 place-items-center">
            <CardTitle className=" ">Monthly Rentals</CardTitle>
            <div className="  text-black flex gap-2  col-span-2">
              <Combobox<{ id: number; name: string } | null>
                value={selectedGraph}
                onChange={(value) => setSelectedGraph(value)}
                onClose={() => setQuery("")}
              >
                <div className="relative">
                  <ComboboxInput
                    className={clsx(
                      "w-full rounded-lg border border-gray-300 bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 ",
                      "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    )}
                    displayValue={(graph: { id: number; name: string }) =>
                      graph ? graph.name : ""
                    }
                    readOnly
                    onChange={(event) => setQuery(event.target.value)}
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
                  {filteredGraph.map((graph) => (
                    <ComboboxOption
                      key={graph.id}
                      value={graph}
                      className="group flex cursor-default items-center gap-2 rounded-md py-1.5 px-3 select-none data-[focus]:bg-white/10"
                    >
                      <CheckmarkIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                      <div className="text-sm/6 ">{graph.name}</div>
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              </Combobox>
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
            </div>
          </CardHeader>
          <CardContent className=" p-0">
            <div className="h-64 flex justify-center items-center relative">
              {isMonthlyRentalLoading ? (
                <Loading />
              ) : chartWidth && selectedGraph?.id == 1 ? (
                <ResponsiveContainer width={"100%"} height="100%">
                  <LineChart data={MonthlyRentals}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis
                      tick={{
                        fontSize: "0.75rem",
                      }}
                    />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="rentals"
                      stroke="#ea580cff"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width={"100%"} height="100%">
                  <BarChart data={MonthlyRentals}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis
                      tick={{
                        fontSize: "0.75rem",
                      }}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="rentals"
                      fill="#8804fc "
                      activeBar={<Rectangle fill="pink" stroke="blue" />}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2 bg-blue-100 shadow-md shadow-purple-300">
          <CardHeader>
            <CardTitle>Daily Usage Pattern</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex justify-center items-center">
              {isLoadingDailyUsage ? (
                <Loading />
              ) : (
                <ResponsiveContainer width={"100%"} height="100%">
                  <LineChart data={dailyUsage || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#10b981"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2 bg-blue-100 shadow-md shadow-purple-300">
          <CardHeader>
            <CardTitle>Bike Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex justify-center items-center">
              {isBikeStatusLoading ? (
                <Loading />
              ) : (
                <ResponsiveContainer width={"100%"} height="100%">
                  <PieChart>
                    <Pie
                      data={bikeStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {bikeStatus?.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2  shadow-md shadow-indigo-300">
          <CardHeader>
            <CardTitle>Revenue & Rentals Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex justify-center items-center">
              {isRevenueLoading ? (
                <Loading />
              ) : (
                <ResponsiveContainer width={"100%"} height="100%">
                  <ComposedChart data={monthlyRevenueRentals}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="revenue" fill="#ea580cff" />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="rentals"
                      stroke="#8804fc"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
        {/* user Activity graph */}
        <UserActivityGraph />
        <Card className="col-span-2 bg-blue-100 shadow-md shadow-purple-300">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex justify-center items-center">
              {isPaymentLoading ? (
                <Loading />
              ) : (
                <ResponsiveContainer width={"100%"} height="100%">
                  <PieChart>
                    <Pie
                      data={paymentMethods}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {paymentMethods?.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </ContainerContent>
    </Container>
  );
};

export default DashboardGraphs;
