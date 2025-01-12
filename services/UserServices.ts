import { DashboardQuickStatsType } from "@/types/common";
import configureAxios from "./axiosConfig";
import { getCookies } from "./getCookies";

const requests = configureAxios();

const UserServices = {
  getUserQuickStats: async (): Promise<DashboardQuickStatsType> => {
    return requests.get("/auth/user-dashboard/", {
      Authorization: `Bearer ${await getCookies()}`,
    });
  },

  getUserStats: async () => {
    return requests.get("/auth/user-growth-grpah/", {
      Authorization: `Bearer ${await getCookies()}`,
    });
  },
};

export default UserServices;
