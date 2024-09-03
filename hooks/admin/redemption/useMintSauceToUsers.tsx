import { parseAbiItem, formatEther } from 'viem';
import { config } from '@/wagmi';
import { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';
import auctionContractConfig from '@/contracts/config/hashTankNFT';
import sauceContractConfig from '@/contracts/config/sauceNFT';
import { useSimulateContract, useWriteContract } from 'wagmi';
import getFishSauceMetadata from '@/lib/getFishSauceMetadata';
import supabase from '@/lib/superbase';
import { getClient } from '@wagmi/core';
import { getLogs, getBlockNumber, getBlock } from 'viem/actions';

async function calculateSize(fishContent: any) {
  const metas = await getFishSauceMetadata(fishContent);
  let totalSize = metas.reduce(
    (acc, curr) =>
      acc +
        curr?.attributes?.find((each: any) => each.trait_type === 'size')
          ?.value || 0,
    0
  );
  return totalSize;
}

const client: any = getClient(config);

const FISH_GRADE_MAP = [
  {
    name: 'Gunk',
    description:
      "This repugnant sludge is so vile that even the most oblivious consheepmer steers clear of it. Toss it into the industrial waste pile where it belongs, and let's return to some real capitalism.",
    image: `${process.env.NEXT_PUBLIC_SUPABASE_BASE_URL}sauce/images/Gunk.png`,
  },
  {
    name: 'Standard',
    description:
      'A modest, everyday condiment cherished by hundreds of millions, now infused with an extra zing of radiation. Witness the perfect marriage of consumerism and mass production.',
    image: `${process.env.NEXT_PUBLIC_SUPABASE_BASE_URL}sauce/images/Standard.png`,
  },
  {
    name: 'Standard',
    description:
      'A modest, everyday condiment cherished by hundreds of millions, now infused with an extra zing of radiation. Witness the perfect marriage of consumerism and mass production.',
    image: `${process.env.NEXT_PUBLIC_SUPABASE_BASE_URL}sauce/images/Standard.png`,
  },
  {
    name: 'Premium',
    description:
      "Same stuff different packaging. It's amazing how a marketing department can transform product value in the eyes of the consheepmers. Truly, an ode to the capitalist ideal.",
    image: `${process.env.NEXT_PUBLIC_SUPABASE_BASE_URL}sauce/images/Premium.png`,
  },
  {
    name: 'Artisanal',
    description:
      'Perfected over generations in some exotic locale, these families have never heard of fair labor, let alone human rights, but boy, do they know fish sauce. Bringing together the highest of tastes for both your aesthetic appreciation and your taste buds. Harmony incarnate, umami in every drip.',
    image: `${process.env.NEXT_PUBLIC_SUPABASE_BASE_URL}sauce/images/Artisanal.png`,
  },
];

export const UNIQUENESS_MAP = [
  [-0.2, -0.15, -0.1, -0.05, 0],
  [0, -0.1, -0.05, 0, 0.05],
  [0, 0, 0, 0.05, 0.1],
  [0, 0, 0, 0.1, 0.15],
  [0, 0, 0, 0, 0.2],
];

const FISH_SAUCE_MAP = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2],
  [0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2],
  [0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
  [0, 1, 1, 1, 1, 2, 2, 3, 3, 3, 3],
  [0, 1, 1, 1, 1, 2, 2, 3, 3, 3, 3],
  [0, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4],
  [0, 1, 1, 1, 2, 2, 2, 3, 3, 4, 4],
];

function determineFishSauce(
  fishIDs: bigint[],
  saucingFee: string,
  mintPrice: number,
  complexity: number,
  umami: number,
  bottleId: number
) {
  const y = Math.floor(umami / 5);
  const x = Math.floor(complexity / 5);
  const fishSauceGrade = FISH_SAUCE_MAP[x][y];
  return {
    ...FISH_GRADE_MAP[fishSauceGrade],
    createdAt: new Date().getTime(),
    attributes: [
      {
        trait_type: 'ingredients',
        value: fishIDs.map((each: bigint) => Number(each.toString())),
      },
      {
        trait_type: 'w.a. umami',
        value: Math.floor(umami),
      },
      {
        trait_type: 'complexity',
        value: Math.floor(complexity),
      },
      {
        trait_type: 'bottleID',
        value: bottleId,
      },
      {
        trait_type: 'resale_value',
        value: fishSauceGrade ? formatEther(BigInt(mintPrice * 1.2)) : 0,
      },
      {
        trait_type: 'bought_for',
        value: formatEther(BigInt(mintPrice)),
      },
      {
        trait_type: 'minted_for',
        value: saucingFee,
      },
    ],
  };
}

