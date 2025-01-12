import configureAxios from "./axiosConfig";
import { getCookies } from "./getCookies";

const requests = configureAxios();

const RentalServices = {
  // get all rentals
  getRentals: async ({
    rental,
    rental_status,
    payment_status,
    search_query,
  }: {
    rental?: string;
    rental_status?: string;
    payment_status?: string;
    search_query?: string;
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
      `/rent/rentals/?${rentalParam}${rentalStatus}${paymentStatus}${searchQuery}`,
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
