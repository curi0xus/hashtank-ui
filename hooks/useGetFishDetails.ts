import { useState, useEffect } from 'react';

const useGetFishDetails = (fishId: string) => {
  const [fishDetails, setFishDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFishDetails = async () => {
      try {
        const response = await fetch(`/api/fish?fish_id=${fishId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFishDetails(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFishDetails();
  }, [fishId]);

  return { fishDetails, loading, error };
};

export default useGetFishDetails;