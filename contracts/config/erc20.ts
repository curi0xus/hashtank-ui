import ERC20Interface from '../abi/ERC20.json';
import { hashTankChain } from '@/wagmi';

const erc20ContractConfig: any = {
  address:
    // @ts-ignore
    hashTankChain.id == 260
      ? '0x111C3E89Ce80e62EE88318C2804920D4c96f92bb'
      : '0x2C816FD7953D135C1Cc7Bc0Ce73240F76db8332B',
  abi: ERC20Interface,
};

export default erc20ContractConfig;
