import { useMutation } from '@tanstack/react-query';
import { getAccessToken } from '@privy-io/react-auth';
import axiosInstance from '@/util/axios';

const usePostClaims = () => {
  const { mutateAsync, error, isSuccess } = useMutation({
    mutationFn: async (params: any) => {
      const accessToken = await getAccessToken();
      const instance = axiosInstance(accessToken!);
      const inviteCode = window.localStorage.getItem('invite_code');
      const response = await instance.post(`/api/claims`, {
        address: params.address,
        inviteCode,
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

export default usePostClaims;
