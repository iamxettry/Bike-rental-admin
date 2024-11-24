"use client";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/utils/Loading";
import Notfound from "@/components/common/Notfound";
import { useModal } from "@/hooks/useModalStore";
import Modal from "@/components/common/Modal";
import { useStore } from "@/store/store";
import { useEffect } from "react";
import LocationService from "@/services/LocationServices";
import useLocationSubmit from "@/hooks/useLocationSubmit";
import LocationTable from "./LocationTable";

const LocationList = () => {
  const {
    isModalOpen,
    editId: locationId,
    setEditId: setLocationId,
    closeModal,
  } = useModal();
  const { handleDeleteLocation } = useLocationSubmit();
  const {
    data: LocationData,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["get-location-list"],
    queryFn: async () => LocationService.getLocationList(),
    refetchOnWindowFocus: true,
  });

  const { searchQuery, locations, isLoading, setIsLoading, setLocations } =
    useStore();

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      const timer = setTimeout(async () => {
        const response = await LocationService.searchLocation(searchQuery);
        setIsLoading(false);
        setLocations(response);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      if (LocationData) {
        setLocations(LocationData);
        setIsLoading(isFetching);
      }
    }
  }, [searchQuery, LocationData, isFetching]);

  return (
    <div className="mt-5">
      {isLoading || isFetching ? (
        <div className="h-96 flex justify-center items-center">
          <Loading />
        </div>
      ) : locations && locations?.length > 0 ? (
        <LocationTable data={locations} />
      ) : (
        <Notfound msg="Result Not Found" />
      )}
      {isModalOpen && (
        <Modal
          title="Delete Bike "
          description="Are you sure? You want to delete bike ."
        >
          <div className="flex justify-end ">
            <button
              onClick={() => {
                handleDeleteLocation(locationId);
                closeModal();
                setLocationId("");
              }}
              className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-md"
            >
              Confirm
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LocationList;
