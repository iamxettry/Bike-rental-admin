import { RentalQuickStatsType } from "@/types/common";
import configureAxios from "./axiosConfig";
import { getCookies } from "./getCookies";

const requests = configureAxios();

const RentalServices = {
  // Quick stats
  getQuickStats: async (): Promise<RentalQuickStatsType> => {
    return requests.get("/rent/rentals-stats/", {
      Authorization: `Bearer ${await getCookies()}`,
    });
  },

  // get all rentals
  getRentals: async ({
    rental,
    rental_status,
    payment_status,
    search_query,
    limit = 5,
    offset = 0,
  }: {
    rental?: string;
    rental_status?: string;
    payment_status?: string;
    search_query?: string;
    limit?: number;
    offset?: number;
  }) => {
    const rentalParam = rental ? `rental=${rental}` : "";
    const rentalStatus = rental_status
      ? `&&rental_status=${rental_status}`
      : "";
    const paymentStatus = payment_status
      ? `&&payment_status=${payment_status}`
      : "";
    const searchQuery = search_query ? `&&search=${search_query}` : "";

    return requests.get(
      `/rent/rentals/?${rentalParam}${rentalStatus}${paymentStatus}${searchQuery}&&limit=${limit}&&offset=${offset}`,
      {
        Authorization: `Bearer ${await getCookies()}`,
      }
    );
  },
  // update rental status
  updateRentalStatus: async (id: string, data: any) => {
    return requests.patch(`/rent/bike/admin/update/${id}/`, data, {
      Authorization: `Bearer ${await getCookies()}`,
    });
  },
};
export default RentalServices;
