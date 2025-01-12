import configureAxios from "./axiosConfig";
import { getCookies } from "./getCookies";

const requests = configureAxios();

const RentalServices = {
  // get all rentals
  getRentals: async (
    rental?: string,
    rental_status?: string,
    payment_status?: string
  ) => {
    const rentalParam = rental ? `rental=${rental}` : "";
    const rentalStatus = rental_status
      ? `&&rental_status=${rental_status}`
      : "";
    const paymentStatus = payment_status
      ? `&&payment_status=${payment_status}`
      : "";
    return requests.get(
      `/rent/rentals/?${rentalParam}${rentalStatus}${paymentStatus}`,
      {
        Authorization: `Bearer ${await getCookies()}`,
      }
    );
  },
};
export default RentalServices;
