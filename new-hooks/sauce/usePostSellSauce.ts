import { useMutation } from '@tanstack/react-query';
import { getAccessToken } from '@privy-io/react-auth';
import axiosInstance from '@/util/axios';

const usePostSellSauce = () => {
  const { mutateAsync, error, isSuccess } = useMutation({
    mutationFn: async (params: any) => {
      const accessToken = await getAccessToken();
      const instance = axiosInstance(accessToken!);
      return instance.post(`/api/sauce/sell`, {
        sauceId: params.sauceId,
        address: params.address,
      });
    },
  });

  return {
    isSuccess,
    mutateAsync,
  };
};

export default usePostSellSauce;
