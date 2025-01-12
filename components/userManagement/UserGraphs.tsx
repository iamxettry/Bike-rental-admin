"use client";
import UserServices from "@/services/UserServices";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Loading from "../utils/Loading";

const UserGraphs = () => {
  const { data, isLoading } = useQuery({
    queryFn: async () => await UserServices.getUserStats(),
    queryKey: ["userStats"],
  });
  console.log(data);
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* User Growth Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">User Growth</h2>
          <div className="h-80 flex justify-center items-center">
            {isLoading ? (
              <Loading />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data?.data?.users}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="totalUsers"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Total Users"
                  />
                  <Line
                    type="monotone"
                    dataKey="verifiedUsers"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Verified Users"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserGraphs;
