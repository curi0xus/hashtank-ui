import { parseAbiItem } from 'viem';
import { config } from '@/wagmi';
import { useEffect, useState } from 'react';
import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { getClient } from '@wagmi/core';
import { getLogs, getBlockNumber } from 'viem/actions';
import { usePrivy } from '@privy-io/react-auth';

const client: any = getClient(config);
const useGetMyBids: any = (batchId: string) => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { user } = usePrivy();
  const address = user?.wallet?.address;

  async function init() {
    if (address) {
      try {
        setLoading(true);
        const currentBlockNumber = await getBlockNumber(client);
        console.log(address);
        const rawLogs = await getLogs(client, {
          address: auctionContractConfig.address,
          event: parseAbiItem(
            'event BidCreated(uint256 indexed batchId, uint256 indexed fishBatchNumber, address indexed bidder, uint256 bid)'
          ),
          args: {
            bidder: address.toLowerCase() as `0x${string}`,
            batchId: BigInt(batchId),
          },
          fromBlock: BigInt(0),
          toBlock: currentBlockNumber,
          strict: true,
        });
        console.log(rawLogs);

        const logs = rawLogs.map((each: any) => {
          return {
            ...each.args,
          };
        });
        setLogs(logs as []);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    if (!logs.length && address) init();
  }, [address]);

  return {
    refreshBids: init,
    logs,
    isLoading,
  };
};

export default useGetMyBids;
