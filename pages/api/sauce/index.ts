import type { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from '@/util/supabase/server';
import getFishSauceMetaData from '@/lib/getFishSauceMetadata';
import { uuid } from 'uuidv4';
import { generateRandomString } from '../auctions/latest-auction';
import { enqueueBackgroundJob } from '@/util/qstash';

const SAUCING_FEE = 1;

const supabase = createSupabaseClient();

export const UNIQUENESS_MAP = [
  [-0.2, -0.15, -0.1, -0.05, 0],
  [0, -0.1, -0.05, 0, 0.05],
  [0, 0, 0, 0.05, 0.1],
  [0, 0, 0, 0.1, 0.15],
  [0, 0, 0, 0, 0.2],
];

async function generateSauceMetadataUrlJob(
  saucingFee: number,
  mintPrice: number,
  fishIDs: string[],
  fishContent: string[],
  bottleId: string,
  fishDeets: string[]
) {
  console.timeLog();
  try {
    await enqueueBackgroundJob(
      `${process.env.NEXT_PUBLIC_API_URL}/api/sauce/generate-sauce-metadata`,
      {
        saucingFee,
        mintPrice,
        fishIDs,
        fishContent,
        bottleId,
        fishDeets,
      }
    );
  } catch (error) {
    //@ts-ignore
    throw new Error(`Failed to enqueue QStash job: ${error.message}`);
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { fishIds } = req.body;
      console.log('CREATING SAUCE WITH...', fishIds);

      // Validate request body
      if (!fishIds || fishIds.length === 0 || fishIds.length > 5) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const { data: fishDeets, error: fishDeetsError } = await supabase
        .from('fish')
        .select('*')
        .in('id', fishIds);

      if (fishDeetsError) {
        return res.status(500).json({
          error: `Error fetching list of fish: ${fishDeetsError.message}`,
        });
      }
      const totalMintPrice = fishDeets.reduce(
        (acc: any, curr: any) => acc + curr.winning_bid,
        0
      );
      const bottleID = uuid();
      console.log('FISH DEETS', fishDeets);
      const fishContent = fishDeets.map((each: any) => each.metadata_url);
      console.log('FISH CONTENT', fishContent);

      // const { metadataFileLocation: metadataUrl, sauceAwarded } =
      //   await generateSauceMetadataUrl(
      //     SAUCING_FEE,
      //     totalMintPrice,
      //     fishIds,
      //     fishContent,
      //     bottleID
      //   );
      // console.log('SAUCE META DATA URL GENERATED...', metadataUrl);
      await generateSauceMetadataUrlJob(
        SAUCING_FEE,
        totalMintPrice,
        fishIds,
        fishContent,
        bottleID,
        fishDeets
      );

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error processing request:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    //     const buyBackPrice =
    //       sauceAwarded.name === 'Gunk' ? 0 : (totalMintPrice * 1.2).toFixed(2);

    //     if (metadataUrl) {
    //       const { data: createSauce, error: createSauceError } = await supabase
    //         .from('sauces')
    //         .insert({
    //           id: bottleID,
    //           serial_number: generateRandomString(2) + '-01',
    //           buyback_price: buyBackPrice,
    //           metadata_url: metadataUrl,
    //           owner_address: fishDeets[0].owner_address,
    //           grade: sauceAwarded.name.toUpperCase(),
    //         });
    //       console.log('SAUCE CREATED...', bottleID);

    //       if (createSauceError) {
    //         console.error(createSauceError.message);
    //         return res.status(500).json({
    //           error: `Error creating sauce: ${createSauceError.message}`,
    //         });
    //       }

    //       const { data: sauceRegistryWrite, error: sauceRegistryWriteError } =
    //         await supabase.from('sauce_registry').insert(
    //           fishDeets.map((each: any) => ({
    //             ...each,
    //             sauce_id: bottleID,
    //           }))
    //         );

    //       console.log('SAUCE REGISTRY CREATED...', sauceRegistryWrite);
    //       if (sauceRegistryWriteError) {
    //         console.log(sauceRegistryWriteError);
    //         return res.status(500).json({
    //           error: `Error writing to sauce registry: ${sauceRegistryWriteError.message}`,
    //         });
    //       }

    //       const { error: deleteFishError } = await supabase
    //         .from('fish')
    //         .update({ state: 'sauced' })
    //         .in('id', fishIds);

    //       if (deleteFishError) {
    //         console.log(deleteFishError);
    //         return res.status(500).json({
    //           error: `Error deleting fish: ${deleteFishError.message}`,
    //         });
    //       }

    //       const { data: userBalanceData } = await supabase
    //         .from('users')
    //         .select('balance')
    //         .eq('wallet_address', fishDeets[0].owner_address)
    //         .limit(1)
    //         .single();
    //       if (userBalanceData) {
    //         const { error: updateBalanceError } = await supabase
    //           .from('users')
    //           .update({ balance: userBalanceData.balance - SAUCING_FEE })
    //           .eq('wallet_address', fishDeets[0].owner_address);
    //         if (updateBalanceError) {
    //           console.log(updateBalanceError);
    //           return res.status(500).json({
    //             error: `Error updating user balance: ${updateBalanceError.message}`,
    //           });
    //         }
    //         return res.status(200).json({ success: true });
    //       } else {
    //         return res.status(500).json({
    //           error: `Error fetching user data`,
    //         });
    //       }
    //     } else {
    //       return res.status(500).json({
    //         error: `Failed to create metadata url`,
    //       });
    //     }
    //   } catch (error) {
    //     console.error('Error processing request:', error);
    //     return res.status(500).json({ error: 'Internal Server Error' });
    //   }
    // } else {
    //   res.setHeader('Allow', ['POST']);
    //   return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    // }
  }
};

export default handler;
