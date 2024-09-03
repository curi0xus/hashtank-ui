import { useState, useEffect } from 'react';

const useAuctionDetailsFetch = (auctionId: string) => {
  const [auctionDetails, setAuctionDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/auctions/auction-details', {
          method: 'POST',
          headers: {  
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ auction_id: auctionId }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch auction details');
        }

        const data = await response.json();
        setAuctionDetails(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAuctionDetails();
  }, [auctionId]);

  return { auctionDetails, loading, error };
};

export default useAuctionDetailsFetch;