async function generateSauceMetadataUrl(
  saucingFee: string,
  mintPrice: number,
  fishIDs: bigint[],
  fishContent: string[],
  bottleId: number
) {
  const metas = await getFishSauceMetadata(fishContent);
  let uniqueFamilies = [] as string[];
  let uniqueSpecies = [] as string[];
  let totalFertility = 0;
  let totalWeightedAverageUmami = 0;
  let totalRadiation = 0;
  let totalSize = metas.reduce(
    (acc, curr) =>
      acc +
        curr?.attributes?.find((each: any) => each.trait_type === 'size')
          ?.value || 0,
    0
  );
  for (let i = 0; i < metas.length; i++) {
    totalWeightedAverageUmami +=
      (metas[i].attributes.find((attr: any) => attr.trait_type === 'size')
        .value /
        totalSize) *
      metas[i].attributes.find((attr: any) => attr.trait_type === 'umami')
        .value;
    totalFertility += metas[i].attributes.find(
      (attr: any) => attr.trait_type === 'fertility'
    ).value;
    totalRadiation += metas[i].attributes.find(
      (attr: any) => attr.trait_type === 'radiation'
    ).value;
    const family = metas[i].attributes.find(
      (attr: any) => attr.trait_type === 'family'
    ).value;
    if (uniqueFamilies.indexOf(family)) {
      uniqueFamilies.push(family);
    }
    const species = metas[i].attributes.find(
      (attr: any) => attr.trait_type === 'species'
    ).value;
    if (uniqueSpecies.indexOf(family)) {
      uniqueSpecies.push(species);
    }
  }

  const avgFertility = totalFertility / fishContent.length;
  const avgRadiaton = totalRadiation / fishContent.length;
  const m2 =
    UNIQUENESS_MAP[uniqueFamilies.length - 1][uniqueSpecies.length - 1];
  const m1 = (50 - avgFertility + avgRadiaton) / 200;
  const complexity = totalWeightedAverageUmami * (1 - m1) * (1 + m2);
  const sauceAwarded = determineFishSauce(
    fishIDs,
    saucingFee,
    mintPrice,
    complexity,
    totalWeightedAverageUmami,
    bottleId
  );

  const metadataFileLocation = `${
    process.env.NEXT_PUBLIC_SUPABASE_BASE_URL
  }redemption/${bottleId}.json?t=${new Date()}`;

  const res = await fetch(metadataFileLocation);

  const djson = await res.json();

  if (djson.statusCode === '404') {
    const filePath = `redemption/${bottleId}.json`;
    const { data: supData, error } = await supabase.storage
      .from('hashtank')
      .upload(filePath, JSON.stringify(sauceAwarded), {
        cacheControl: '3600',
        upsert: false,
      });

    if (supData?.path && supData.path === filePath) {
      return {
        metadataFileLocation: `${process.env.NEXT_PUBLIC_SUPABASE_BASE_URL}${filePath}`,
        sauceAwarded,
      };
    } else {
      return {
        metadataFileLocation: ``,
        sauceAwarded,
      };
    }
  }
  return { metadataFileLocation, sauceAwarded };
}

// TODO: Optimise with The Graph

