import configureAxios from "./axiosConfig";
import { getCookies } from "./getCookies";
import { LocationType } from "@/settings/types/locationSchema";

const requests = configureAxios();

const LocationService = {
  uploadLocation: async (data: LocationType) => {
    return requests.post("common/location-create/", data, {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getCookies()}`,
    });
  },
};

export default LocationService;
