"use client";
import { useQuery } from "@tanstack/react-query";
import BikeServices from "../services/BikeServices";
import BikeListTable from "./BikeListTable";
import Loading from "@/components/utils/Loading";
import Notfound from "@/components/common/Notfound";
import useBikeSubmit from "@/hooks/useBikeSubmit";

const BikeList = () => {
  const { handleFeaturedStatus } = useBikeSubmit();

  const {
    data: BikeList,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["BikeList"],
    queryFn: async () => BikeServices.getBikeList(),
  });

  return (
    <div className="">
      {isFetching ? (
        <div className="h-96 flex justify-center items-center">
          <Loading />
        </div>
      ) : BikeList && BikeList?.length > 0 ? (
        <BikeListTable
          data={BikeList}
          handleFeaturedStatus={(id, bike) => {
            handleFeaturedStatus(id, bike);
            // Optionally manually refetch the bike list here
            // refetch();
          }}
        />
      ) : (
        <Notfound msg="No Data" />
      )}
    </div>
  );
};

export default BikeList;
