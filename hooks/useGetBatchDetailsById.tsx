import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { useReadContract } from 'wagmi';
import { fromUnixTime, format } from 'date-fns';

const useGetBatchDetailsById = (batchId: string) => {
  const currentBatchId: string = batchId;

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

  const batchNumber: string = batchId
    ? ((BigInt(batchId) as bigint) + BigInt(0)).toString()
    : '1';

  return {
    batchStatus,
    batchPrefix,
    batchName,
    batchNumber,
    endAtTsInMs,
    humanReadableStartTimeDMMMMYYYY,
    humanReadableStartTime,
    batchContentDefined,
  };
};

export default useGetBatchDetailsById;
