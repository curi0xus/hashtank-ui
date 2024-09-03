import { Web3Provider } from 'zksync-ethers';

export function walletClientToSigner(walletClient: any) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };

  // @ts-ignore
  const provider = new Web3Provider(transport, network);
  const signer = provider.getSigner(account?.address);
  return signer;
}
