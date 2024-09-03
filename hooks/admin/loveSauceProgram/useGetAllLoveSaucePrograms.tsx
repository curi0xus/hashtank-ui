import { parseAbiItem } from 'viem';
import { config } from '@/wagmi';
import { useEffect, useState } from 'react';
import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { getClient } from '@wagmi/core';
import { getLogs, getBlockNumber } from 'viem/actions';

// TODO: Optimise with The Graph
// Optimise based on the timestamp of the event created. If it's too old, we can omit them
const client: any = getClient(config);

const useGetAllLoveSaucePrograms: any = () => {
  const [loveSauceProgramCreatedLogs, setLoveSauceProgramCreatedLogs] =
    useState([]);
  const [isLoading, setLoading] = useState(false);

  async function init() {
    try {
      setLoading(true);
      // @ts-ignore
      const currentBlockNumber = await getBlockNumber(client);
      // @ts-ignore
      const rawLogsForLoveSauceProgramBatchCreated = await getLogs(client, {
        address: auctionContractConfig.address,
        event: parseAbiItem(
          'event LoveSauceProgramBatchCreated(uint256 indexed batchId, uint256 indexed startAt, uint256 endAt, uint256 indexed distributeAt)'
        ),
        fromBlock: BigInt(0),
        toBlock: currentBlockNumber,
        strict: true,
      });

      console.log('RAW LOGS', rawLogsForLoveSauceProgramBatchCreated);
      // @ts-ignore
      const rawLogsForLoveSauceProgramBatchClosed = await getLogs(client, {
        address: auctionContractConfig.address,
        event: parseAbiItem('event CloseLoveSauceProgram(uint256 batchId)'),
        fromBlock: BigInt(0),
        toBlock: currentBlockNumber,
        strict: true,
      });

      const relevantLogs = rawLogsForLoveSauceProgramBatchCreated?.filter?.(
        (each: any) => {
          return !rawLogsForLoveSauceProgramBatchClosed.find(
            (log: any) => log.args.batchId === each.args.batchId
          );
        }
      );

      setLoveSauceProgramCreatedLogs(relevantLogs as []);
      setLoading(false);
    } catch (e) {
      console.log('error', e);
      setLoading(false);
    }
  }
  useEffect(() => {
    if (!loveSauceProgramCreatedLogs.length) init();
  }, []);

  const loveSaucePrograms = loveSauceProgramCreatedLogs?.map((each: any) => ({
    batchId: Number(each?.args?.batchId),
    startAt: Number(each?.args?.startAt),
    endAt: Number(each?.args?.endAt),
  }));

  return {
    loveSaucePrograms,
    isLoading,
  };
};

export default useGetAllLoveSaucePrograms;
