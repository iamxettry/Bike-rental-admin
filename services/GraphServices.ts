import {
  BikeDistrubutionType,
  HourlyUsageType,
  MonthlyRentalsType,
  MonthlyRevenueRentalsType,
  PaymentMethodsType,
  QuickStatsType,
  WeeklyUsersType,
} from "@/types/common";
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
  getMonthlyRentals: async (
    year: number | null
  ): Promise<MonthlyRentalsType[]> => {
    return requests.get(`common/monthly-rentals/?year=${year}`, {
      Authorization: `Bearer ${await getCookies()}`,
    });
  },

  // get Hourly Usage
  getHourlyUsage: async (): Promise<HourlyUsageType[]> => {
    return requests.get("common/hourly-usage/", {
      Authorization: `Bearer ${await getCookies()}`,
    });
  },

  // Get Bike Distribution
  getBikeDistribution: async (): Promise<BikeDistrubutionType[]> => {
    return requests.get("common/bike-status/", {
      Authorization: `Bearer ${await getCookies()}`,
    });
  },
  // Get Monthly revenue and rentals
  getMonthlyRevenueRentals: async (): Promise<MonthlyRevenueRentalsType[]> => {
    return requests.get("common/monthly-revenue-rentals/", {
      Authorization: `Bearer ${await getCookies()}`,
    });
  },
  // Get Payment Methods Distribution
  getPaymentMethods: async (): Promise<PaymentMethodsType[]> => {
    return requests.get("common/payment-methods-stats/", {
      Authorization: `Bearer ${await getCookies()}`,
    });
  },

  // get weekly users
  getWeeklyUsers: async (
    year?: number,
    week?: number
  ): Promise<WeeklyUsersType[]> => {
    const yearParam = year || new Date().getFullYear();
    const weekParam = week ? `&&week=${week}` : "";

    return requests.get(`common/user-activity/?year=${yearParam}${weekParam}`, {
      Authorization: `Bearer ${await getCookies()}`,
    });
  },
};

export default GraphServices;
