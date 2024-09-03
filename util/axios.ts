import axios from 'axios';
import { getAccessToken } from '@privy-io/react-auth';

const axiosInstance = (authToken: string) => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: { Authorization: `Bearer ${authToken}` },
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response, config } = error;

      if (response.status !== 401) {
        return Promise.reject(error);
      }

      return getAccessToken()
        .then((accessToken: string | null) => {
          if (accessToken) {
            error.response.config.headers['Authorization'] =
              'Bearer ' + accessToken;
            return axios(error.response.config);
          } else {
            Promise.reject(error);
          }
        })
        .catch(() => Promise.reject(error));
    }
  );

  return instance;
};

export default axiosInstance;
