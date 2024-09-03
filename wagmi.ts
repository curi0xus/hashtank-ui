// import { Chain, configureChains, createConfig, WagmiConfig } from 'wagmi';
import { zkSync, zkSyncSepoliaTestnet } from 'wagmi/chains';
import { http } from 'wagmi';
// import { publicProvider } from 'wagmi/providers/public';
// import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';
import { createConfig } from '@privy-io/wagmi';
// import { walletConnectProvider, defaultWagmiConfig } from '@web3modal/wagmi';

// import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
// import { InjectedConnector } from 'wagmi/connectors/injected';
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { type Chain } from 'viem';

const projectId = '1834da368c9369eeef6c2a98be647446';

export const zksyncEraLocal = {
  custom: zkSyncSepoliaTestnet.custom,
  serializers: zkSyncSepoliaTestnet.serializers,
  id: 260,
  name: 'Zksync Era Local',
  // network: 'ZKsync Era',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['http://localhost:8011'] },
    default: { http: ['http://localhost:8011'] },
  },
  blockExplorers: {
    default: { name: 'zkExplorer', url: 'http://localhost:3010' },
    etherscan: { name: 'zkExplorer', url: 'http://localhost:3010' },
  },
  contracts: {
    // ensRegistry: {
    //   address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    // },
    // ensUniversalResolver: {
    //   address: '0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da',
    //   blockCreated: 16773775,
    // },
    // multicall3: {
    //   address: '0xca11bde05977b3631167028862be2a173976ca11',
    //   blockCreated: 14353601,
    // },
  },
  testnet: true,
} as const satisfies Chain;

export const hashTankChain =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? zkSync
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'staging'
    ? zkSyncSepoliaTestnet
    : zksyncEraLocal;

// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [hashTankChain],
//   [
//     ...(process.env.NODE_ENV === 'development'
//       ? [
//           jsonRpcProvider({
//             rpc: (chain) => ({
//               http: `http://localhost:8011`,
//             }),
//           }),
//         ]
//       : []),
//     publicProvider(),
//     walletConnectProvider({ projectId }),
//   ]
// );

// export const config = createConfig({
//   // autoConnect: true,
//   // publicClient,
//   // webSocketPublicClient,
//   // connectors: [
//   //   new WalletConnectConnector({
//   //     chains,
//   //     options: { projectId, showQrModal: false },
//   //   }),
//   //   new InjectedConnector({ chains, options: { shimDisconnect: true } }),
//   //   new CoinbaseWalletConnector({ options: { appName: 'Web3Modal' } }),
//   // ],
//   connectors: [
//     injected(),
//     walletConnect({ projectId, showQrModal: false }),
//     metaMask(),
//     safe(),
//   ],
//   transports: {
//     [zkSync.id]: http(),
//     [zkSyncSepoliaTestnet.id]: http(),
//     [zksyncEraLocal.id]: http(),
//   },
// });

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

// export const config = defaultWagmiConfig(
export const config = createConfig({
  chains: [zkSync, zkSyncSepoliaTestnet, zksyncEraLocal],
  // projectId, // required
  // metadata, // required
  // enableWalletConnect: true, // Optional - true by default
  // enableInjected: true, // Optional - true by default
  // enableEIP6963: true, // Optional - true by default
  // enableCoinbase: false, // Optional - true by default,
  connectors: [
    injected(),
    walletConnect({ projectId, showQrModal: false }),
    metaMask(),
    safe(),
  ],
  transports: {
    [zkSync.id]: http(),
    [zkSyncSepoliaTestnet.id]: http(),
    [zksyncEraLocal.id]: http(),
  },
});

// 3. Create modal
// createWeb3Modal({
//   wagmiConfig: config,
//   projectId,
//   enableAnalytics: true, // Optional - defaults to your Cloud configuration
// });

// 3. Create modal
// createWeb3Modal({ wagmiConfig: config, projectId, chains });

// export { publicClient };
