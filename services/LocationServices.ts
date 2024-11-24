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
  // Fetch location data by id
  getLocationById: async (id: string) => {
    return requests.get(`common/location-retrieve-update-delete/${id}/`, {
      Authorization: `Bearer ${await getCookies()}`,
    });
  },

  // Fetch all locations
  getLocationList: async () => {
    return requests.get("common/location-list/", {
      Authorization: `Bearer ${await getCookies()}`,
    });
  },
  // Update location data
  updateLocation: async (id: string, data: LocationType) => {
    return requests.put(`common/location-retrieve-update-delete/${id}/`, data, {
      Authorization: `Bearer ${await getCookies()}`,
    });
  },
  // Delete location data
  deleteLocation: async (id: string) => {
    return requests.delete(`common/location-retrieve-update-delete/${id}/`, {
      Authorization: `Bearer ${await getCookies()}`,
    });
  },

  // Searach location data
  searchLocation: async (query: string) => {
    return requests.get(`common/location-search/?search=${query}`, {
      Authorization: `Bearer ${await getCookies()}`,
    });
  },
};

export default LocationService;
