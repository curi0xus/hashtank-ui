import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { useReadContract } from 'wagmi';
import { fromUnixTime, format } from 'date-fns';
import useHashTankAccount from '../useHashtankAccount';

const useLoveSauceProgram: any = () => {
  const { address } = useHashTankAccount();
  const { data: currentLoveSauceProgramCounter } = useReadContract({
    ...auctionContractConfig,
    functionName: 'loveSauceProgramBatchId',
    query: {
      cacheTime: 15000,
      staleTime: 3000,
    },
  });

  const currentLoveSauceProgramId: string = currentLoveSauceProgramCounter
    ? currentLoveSauceProgramCounter.toString()
    : '1';

  const { data: currentLoveSauceProgram } = useReadContract({
    ...auctionContractConfig,
    functionName: 'loveSauceProgramBatches',
    args: [BigInt(currentLoveSauceProgramId)],
    query: {
      cacheTime: 15000,
      staleTime: 3000,
    },
  });

  const { data: isParticipantInLoveSauceBatch } = useReadContract({
    ...auctionContractConfig,
    functionName: 'getParticpationInLoveSauceBatch',
    args: [BigInt(currentLoveSauceProgramId), address],
  });

  const startAtBigInt = (currentLoveSauceProgram as Array<any>)?.[1];
  const startAtTsString: string = startAtBigInt?.toString();
  const startAtTsInSecs: number = !!startAtTsString
    ? Number(startAtTsString)
    : 0;
  const startAtTsInMs: number = startAtTsInSecs * 1000;

  const humanReadableStartTime = format(
    fromUnixTime(startAtTsInSecs),
    'dd.M.yyyy'
  );
  const endAtBigInt = (currentLoveSauceProgram as Array<any>)?.[2];
  const endAtTsString: string = endAtBigInt?.toString();
  const endAtTsInSecs: number = Number(endAtTsString);
  const endAtTsInMs: number = endAtTsInSecs * 1000;
  const minCohortSizeBigInt = (currentLoveSauceProgram as Array<any>)?.[3];
  const minCohortSizeString: string = minCohortSizeBigInt?.toString();
  const minCohortSizeNumber: number = Number(minCohortSizeString);
  const maxCohortSizeBigInt = (currentLoveSauceProgram as Array<any>)?.[4];
  const maxCohortSizeString: string = maxCohortSizeBigInt?.toString();
  const maxCohortSizeNumber: number = Number(maxCohortSizeString);
  const status = (currentLoveSauceProgram as Array<any>)?.[5];

  return {
    endAtTsInMs,
    humanReadableStartTime,
    status,
    maxCohortSizeString,
    maxCohortSizeNumber,
    minCohortSizeString,
    minCohortSizeNumber,
    currentLoveSauceProgramId,
    startAtTsInMs,
    isParticipantInLoveSauceBatch,
  };
};

export default useLoveSauceProgram;
