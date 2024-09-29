import { createSupabaseClient } from '@/util/supabase/server';
import getFishSauceMetaData from '@/lib/getFishSauceMetadata';
import { generateRandomString } from '../auctions/latest-auction';
import { UNIQUENESS_MAP } from '@/hooks/admin/redemption/useMintSauceToUsers';
import type { NextApiRequest, NextApiResponse } from 'next';

const supabase = createSupabaseClient();

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

const FISH_GRADE_MAP = [
  {
    name: 'Gunk',
    description:
      "This repugnant sludge is so vile that even the most oblivious consheepmer steers clear of it. Toss it into the industrial waste pile where it belongs, and let's return to some real capitalism.",

    image: `${process.env.NEXT_PUBLIC_SUPABASE_SAUCE_URL}sauce_templates/images/Gunk.png`,
  },
  {
    name: 'Standard',
    description:
      'A modest, everyday condiment cherished by hundreds of millions, now infused with an extra zing of radiation. Witness the perfect marriage of consumerism and mass production.',
    image: `${process.env.NEXT_PUBLIC_SUPABASE_SAUCE_URL}sauce_templates/images/Standard.png`,
  },
  {
    name: 'Standard',
    description:
      'A modest, everyday condiment cherished by hundreds of millions, now infused with an extra zing of radiation. Witness the perfect marriage of consumerism and mass production.',
    image: `${process.env.NEXT_PUBLIC_SUPABASE_SAUCE_URL}sauce_templates/images/Standard.png`,
  },
  {
    name: 'Premium',
    description:
      "Same stuff different packaging. It's amazing how a marketing department can transform product value in the eyes of the consheepmers. Truly, an ode to the capitalist ideal.",
    image: `${process.env.NEXT_PUBLIC_SUPABASE_SAUCE_URL}sauce_templates/images/Premium.png`,
  },
  {
    name: 'Artisanal',
    description:
      'Perfected over generations in some exotic locale, these families have never heard of fair labor, let alone human rights, but boy, do they know fish sauce. Bringing together the highest of tastes for both your aesthetic appreciation and your taste buds. Harmony incarnate, umami in every drip.',
    image: `${process.env.NEXT_PUBLIC_SUPABASE_SAUCE_URL}sauce_templates/images/Artisanal.png`,
  },
];

function determineFishSauce(
  fishIDs: string[],
  saucingFee: number,
  mintPrice: number,
  complexity: number,
  umami: number,
  bottleId: string
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
        value: fishIDs,
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
        value: fishSauceGrade ? (mintPrice * 1.2).toFixed(2) : 0,
      },
      {
        trait_type: 'bought_for',
        value: mintPrice,
      },
      {
        trait_type: 'minted_for',
        value: saucingFee,
      },
    ],
  };
}

// async function generateSauceMetadataUrlJob(
//   saucingFee: number,
//   mintPrice: number,
//   fishIDs: string[],
//   fishContent: string[],
//   bottleId: string
// ) {

