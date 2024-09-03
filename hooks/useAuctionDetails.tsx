import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { useReadContract } from 'wagmi';
import { fromUnixTime, format } from 'date-fns';

const useAuctionDetails = () => {
  const { data: currentBatchCount } = useReadContract({
    ...auctionContractConfig,
    functionName: 'batchCounter',
    query: {
      cacheTime: 15000,
      staleTime: 3000,
    },
  });

  const currentBatchId: string = currentBatchCount
    ? currentBatchCount.toString()
    : '0';

  const { data: currentBatchData } = useReadContract({
    ...auctionContractConfig,
    functionName: 'batches',
    args: [BigInt(currentBatchId)],
    query: {
      cacheTime: 15000,
      staleTime: 3000,
    },
  });

  const minBidPriceInBigInt = (currentBatchData as Array<any>)?.[0];
  const minBidPriceNumberString = minBidPriceInBigInt?.toString();
  const startAt = (currentBatchData as Array<any>)?.[1];
  const startAtTsString: string = startAt?.toString();
  const startAtTsInSecs: number = !!startAtTsString
    ? Number(startAtTsString)
    : 0;
  const humanReadableStartTimeDMMMMYYYY = format(
    fromUnixTime(startAtTsInSecs),
    'd MMMM yyyy'
  );
  const humanReadableStartTime = format(
    fromUnixTime(startAtTsInSecs),
    'dd.M.yyyy'
  );
  const endAt = (currentBatchData as Array<any>)?.[2];
  const endAtTsString: string = endAt?.toString();
  const endAtTsInSecs: number = Number(endAtTsString);
  const endAtTsInMs: number = endAtTsInSecs * 1000;
  const batchStatus = (currentBatchData as Array<any>)?.[3];
  const batchPrefix = (currentBatchData as Array<any>)?.[4];
  const batchName = (currentBatchData as Array<any>)?.[5];
  const batchDescription = (currentBatchData as Array<any>)?.[6];

  const { data: batchContent } = useReadContract({
    ...auctionContractConfig,
    functionName: 'getBatchContent',
    args: [BigInt(currentBatchId)],
    query: {
      cacheTime: 15000,
      staleTime: 3000,
    },
  });

  const batchContentDefined: Array<BigInt> = batchContent as Array<BigInt>;

  const batchNumber: string = currentBatchCount
    ? ((currentBatchCount as bigint) + BigInt(0)).toString()
    : '1';

  return {
    batchStatus,
    batchName,
    batchPrefix,
    batchDescription,
    currentBatchId,
    batchNumber,
    endAtTsInMs,
    minBidPriceNumberString,
    humanReadableStartTimeDMMMMYYYY,
    humanReadableStartTime,
    batchContentDefined,
  };
};

export default useAuctionDetails;
