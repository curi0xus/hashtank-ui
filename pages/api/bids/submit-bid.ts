import type { NextApiRequest, NextApiResponse } from 'next';
import { createSupabaseClient } from '@/util/supabase/server';

const supabase = createSupabaseClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { address, bidAmount, fishId, auctionId } = req.body;

      // Validate request body
      if (!address || !bidAmount || !fishId) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const { data: userBalance, error: userBalanceError } = await supabase
        .from('users')
        .select('balance')
        .eq('wallet_address', address)
        .limit(1)
        .single();
      if (userBalanceError) {
        return res.status(500).json({
          error: `Error getting user balance from bids: ${userBalanceError.message}`,
        });
      }
      if (userBalance?.balance && userBalance.balance > bidAmount) {
        // Fetch the latest auction
        const { data: latestAuction, error: latestAuctionError } =
          await supabase
            .from('auctions')
            .select('*')
            .eq('id', auctionId)
            .limit(1)
            .single();

        if (latestAuctionError) {
          return res.status(500).json({
            error: `Error fetching latest auction: ${latestAuctionError.message}`,
          });
        }
        if (latestAuction.status === 'closed') {
          return res.status(400).json({
            error: `Unable to bid on closed auction`,
          });
        }

        const { data: myBid, error: myBidError } = await supabase
          .from('bids')
          .select('*')
          .eq('user_id', address)
          .eq('fish_id', fishId)
          .eq('auction_id', latestAuction.id)
          .limit(1);

        if (myBid?.length) {
          return res
            .status(400)
            .json({ error: "You're only allowed to bid once." });
        }

        if (myBidError) {
          return res.status(500).json({
            error: `Error fetching user's bid: ${myBidError.message}`,
          });
        }
        const { data: highestBid, error: highestBidError } = await supabase
          .from('bids')
          .select('bid_amount')
          .eq('fish_id', fishId)
          .eq('auction_id', latestAuction.id)
          .order('bid_amount', { ascending: false })
          .limit(1);

        if (highestBidError) {
          return res.status(500).json({
            error: `Error fetching highest bid: ${highestBidError.message}`,
          });
        }

        if (!highestBid[0] || Number(bidAmount) > highestBid[0].bid_amount) {
          // Insert the new bid
          const { data: newBid, error: insertError } = await supabase
            .from('bids')
            .insert([
              {
                user_id: address, // Assuming 'address' is used as 'user_id' for demo
                auction_id: latestAuction.id,
                fish_id: fishId,
                bid_amount: bidAmount,
                created_at: new Date().toISOString(),
              },
            ])
            .select('*')
            .single();

          if (insertError) {
            return res
              .status(500)
              .json({ error: `Error inserting bid: ${insertError.message}` });
          }

          const { data: updateUserBalance, error: updateUserBalanceError } =
            await supabase
              .from('users')
              .update({ balance: userBalance.balance - bidAmount })
              .eq('wallet_address', address);

          if (updateUserBalanceError) {
            return res.status(500).json({
              error: `Error updating user balance: ${updateUserBalanceError.message}`,
            });
          }

          return res.status(200).json({ bid: newBid });
        } else {
          return res.status(400).json({ error: 'Please increase your bid' });
        }
      } else {
        return res.status(400).json({ error: 'Insufficient balance.' });
      }
    } catch (error) {
      console.error('Error processing request:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
};

export default handler;
