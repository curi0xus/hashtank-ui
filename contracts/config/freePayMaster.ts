import { hashTankChain } from '@/wagmi';

const FREE_PAYMASTER_CONTRACT_ADDRESS =
  // @ts-ignore
  hashTankChain.id == 260
    ? '0xb76eD02Dea1ba444609602BE5D587c4bFfd67153'
    : '0xd9Dc947DAaFC23f4eb7CbD31d288e20EEa8FBd1e';

export { FREE_PAYMASTER_CONTRACT_ADDRESS };
