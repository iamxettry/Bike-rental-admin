import { BikeListResponse } from "@/Bikes/types/bikeApiTypes";
import { LocationListResponse } from "@/settings/types/locationSchema";
import { User } from "@/types/common";
import { create } from "zustand";
type State = {
  searchQuery: string;
  bikes: BikeListResponse;
  locations: LocationListResponse[];
  isLoading: boolean;
  users: User[];

  activeView: "all" | "active" | "history";
  rentalData: any;
};

type Action = {
  setSearchQuery: (value: string) => void;
  setBikes: (value: BikeListResponse) => void;
  setLocations: (value: LocationListResponse[]) => void;
  setIsLoading: (value: boolean) => void;
  setUsers: (value: User[]) => void;
  setActiveView: (value: "all" | "active" | "history") => void;
  setRentalData: (value: any) => void;
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

  // user
  users: [],
  setUsers: (value) => set(() => ({ users: value })),

  //  activeView
  activeView: "all",
  setActiveView: (value) => set(() => ({ activeView: value })),

  // Rental data
  rentalData: {},
  setRentalData: (value) => set(() => ({ rentalData: value })),
}));
