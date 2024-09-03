// emit SauceRedeemed(tokenId, msg.sender);
// emit BottleDropped(tokenCounter, msg.sender, bottleURIs[i], originalTokenIds[i]);
// diff the logs of the two events to make sure that we only drop new bottles to those sauce that has been redeemed but did not receive new bottles.
// use the diffed logs and the generated bottleURIs to formulate the parameters for the function call
// dropSauceBottle(address[] calldata winners, string[] calldata bottleURIs, uint256[] calldata originalTokenIds)
import { parseAbiItem } from 'viem';
import { config } from '@/wagmi';
import { useEffect, useState } from 'react';
import sauceContractConfig from '@/contracts/config/sauceNFT';
import { useSimulateContract, useWriteContract } from 'wagmi';
import { getClient } from '@wagmi/core';
import { getLogs, getBlockNumber } from 'viem/actions';

const client: any = getClient(config);

const GIFT_BOTTLE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_BASE_URL}sauce/json/2.json`;
const EMPTY_BOTTLE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_BASE_URL}sauce/json/1.json?t=2023-11-15T16%3A20%3A42.706Z`;

const BOTTLE_LIST = [GIFT_BOTTLE_URL, EMPTY_BOTTLE_URL];

// TODO: Optimise with The Graph
const useMintBottleToUsers: any = () => {
  const [redeemedLogs, setRedeemedSauceLogs] = useState([]);
  const [bottleDroppedLogs, setBottleDroppedLogs] = useState([]);
  const [isLoading, setLoading] = useState(false);

  async function init() {
    try {
      setLoading(true);
      // @ts-ignore
      const currentBlockNumber = await getBlockNumber(client);
      // @ts-ignore
      const rawLogsForRedeemedSauce = await getLogs(client, {
        address: sauceContractConfig.address,
        event: parseAbiItem(
          'event SauceRedeemed(uint256 indexed tokenId, address indexed redeemer)'
        ),
        fromBlock: BigInt(0),
        toBlock: currentBlockNumber,
        strict: true,
      });
      // @ts-ignore
      const rawLogsForBottleDropped = await getLogs(client, {
        address: sauceContractConfig.address,
        event: parseAbiItem(
          'event BottleDropped(uint256 tokenId, address indexed winner, string bottleUri, uint256 indexed originalTokenId)'
        ),
        fromBlock: BigInt(0),
        toBlock: currentBlockNumber,
        strict: true,
      });

      setRedeemedSauceLogs(rawLogsForRedeemedSauce as []);
      setBottleDroppedLogs(rawLogsForBottleDropped as []);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!isLoading) init();
  }, []);

  let winners: string[] = [];
  let bottleURIs: string[] = [];
  let originalTokenIds: bigint[] = [];

  const bottleDrops = redeemedLogs
    ?.filter?.((each: any) => {
      return !bottleDroppedLogs.find((bottledDropLog: any) => {
        return bottledDropLog.args.originalTokenId == each.args.tokenId;
      });
    })
    ?.map((log: any) => {
      const winner = log.args.redeemer;
      const originalTokenId = log.args.tokenId;
      const randNum = Math.round(Math.random());
      const bottleMetadataUrl = BOTTLE_LIST[randNum];

      winners.push(winner);
      originalTokenIds.push(originalTokenId);
      bottleURIs.push(bottleMetadataUrl);

      return {
        originalTokenId: Number(originalTokenId),
        winner,
        bottleMetadataUrl,
      };
    });

  const dropBottleConfig = {
    ...sauceContractConfig,
    functionName: 'dropSauceBottle',
    args: [winners, bottleURIs, originalTokenIds],
  };

  const {
    data: dropBottleContractWriteConfig,
    error: dropBottleContractWriteConfigError,
    isError: isDropBottleContractWriteConfigError,
  } = useSimulateContract(dropBottleConfig);

  const {
    data: dropBottleWriteData,
    writeContractAsync: dropBottleWriteAsync,
    error: dropBottleWriteError,
  } = useWriteContract();

  async function dropBottleToWinnersWallet(e: any) {
    await dropBottleWriteAsync?.(dropBottleConfig);
  }

  return {
    bottleDrops,
    isLoading,
    dropBottleToWinnersWallet,
  };
};

export default useMintBottleToUsers;
