"use client";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/utils/Loading";
import Notfound from "@/components/common/Notfound";
import useBikeSubmit from "@/hooks/useBikeSubmit";
import { useModal } from "@/hooks/useModalStore";
import Modal from "@/components/common/Modal";
import { useStore } from "@/store/store";
import { useEffect } from "react";
import BikeServices from "@/Bikes/services/BikeServices";
import BikeListTable from "@/Bikes/components/BikeListTable";

const LocationList = () => {
  const {
    isModalOpen,
    editId: locationId,
    setEditId: setLocationId,
    closeModal,
  } = useModal();
  const { handleDeleteBike } = useBikeSubmit();
  const {
    data: BikeList,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["BikeList"],
    queryFn: async () => BikeServices.getBikeList(),
    refetchOnWindowFocus: true,
  });

  const {
    searchQuery,
    searchList: LocationList,
    isLoading,
    setIsLoading,
    setSearchList,
  } = useStore();

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      const timer = setTimeout(async () => {
        const response = await BikeServices.searchBikes(searchQuery);
        setIsLoading(false);
        setSearchList(response);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      if (BikeList) {
        setSearchList(BikeList);
        setIsLoading(isFetching);
      }
    }
  }, [searchQuery, BikeList, isFetching]);

  return (
    <div className="mt-5">
      {isLoading ? (
        <div className="h-96 flex justify-center items-center">
          <Loading />
        </div>
      ) : LocationList && LocationList?.length > 0 ? (
        <BikeListTable data={LocationList} />
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
                handleDeleteBike(locationId);
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
