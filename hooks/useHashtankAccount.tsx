import { usePrivy } from '@privy-io/react-auth';

const useHashTankAccount = () => {
  const { login, ready, authenticated, user, logout, linkWallet } = usePrivy();
  const address = user?.wallet?.address;
  const isConnected = ready && authenticated && user;
  return {
    address: (address || '0x') as `0x${string}`,
    isConnected,
  };
};

export default useHashTankAccount;