const useMintSauceToUsers: any = () => {
  const [isLoading, setLoading] = useState(false);
  const [sauceUrls, setSauceUrls] = useState<string[]>([]);
  const [validSauceBottleRequests, setValidSauceBottleRequests] = useState<any>(
    []
  );
  const [winners, setWinners] = useState<string[]>([]);
  const [bottleIds, setBottleIds] = useState<bigint[]>([]);
  const [buyBackPrices, setBuyBackPrices] = useState<bigint[]>([]);
  const { data: saucingFee } = useReadContract({
    ...auctionContractConfig,
    functionName: 'saucingFee',
  });
  const saucingFeeAmountInGweiBigInt: bigint = (saucingFee ||
    BigInt(0)) as bigint;
  const saucingFeeEthString = formatEther(saucingFeeAmountInGweiBigInt);
  async function calculateBuyBackPrice(tokenIds: any) {
    let totalBid = 0;

    for (let i = 0; i < tokenIds.length; i++) {
      // @ts-ignore
      const currentBlockNumber = await getBlockNumber(client);
      // @ts-ignore
      const rawLogs = await getLogs(client, {
        address: auctionContractConfig.address,
        event: parseAbiItem(
          'event FishAwarded(uint256 batchId, uint256 indexed tokenId, address indexed bidder, uint256 bid, uint256 batchFishIndex)'
        ),
        args: {
          tokenId: BigInt(tokenIds[i]),
        },
        fromBlock: BigInt(0),
        toBlock: currentBlockNumber,
        strict: true,
      });

      const logs = await Promise.all(
        rawLogs.map(async (each: any) => {
          // @ts-ignore
          const block = await getBlock(client, {
            blockNumber: each.blockNumber,
          });
          return {
            ...each,
            ts: block.timestamp,
          };
        })
      );

      totalBid += Number(logs?.[0]?.args?.bid);
    }

    return totalBid;
  }

  useEffect(() => {
    async function init() {
      try {
        setLoading(true);
        // @ts-ignore
        const currentBlockNumber = await getBlockNumber(client);
        // @ts-ignore
        const rawLogsForBurntTokens = await getLogs(client, {
          address: auctionContractConfig.address,
          event: parseAbiItem(
            'event MintSauceRequest(uint256 indexed bottleId, address indexed owner, string[] fishContent, uint256[] fishIDs)'
          ),
          fromBlock: BigInt(0),
          toBlock: currentBlockNumber,
          strict: true,
        });
        // @ts-ignore
        const rawLogsForMintedSauce = await getLogs(client, {
          address: sauceContractConfig.address,
          event: parseAbiItem(
            'event SauceMinted(uint256 indexed sauceId, address indexed owner, uint256 indexed bottleId)'
          ),

          fromBlock: BigInt(0),
          toBlock: currentBlockNumber,
          strict: true,
        });

        let winners: string[] = [];
        let bottleIds: bigint[] = [];
        let buyBackPrices: bigint[] = [];
        let sauceContents: string[][] = [];
        let emptyList: string[] = [];

        try {
          const sauceBottleRequests = await Promise.all(
            rawLogsForBurntTokens
              ?.filter?.((each: any) => {
                return !rawLogsForMintedSauce.find((mintedLog: any) => {
                  return mintedLog.args.bottleId == each.args.bottleId;
                });
              })
              ?.map(async (log: any) => {
                const winner = log.args.owner;
                const bottleId = log.args.bottleId;
                const fishContent: string[] = log.args.fishContent;
                const fishIDs: bigint[] = log.args.fishIDs;
                const mintPrice = await calculateBuyBackPrice(fishIDs);

                const size = await calculateSize(fishContent);

                let buyBackPrice = 0;

                try {
                  const { metadataFileLocation: metadataUrl, sauceAwarded } =
                    await generateSauceMetadataUrl(
                      saucingFeeEthString,
                      mintPrice,
                      fishIDs,
                      fishContent,
                      Number(bottleId)
                    );

                  buyBackPrice =
                    sauceAwarded.name === 'The GUNK' ? 0 : mintPrice * 1.2;
                  emptyList.push(metadataUrl);
                } catch (e) {
                  console.log('e', e);
                  throw new Error(
                    `'sauce generation failed: ${JSON.stringify(fishContent)}'`
                  );
                }

                // const sauceMetadataUrl = generateSauceMetadataUrl(fishContent);

                winners.push(winner);
                bottleIds.push(bottleId);
                // sauceUrls.push(sauceMetadataUrl);
                buyBackPrices.push(BigInt(buyBackPrice));
                sauceContents.push(fishContent);

                return {
                  bottleId: Number(bottleId),
                  winner,
                  fishContent,
                  buyBackPrice: formatEther(BigInt(buyBackPrice)),
                  // sauceMetadataUrl: sauceMetadataUrl,
                  size: size,
                };
              })
          );

          const validSauceBottleRequests = sauceBottleRequests.filter(
            (each) => each.size >= 100
          );
          setWinners(winners);
          setBottleIds(bottleIds);
          setBuyBackPrices(buyBackPrices);
          setSauceUrls(emptyList);
          setValidSauceBottleRequests(validSauceBottleRequests);
          setLoading(false);
        } catch (e: any) {
          console.log('ERORORRO', e);
        }
      } catch (e) {
        setLoading(false);
      }
    }
    init();
  }, []);

  const mintSauceConfig = {
    ...sauceContractConfig,
    functionName: 'mintSauce',
    args: [winners, buyBackPrices, sauceUrls, bottleIds],
  };
  const {
    data: mintSauceContractWriteConfig,
    error: mintSauceContractWriteConfigError,
    isError: isMintSauceContractWriteConfigError,
  } = useSimulateContract(mintSauceConfig);

  const {
    data: mintSauceWriteData,
    writeContractAsync: mintSauceWriteAsync,
    error: mintSauceWriteError,
  } = useWriteContract();

  async function mintSauceToWinnersWallet(e: any) {
    try {
      await mintSauceWriteAsync?.(mintSauceConfig);
    } catch (e) {
      console.log('ERORR', e);
    }
  }

  return {
    validSauceBottleRequests: validSauceBottleRequests,
    totalSpendBigInt: buyBackPrices.reduce(
      (previousValue: bigint, currentValue: bigint) =>
        previousValue + currentValue,
      BigInt(0)
    ),
    isLoading,
    mintSauceToWinnersWallet,
    sauceUrls,
  };
};

export default useMintSauceToUsers;
