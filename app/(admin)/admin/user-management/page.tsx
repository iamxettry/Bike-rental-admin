import React from "react";

import UserQuickStats from "@/components/userManagement/UserQuickStats";
import UserList from "@/components/userManagement/UserList";
import UserGraphs from "@/components/userManagement/UserGraphs";

function UserManagement() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          User Management Dashboard
        </h1>

        <UserQuickStats />

        {/* Charts Grid */}
        <UserGraphs />

        {/* User List Section */}
        <UserList />
      </div>
    </div>
  );
}

export default UserManagement;
