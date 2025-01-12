import {
  Payment,
  PaymentHistoryType,
  PaymentQuickStatsType,
} from "@/types/common";
import configureAxios from "./axiosConfig";
import { getCookies } from "./getCookies";

const requests = configureAxios();

const BillingAndPaymentServices = {
  //   get quick stats
  getQuickStats: async (): Promise<PaymentQuickStatsType> => {
    return requests.get("/payment/quick-stats/", {
      Authorization: `Bearer ${await getCookies()}`,
    });
  },
  getMonthlyPaymentHistory: async (): Promise<PaymentHistoryType[]> => {
    return requests.get("/payment/monthly-payment-history/", {
      Authorization: `Bearer ${await getCookies()}`,
    });
  },
  // Get payment list
  getPaymentList: async (): Promise<Payment[]> => {
    return requests.get("/payment/list/", {
      Authorization: `Bearer ${await getCookies()}`,
    });
  },
};

export default BillingAndPaymentServices;
