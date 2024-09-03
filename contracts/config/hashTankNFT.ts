import HashTankNFTInterface from '../abi/HashTankNFT.json';
import { hashTankChain } from '@/wagmi';

const auctionContractConfig: any = {
  address:
    // @ts-ignore
    hashTankChain.id == 260
      ? '0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021'
      : '0xf656a83eCBC6B0208843B4676c162ceD5E1a3ad7',
  abi: HashTankNFTInterface,
};

export default auctionContractConfig;
