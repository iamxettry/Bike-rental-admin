import { QuickStatsType } from "@/types/common";
import configureAxios from "./axiosConfig";
import { getCookies } from "./getCookies";

const requests = configureAxios();
const GraphServices = {
  // Get Quick Stats
  qetQuickStats: async (): Promise<QuickStatsType> => {
    return requests.get("common/quick-stats/", {
      Authorization: `Bearer ${await getCookies()}`,
    });
  },

  // Get Monthly rentals
  getMonthlyRentals: async (year: number | null) => {
    return requests.get(`common/monthly-rentals/?year=${year}`, {
      Authorization: `Bearer ${await getCookies()}`,
    });
  },
};

export default GraphServices;
