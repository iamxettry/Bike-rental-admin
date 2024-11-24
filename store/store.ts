import { BikeListResponse } from "@/Bikes/types/bikeApiTypes";
import { create } from "zustand";
type State = {
  searchQuery: string;
  searchList: BikeListResponse;
  isLoading: boolean;
};

type Action = {
  setSearchQuery: (value: string) => void;
  setSearchList: (value: BikeListResponse) => void;
  setIsLoading: (value: boolean) => void;
};
export const useStore = create<State & Action>((set) => ({
  // Search Query
  searchQuery: "",
  setSearchQuery: (value) => set(() => ({ searchQuery: value })),

  //   searchList
  searchList: [],
  setSearchList: (value) => set(() => ({ searchList: value })),

  //   isLoading
  isLoading: false,
  setIsLoading: (value) => set(() => ({ isLoading: value })),
}));
