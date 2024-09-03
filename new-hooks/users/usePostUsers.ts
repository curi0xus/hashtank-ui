import { useMutation } from '@tanstack/react-query';
import { getAccessToken } from '@privy-io/react-auth';
import axiosInstance from '@/util/axios';

const usePostUser = () => {
  const { mutateAsync, error, isSuccess } = useMutation({
    mutationFn: async (params: any) => {
      const accessToken = await getAccessToken();
      const instance = axiosInstance(accessToken!);
      const response = await instance.post(`/api/users`, {
        address: params.address,
      });
      return response.data;
    },
  });

  return {
    isSuccess,
    mutateAsync,
    error,
  };
};

export default usePostUser;
