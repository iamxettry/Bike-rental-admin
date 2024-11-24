import { BikeListResponse } from "@/Bikes/types/bikeApiTypes";
import { LocationListResponse } from "@/settings/types/locationSchema";
import { create } from "zustand";
type State = {
  searchQuery: string;
  bikes: BikeListResponse;
  locations: LocationListResponse[];
  isLoading: boolean;
};

type Action = {
  setSearchQuery: (value: string) => void;
  setBikes: (value: BikeListResponse) => void;
  setLocations: (value: LocationListResponse[]) => void;
  setIsLoading: (value: boolean) => void;
};
export const useStore = create<State & Action>((set) => ({
  // Search Query
  searchQuery: "",
  setSearchQuery: (value) => set(() => ({ searchQuery: value })),

  //   searchList
  bikes: [],
  setBikes: (value) => set(() => ({ bikes: value })),

  locations: [],
  setLocations: (value) => set(() => ({ locations: value })),

  //   isLoading
  isLoading: false,
  setIsLoading: (value) => set(() => ({ isLoading: value })),
}));
