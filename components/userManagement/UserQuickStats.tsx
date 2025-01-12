import React from "react";
import StatCard from "./StartCard";
import { Users, UserCheck, Mail, Shield } from "lucide-react";
import UserServices from "@/services/UserServices";

const UserQuickStats = async () => {
  let quickStats;
  try {
    quickStats = await UserServices.getUserQuickStats();
  } catch (e) {
    console.log(e);
  }

  return (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Users}
          title={quickStats?.data?.total_users?.title || "Total Users"}
          value={quickStats?.data?.total_users?.value || "0"}
          change={`+${quickStats?.data?.total_users?.change} this month`}
        />
        <StatCard
          icon={UserCheck}
          title={quickStats?.data?.verified_users?.title || "Verified Users"}
          value={quickStats?.data?.verified_users?.value || "0"}
          change={`${quickStats?.data?.verified_users?.change} % verification rate`}
        />
        <StatCard
          icon={Shield}
          title={quickStats?.data?.staff_users?.title || "Staff Members"}
          value={quickStats?.data?.staff_users?.value || "0"}
          change={`+ ${quickStats?.data?.staff_users?.change}  staff members`}
        />
        <StatCard
          icon={Mail}
          title={
            quickStats?.data?.pending_verification?.title ||
            "Pending Verification"
          }
          value={quickStats?.data?.pending_verification?.value || "0"}
          change={` ${quickStats?.data?.pending_verification?.change} from last month`}
        />
      </div>
    </div>
  );
};

export default UserQuickStats;
