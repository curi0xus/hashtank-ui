import { useMutation } from '@tanstack/react-query';
import { getAccessToken } from '@privy-io/react-auth';
import axiosInstance from '@/util/axios';

const usePostSauce = () => {
  const { mutateAsync, error, isSuccess } = useMutation({
    mutationFn: async (params: any) => {
      const accessToken = await getAccessToken();
      const instance = axiosInstance(accessToken!);
      return instance.post(`/api/sauce`, {
        fishIds: params.fishIds,
      });
    },
  });

  return {
    isSuccess,
    mutateAsync,
  };
};

export default usePostSauce;
