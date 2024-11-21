import configureAxios from "@/services/axiosConfig";
import { Bike, BikeListResponse } from "../types/bikeApiTypes";
import { bikeType } from "../types/bikeSchema";
import { successResponse } from "@/Auth/types/common";
import { getCookies } from "@/services/getCookies";

const requests = configureAxios();

const BikeServices = {
  // Get Bike list
  getBikeList: (): Promise<BikeListResponse> => {
    return requests.get(`/bike/lists/`);
  },
  getFeaturedBikes: (): Promise<BikeListResponse> => {
    return requests.get(`/bike/featured/`);
  },

  // Search Bikes
  searchBikes: (query: string): Promise<BikeListResponse> => {
    return requests.get(`/bike/search/?search=${query}`);
  },

  // Post Bike
  postBike: async (data: bikeType): Promise<successResponse> => {
    return requests.post(`/bike/create/`, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${await getCookies()}`,
    });
  },

  // Update Bike
  updateBike: async (id: string, data: bikeType): Promise<successResponse> => {
    return requests.patch(`/bike/update/${id}/`, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${await getCookies()}`,
    });
  },

  // delete Bike
  deleteBike: async (id: string): Promise<successResponse> => {
    return requests.delete(`/bike/delete/${id}/`, {
      Authorization: `Bearer ${await getCookies()}`,
    });
  },
  // Update Bike status
  updateBikeFeaturedStatus: async (
    id: string,
    data: {
      isFeatured: boolean;
    }
  ): Promise<successResponse> => {
    return requests.patch(`/bike/update/${id}/`, data, {
      Authorization: `Bearer ${await getCookies()}`,
    });
  },

  // get one Bike
  getBikeById: async (id: string): Promise<Bike> => {
    return requests.get(`/bike/retrieve/${id}/`);
  },
};

export default BikeServices;
