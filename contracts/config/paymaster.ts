import { hashTankChain } from '@/wagmi';

const PAYMASTER_CONTRACT_ADDRESS =
  // @ts-ignore
  hashTankChain.id == 260
    ? '0x094499Df5ee555fFc33aF07862e43c90E6FEe501'
    : '0x879C46688a9c2A11496f4D9e2c62e950a37df3B5';

export { PAYMASTER_CONTRACT_ADDRESS };