async function generateSauceMetadataUrlJob(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { saucingFee, mintPrice, fishIDs, fishContent, bottleId, fishDeets } = req.body;
  try {
    console.log('Background job started', fishContent);
    const metas = await getFishSauceMetaData(fishContent);
    let uniqueFamilies: string[] = [];
    let uniqueSpecies: string[] = [];
    let totalFertility = 0;
    let totalWeightedAverageUmami = 0;
    let totalRadiation = 0;
    let totalSize = metas.reduce(
      (acc, curr) =>
        acc +
        (curr?.attributes?.find((each: any) => each.trait_type === 'size')
          ?.value || 0),
      0
    );
    for (const meta of metas) {
      totalWeightedAverageUmami +=
        (meta.attributes.find((attr: any) => attr.trait_type === 'size').value /
          totalSize) *
        meta.attributes.find((attr: any) => attr.trait_type === 'umami').value;
      totalFertility += meta.attributes.find(
        (attr: any) => attr.trait_type === 'fertility'
      ).value;
      totalRadiation += meta.attributes.find(
        (attr: any) => attr.trait_type === 'radiation'
      ).value;
      const family = meta.attributes.find(
        (attr: any) => attr.trait_type === 'family'
      ).value;
      if (!uniqueFamilies.includes(family)) uniqueFamilies.push(family);
      const species = meta.attributes.find(
        (attr: any) => attr.trait_type === 'species'
      ).value;
      if (!uniqueSpecies.includes(species)) uniqueSpecies.push(species);
    }

    const avgFertility = totalFertility / fishContent.length;
    const avgRadiation = totalRadiation / fishContent.length;
    const m2 =
      UNIQUENESS_MAP[uniqueFamilies.length - 1][uniqueSpecies.length - 1];
    const m1 = (50 - avgFertility + avgRadiation) / 200;
    const complexity = totalWeightedAverageUmami * (1 - m1) * (1 + m2);
    const sauceAwarded = determineFishSauce(
      fishIDs,
      saucingFee,
      mintPrice,
      complexity,
      totalWeightedAverageUmami,
      bottleId
    );

    // console.log("the bottle id is " +bottleId+ " ");
    const metadataFileLocation = `${
      process.env.NEXT_PUBLIC_SUPABASE_SAUCE_URL
    }redemptions/${bottleId}.json?t=${new Date()}`;

    const res = await fetch(metadataFileLocation);
    const djson = await res.json();

    if (djson.statusCode === '404') {
      const filePath = `redemptions/${bottleId}.json`;
      const { data: supData, error } = await supabase.storage
        .from('sauce')
        .upload(filePath, JSON.stringify(sauceAwarded), {
          cacheControl: '3600',
          upsert: false,
        });

      if (supData?.path === filePath) {
        const buyBackPrice =
          sauceAwarded.name === 'Gunk' ? 0 : (mintPrice * 1.2).toFixed(2);

          // console.log("fishDeets[0].owner_address", fishDeets)
        const { data: createSauce, error: createSauceError } = await supabase
          .from('sauces')
          .insert({
            id: bottleId,
            serial_number: generateRandomString(2) + '-01',
            buyback_price: buyBackPrice,
            metadata_url: metadataFileLocation,
            owner_address: fishDeets[0].owner_address,
            grade: sauceAwarded.name.toUpperCase(),
          });

        if (createSauceError) {
          throw new Error(`Error creating sauce: ${createSauceError.message}`);
        }

        const { data: sauceRegistryWrite, error: sauceRegistryWriteError } =
          await supabase.from('sauce_registry').insert(
            fishIDs.map((id: string) => ({
              id,
              sauce_id: bottleId,
              serial_number: generateRandomString(2) + '-01'
            }))
          );

        if (sauceRegistryWriteError) {
          throw new Error(
            `Error writing to sauce registry: ${sauceRegistryWriteError.message}`
          );
        }

        const { error: updateFishStateError } = await supabase
          .from('fish')
          .update({ state: 'sauced' })
          .in('id', fishIDs);

        if (updateFishStateError) {
          throw new Error(
            `Error updating fish state: ${updateFishStateError.message}`
          );
        }

        const { data: userBalanceData, error: userBalanceError } =
          await supabase
            .from('users')
            .select('balance')
            .eq('wallet_address', fishDeets[0].owner_address)
            .limit(1)
            .single();

        if (userBalanceError) {
          throw new Error(
            `Error fetching user balance: ${userBalanceError.message}`
          );
        }

        if (userBalanceData) {
          const { error: updateBalanceError } = await supabase
            .from('users')
            .update({ balance: userBalanceData.balance - saucingFee })
            .eq('wallet_address', fishDeets[0].owner_address);

          if (updateBalanceError) {
            throw new Error(
              `Error updating user balance: ${updateBalanceError.message}`
            );
          }
        } else {
          throw new Error(`User balance not found`);
        }

        return {
          metadataFileLocation,
          sauceAwarded,
        };
      } else {
        throw new Error(`Failed to upload metadata file: ${error?.message}`);
      }
    }

    return { metadataFileLocation, sauceAwarded };
  } catch (error) {
    console.error(
      //@ts-ignore
      `Failed to generate sauce metadata URL job: ${error.message}`
    );
    throw error;
  }
}

export default generateSauceMetadataUrlJob;
