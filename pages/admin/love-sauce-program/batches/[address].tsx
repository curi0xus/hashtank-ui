import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Code,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import useGetRegisteredFish from '@/hooks/admin/loveSauceProgram/useGetRegisteredFish';
import useDistributeOffspring from '@/hooks/admin/loveSauceProgram/useDistributeOffspring';
import useGetTokenMetas from '@/hooks/admin/loveSauceProgram/useGetTokenMetas';
import useGetTokenMetadata from '@/hooks/useGetTokenMetadata';
import { useRouter } from 'next/router';
import useGetMintedOffsprings from '@/hooks/admin/loveSauceProgram/useGetMintedOffsprings';
import supabase from '@/lib/superbase';
import useLoveSauceProgram from '@/hooks/LoveSauceProgram/useLoveSauceProgram';

const COLOR_NAME_MAP = {
  '1000': {
    A: 'Silver',
    B: 'Brown',
  },
  '2000': {
    A: 'Blue',
    B: 'Golden',
  },
  '3000': {
    A: 'Grey',
    B: 'Streaked',
  },
  '4000': {
    A: 'Brown',
    B: 'Mauve',
  },
};

const ParentFishDetails = ({ fishId }: any) => {
  const { image, ...rest } = useGetTokenMetadata(String(fishId));
  const [data, setData] = useState({
    image: '',
  });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {image && <Image alt='sauce' height={100} width={100} src={image} />}
      <p
        style={{
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        View metadata
      </p>
      {isOpen && (
        <Code
          style={{
            textDecoration: 'underline',
            maxWidth: 300,
            overflow: 'scroll',
          }}
        >
          <pre>{JSON.stringify(rest, null, 2)}</pre>
        </Code>
      )}
    </div>
  );
};

const ParentFishList = ({ parentFishIds }: any) => {
  return (
    <Td>
      {parentFishIds.map((each: any) => (
        <ParentFishDetails key={each} fishId={each} />
      ))}
    </Td>
  );
};

const Offspring = ({ url, offspringMeta }: any) => {
  const [d, setData] = useState({
    image: '',
  });
  const [isOpen, setIsOpen] = useState(false);

  async function init() {
    const res = await fetch(url);
    const metadata = await res.json();
    console.log('META DATA', url);
    setData(metadata);
  }

  useEffect(() => {
    url && !offspringMeta && init();
  }, []);

  const data = d?.image ? d : offspringMeta;

  return (
    <div>
      {data?.image && (
        <Image alt='sauce' height={100} width={100} src={data.image} />
      )}
      <p
        style={{
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        View metadata
      </p>
      {isOpen && (
        <Code
          style={{
            textDecoration: 'underline',
            maxWidth: 300,
            overflow: 'scroll',
          }}
        >
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Code>
      )}
    </div>
  );
};

async function degradeParentMetadata(metas: any, urls: any) {
  const degradedMetas = metas.map((each: any) => ({
    ...each,
    attributes: each.attributes.map((attri: any) => {
      if (attri.trait_type === 'fertility' || attri.trait_type === 'umami') {
        return {
          ...attri,
          value: 0,
        };
      } else {
        return attri;
      }
    }),
    updatedAt: new Date().getTime(),
    isBroodFish: true,
  }));

  degradedMetas.forEach(async (each: any, i: number) => {
    let objJsonStr = JSON.stringify(each);
    const filePath = urls[i].split(
      process.env.NEXT_PUBLIC_SUPABASE_BASE_URL
    )[1];

    const { data, error } = await supabase.storage
      .from('hashtank')
      .update(filePath, objJsonStr, {
        cacheControl: '3600',
        upsert: true,
      });
  });
}

const Offsprings = ({
  distributeOffspringWriteAsync,
  offspringDataUrls,
  degradeParentFishIds,
}: any) => {
  const { tokenMetas, tokenUrls } = useGetTokenMetas(
    degradeParentFishIds.map((each: bigint) => each.toString())
  );

  const onMint = async () => {
    try {
      await distributeOffspringWriteAsync?.();
      await degradeParentMetadata(tokenMetas, tokenUrls);
    } catch (e: any) {
      console.log('error', e);
    }
  };
  return (
    <div>
      {offspringDataUrls.map((each: string) => (
        <Offspring key={each} url={each} />
      ))}
      <button
        onClick={onMint}
        style={{ border: '1px solid white', background: 'red', marginTop: 10 }}
      >
        Distribute Offspring
      </button>
    </div>
  );
};

function determineColor(avgFertility: number, setIndex: number) {
  console.log('AVG FERTILITY', avgFertility);
  const roll = Math.random();
  const colorMap = {
    0: [0.1, 0.3, 0.6],
    5: [0.13, 0.35, 0.63],
    10: [0.16, 0.39, 0.66],
    15: [0.19, 0.44, 0.69],
    20: [0.22, 0.48, 0.72],
    25: [0.25, 0.53, 0.75],
    30: [0.28, 0.57, 0.78],
    35: [0.31, 0.62, 0.81],
    40: [0.34, 0.66, 0.84],
    45: [0.37, 0.71, 0.87],
    50: [0.4, 0.75, 0.9],
  };
  // @ts-ignore
  const benchMark = colorMap[avgFertility][setIndex];
  const offSpringColorCode = roll <= benchMark ? 'B' : 'A';

  return offSpringColorCode;
}

function determineMutationOffset(avgFertility: number) {
  const roll = Math.random();
  const mutationMap = {
    0: [0.2, 0.5, 0.8, 1.0, null],
    5: [0.19, 0.47, 0.76, 0.99, 1.0],
    10: [0.18, 0.45, 0.72, 0.98, 1.0],
    15: [0.17, 0.42, 0.66, 0.97, 1.0],
    20: [0.16, 0.4, 0.61, 0.95, 1.0],
    25: [0.15, 0.38, 0.56, 0.93, 1.0],
    30: [0.11, 0.28, 0.41, 0.88, 1.0],
    35: [0.07, 0.17, 0.24, 0.82, 1.0],
    40: [0.02, 0.05, 0.07, 0.75, 1.0],
    45: [0.0, 0.01, 0.01, 0.7, 1.0],
    50: [null, null, 0, 0.67, 1.0],
  };
  // @ts-ignore
  const levels = mutationMap[avgFertility];
  const offsets = [-2, -1, 0, +1, +2];
  let offSetIndex = 0;

  for (let i = 0; i < levels.length; i++) {
    if (levels[i] >= 0 && roll <= levels[i]) {
      offSetIndex = i;
      break;
    }
  }

  if (offSetIndex === undefined) {
    throw new Error('offset cannot be undefined');
  }
  return offsets[offSetIndex];
}

function determinMutationSet(avgFertility: number) {
  const roll = Math.random();
  const mutationSetMap = {
    0: [0.45, 0.55, 1.0],
    5: [0.44, 0.56, 1.0],
    10: [0.43, 0.57, 1.0],
    15: [0.42, 0.59, 1.0],
    20: [0.4, 0.6, 1.0],
    25: [0.38, 0.62, 1.0],
    30: [0.36, 0.65, 1.0],
    35: [0.33, 0.68, 1.0],
    40: [0.29, 0.71, 1.0],
    45: [0.25, 0.75, 1.0],
    50: [0.2, 0.8, 1.0],
  };
  // @ts-ignore
  const levels = mutationSetMap[avgFertility];
  const mutationSets = ['S1', 'S2', 'S3'];
  let mutationSetIndex = undefined;

  for (let i = 0; i < levels.length; i++) {
    if (roll <= levels[i]) {
      mutationSetIndex = i;
      break;
    }
  }

  if (mutationSetIndex === undefined) {
    throw new Error('set index cannot be undefined');
  }
  return mutationSets[mutationSetIndex];
}

function getMatingPairs(parentsMetadata: any) {
  let familySpeciesMap = {};
  for (let i = 0; i < parentsMetadata.length; i++) {
    const family = parentsMetadata[i].attributes.find(
      (each: any) => each.trait_type === 'family'
    ).value;

    const species = parentsMetadata[i].attributes.find(
      (each: any) => each.trait_type === 'species'
    ).value;
    const familySpeciesKey = `${family}_${species}`;
    // @ts-ignore
    if (!familySpeciesMap[familySpeciesKey]) {
      let sameKind = parentsMetadata.filter(
        (each: any) =>
          each.attributes.find((each: any) => each.trait_type === 'family')
            .value === family &&
          each.attributes.find((each: any) => each.trait_type === 'species')
            .value === species
      );

      if (sameKind.length % 2 !== 0) {
        // find the strongest fish
        sameKind = sameKind.sort((each: any) => {
          each.attributes.find((each: any) => each.trait_type === 'fertility')
            .value;
        });

        sameKind.pop();
      }
      // @ts-ignore
      familySpeciesMap[familySpeciesKey] = sameKind;
    }
  }
  return familySpeciesMap;
}

//
function getOffspring(parentsMetadata: any) {
  console.log('PARENTS METADATA', parentsMetadata);
  // Determine mutation set S1, S2 or S3
  // Determine mutation
  let totalSumOfFertility = 0;
  let parentColorCode = '';

  const family = parentsMetadata[0].attributes.find(
    (each: any) => each.trait_type === 'family'
  ).value;

  const species = parentsMetadata[0].attributes.find(
    (each: any) => each.trait_type === 'species'
  ).value;

  const color = parentsMetadata[0].attributes.find(
    (each: any) => each.trait_type === 'color'
  ).value;

  const imageUrl = parentsMetadata[0].image;
  const fishType = imageUrl.split('/')[11];

  for (let i = 0; i < parentsMetadata.length; i++) {
    totalSumOfFertility += parentsMetadata[i].attributes.find(
      (each: any) => each.trait_type === 'fertility'
    ).value;
    const colorCode = parentsMetadata[i].attributes.find(
      (each: any) => each.trait_type === 'color_code'
    ).value;
    parentColorCode = parentColorCode + colorCode;
  }

  const fertilityWaNumMutation = Math.round(
    ((parentsMetadata[0].attributes.find(
      (each: any) => each.trait_type === 'fertility'
    ).value /
      totalSumOfFertility) *
      parentsMetadata[0].attributes.find(
        (each: any) => each.trait_type === 'mutations'
      ).value.length +
      (parentsMetadata[1].attributes.find(
        (each: any) => each.trait_type === 'fertility'
      ).value /
        totalSumOfFertility) *
        parentsMetadata[1].attributes.find(
          (each: any) => each.trait_type === 'mutations'
        ).value.length) /
      2
  );

  const setIndex =
    parentColorCode === 'AA' ? 0 : parentColorCode === 'BB' ? 1 : 2;
  const avgFertility = Math.ceil(Math.round(totalSumOfFertility / 2) / 5) * 5;

  // A or B
  const offspringColor = determineColor(avgFertility, setIndex);
  // @ts-ignore
  const offspringColorName = COLOR_NAME_MAP[fishType][offspringColor];

  // -2, -1, 0, +1, +2
  const offset = determineMutationOffset(avgFertility);

  // S1, S2, S3
  const mutationSet = determinMutationSet(avgFertility);

  const totalNumOffspringMutations = fertilityWaNumMutation + offset;

  let offspringMutations = [];

  for (let i = 0; i < totalNumOffspringMutations; i++) {
    const roll = Math.random();
    const levels = [0.05, 0.27, 0.49, 0.78, 1.0];
    const mutationShortCode = ['SP', 'IR', 'BE', 'RR', 'TA'];
    for (let k = 0; k < levels.length; k++) {
      if (roll < levels[k]) {
        offspringMutations.push(mutationShortCode[k]);
      }
    }
  }

  const orderedShortCode = ['IR', 'BE', 'RR', 'TA', 'SP'];

  let mutationString = '';
  for (let i = 0; i < orderedShortCode.length; i++) {
    if (offspringMutations.indexOf(orderedShortCode[i]) > -1) {
      mutationString = mutationString + `_${orderedShortCode[i]}`;
    }
  }

  if (mutationString.length === 0) {
    mutationString += `_PR`;
  }

  const jsonFileName = `${process.env.NEXT_PUBLIC_SUPABASE_BASE_URL}offsprings/json/${fishType}/${family}_${species}_${offspringColorName}${mutationString}_${offspringColor}${mutationSet}.json`;

  return jsonFileName;
}

const MintedOffSprings = ({ mintedOffsprings }: any) => {
  const { tokenMetas } = useGetTokenMetas(
    mintedOffsprings.map((each: bigint) => each.toString())
  );
  return (
    <div>
      {tokenMetas.map((each: string, i: number) => (
        <Offspring key={i} offspringMeta={each} />
      ))}
    </div>
  );
};

const GenerateOffspring = ({ parentFishIds, fishOwner, batchId }: any) => {
  const [offspringData, setOffspringData] = useState({
    buyBackPrices: [],
    offspringDataUrls: [],
    parentFishIds: [],
    failedParentIds: [],
  });

  const { distributeOffspringWriteAsync } = useDistributeOffspring(
    fishOwner,
    offspringData.offspringDataUrls,
    offspringData.buyBackPrices,
    batchId,
    offspringData.parentFishIds,
    offspringData.failedParentIds
  );

  const [isGenerated, setIsGenerated] = useState(false);

  const { tokenMetas } = useGetTokenMetas(
    parentFishIds.map((each: bigint) => each.toString())
  );

  const { mintedOffsprings } = useGetMintedOffsprings(batchId);

  const btnClickHandler = () => {
    setIsGenerated(true);
    const findMatingPairs = getMatingPairs(tokenMetas);
    // @ts-ignore
    let offspringDataUrls = [];
    let successfulParents: any[] = [];

    console.log('PARENTS FISH ID', parentFishIds);

    for (let i = 0; i < Object.keys(findMatingPairs).length; i++) {
      // @ts-ignore
      const allParents = findMatingPairs[Object.keys(findMatingPairs)[i]];
      // @ts-ignore
      console.log(allParents, tokenMetas);
      for (let k = 0; k < allParents.length / 2; k += 2) {
        const parents = [allParents[k], allParents[k + 1]];
        successfulParents.push(BigInt(allParents[k].tokenId));
        successfulParents.push(BigInt(allParents[k + 1].tokenId));
        const offspringDataUrl = getOffspring(parents);
        offspringDataUrls.push(offspringDataUrl);
      }
      console.log(450, successfulParents, parentFishIds);
      const failedParentIds = parentFishIds.filter((each: any) => {
        //@ts-ignore
        return !successfulParents.find((id: string) => id == each.toString());
      });
      const offsprignData = {
        buyBackPrices: [1, 1, 1],
        offspringDataUrls: offspringDataUrls,
        parentFishIds,
        failedParentIds,
      };

      console.log('OFFSPRING DATA', offsprignData);
      // @ts-ignore
      setOffspringData(offsprignData);
    }
  };

  return mintedOffsprings.length ? (
    <MintedOffSprings mintedOffsprings={mintedOffsprings} />
  ) : isGenerated ? (
    <Offsprings
      degradeParentFishIds={[
        ...offspringData.parentFishIds,
        ...offspringData.failedParentIds,
      ]}
      offspringDataUrls={offspringData.offspringDataUrls}
      distributeOffspringWriteAsync={distributeOffspringWriteAsync}
    />
  ) : (
    <button
      style={{
        border: '1px solid white',
        background: 'red',
      }}
      onClick={btnClickHandler}
    >
      Generate Offies
    </button>
  );
};

const ComponentBlock = ({ address, batchId }: any) => {
  const { registrationDetails } = useGetRegisteredFish(
    Number(batchId),
    address
  );
  const { endAtTsInSecs } = useLoveSauceProgram();

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        background: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>Distribute Offspring {endAtTsInSecs}</h1>
      <TableContainer>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th>Batch ID</Th>
              <Th>Owner</Th>
              <Th>Parent Fish</Th>
              <Th>Offspring</Th>
            </Tr>
          </Thead>
          <Tbody>
            {registrationDetails.map((each: any) => {
              return (
                <Tr key={each.batchId}>
                  <Td>#{each.batchId}</Td>
                  <Td>{each.fishOwner}</Td>
                  <ParentFishList parentFishIds={each.fishIds} />
                  <GenerateOffspring
                    parentFishIds={each.fishIds}
                    fishOwner={each.fishOwner}
                    batchId={each.batchId}
                  />
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

const OwnerRegisteredFishes = () => {
  const { query } = useRouter();
  const address = query.address;
  const batchId = query.batchId;

  return (
    <>
      {address && batchId && (
        <ComponentBlock address={address} batchId={batchId} />
      )}
    </>
  );
};

export default OwnerRegisteredFishes;
