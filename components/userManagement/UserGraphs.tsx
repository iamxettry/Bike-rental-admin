"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

// Mock data based on your Django User model
const userStatsData = [
  { name: "Jan", totalUsers: 400, verifiedUsers: 380 },
  { name: "Feb", totalUsers: 600, verifiedUsers: 550 },
  { name: "Mar", totalUsers: 800, verifiedUsers: 720 },
  { name: "Apr", totalUsers: 1000, verifiedUsers: 900 },
  { name: "May", totalUsers: 1200, verifiedUsers: 1100 },
  { name: "Jun", totalUsers: 1500, verifiedUsers: 1400 },
];

const userTypeData = [
  { name: "Regular", value: 1200 },
  { name: "Staff", value: 50 },
  { name: "Superuser", value: 5 },
];

const UserGraphs = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* User Growth Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">User Growth</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userStatsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
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
          </div>
        </div>

        {/* User Types Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            User Types Distribution
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#3b82f6" name="Users" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserGraphs;
