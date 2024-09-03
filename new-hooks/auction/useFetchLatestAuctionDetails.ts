import useFetchLatestAuctionId from './useFetchLatestAuctionId';
import useFetchAuctionDetailById from './useFetchAuctionDetailsById';

const useFetchLatestAuctionDetails = (select?: any, id?: string) => {
  const { data: latestAuctionId } = useFetchLatestAuctionId();
  const { data: auctionDetails } = useFetchAuctionDetailById(
    id || latestAuctionId,
    select
  );
  return {
    ...auctionDetails,
  };
};
export default useFetchLatestAuctionDetails;
