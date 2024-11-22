"use client";
import { useQuery } from "@tanstack/react-query";
import BikeServices from "../services/BikeServices";
import BikeListTable from "./BikeListTable";
import Loading from "@/components/utils/Loading";
import Notfound from "@/components/common/Notfound";
import useBikeSubmit from "@/hooks/useBikeSubmit";
import { useModal } from "@/hooks/useModalStore";
import Modal from "@/components/common/Modal";

const BikeList = () => {
  const { isModalOpen, bikeId, setBikeId, closeModal } = useModal();
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

  return (
    <div className="">
      {isFetching ? (
        <div className="h-96 flex justify-center items-center">
          <Loading />
        </div>
      ) : BikeList && BikeList?.length > 0 ? (
        <BikeListTable data={BikeList} />
      ) : (
        <Notfound msg="No Data" />
      )}
      {isModalOpen && (
        <Modal
          title="Delete Bike "
          description="Are you sure? You want to delete bike ."
        >
          <div className="flex justify-end ">
            <button
              onClick={() => {
                handleDeleteBike(bikeId);
                closeModal();
                setBikeId("");
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

export default BikeList;
