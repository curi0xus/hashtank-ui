import SauceNFTInterface from '../abi/SauceNFT.json';
import { hashTankChain } from '@/wagmi';

const sauceContractConfig: any = {
  address:
    // @ts-ignore
    hashTankChain.id == 260
      ? '0x26b368C3Ed16313eBd6660b72d8e4439a697Cb0B'
      : '0x27EeeFdaAA15A98528d6dF61C121554cEa6a8c3D',
  abi: SauceNFTInterface,
};

export default sauceContractConfig;
