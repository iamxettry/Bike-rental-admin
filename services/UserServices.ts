import { DashboardQuickStatsType, User } from "@/types/common";
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

  //   get all users
  getAllUsers: async () => {
    return requests.get("/auth/users/list/", {
      Authorization: `Bearer ${await getCookies()}`,
    });
  },

  //   search users
  searchUsers: async (query: string) => {
    return requests.get(`/auth/user-search/?search=${query}`, {
      Authorization: `Bearer ${await getCookies()}`,
    });
  },
};

export default UserServices;
