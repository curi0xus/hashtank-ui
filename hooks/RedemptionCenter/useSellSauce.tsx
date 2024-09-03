import { useEffect, useState } from 'react';
import { Contract, utils } from 'zksync-ethers';
import erc20ContractConfig from '@/contracts/config/erc20';
import * as ethers from 'ethers';
import { useEstimateFeesPerGas } from 'wagmi';
import { PAYMASTER_CONTRACT_ADDRESS } from '@/contracts/config/paymaster';
import { walletClientToSigner } from '../useWagmiSigner';
import sauceNFT from '@/contracts/config/sauceNFT';
import { createWalletClient, custom } from 'viem';
import { hashTankChain } from '@/wagmi';
import { useWallets } from '@privy-io/react-auth';

const useSellSauce = (nftId: number) => {
  const [sauceNFTContractInstance, setSauceNFTContractInstance] = useState<
    undefined | Contract
  >(undefined);
  const { data } = useEstimateFeesPerGas();
  const [transactionOptsState, setTransactionOpts] = useState<undefined | any>(
    undefined
  );
  const { wallets } = useWallets();

  useEffect(() => {
    async function init() {
      try {
        const embeddedWallet = wallets.find(
          (wallet) => wallet.walletClientType === 'privy'
        );
        const wallet = embeddedWallet || wallets[0];
        const provider = await wallet.getEthereumProvider();
        const client = createWalletClient({
          chain: hashTankChain,
          transport: custom(provider),
        });
        const signer = walletClientToSigner(client);
        const sauceNFTContract = new Contract(
          sauceNFT.address,
          sauceNFT.abi,
          signer
        );
        setSauceNFTContractInstance(sauceNFTContract);
      } catch (e: any) {
        console.log('error', e);
      }
    }
    if (!sauceNFTContractInstance && wallets.length > 0) init();
  }, [sauceNFTContractInstance, wallets]);

  async function initEstimateSell() {
    try {
      await estimateSell();
    } catch (e) {
      console.log('ERROR', e);
    }
  }

  useEffect(() => {
    if (sauceNFTContractInstance && nftId) initEstimateSell();
  }, [sauceNFTContractInstance]);

  async function estimateSell() {
    const paymasterParams = await utils.getPaymasterParams(
      PAYMASTER_CONTRACT_ADDRESS,
      {
        type: 'ApprovalBased',
        token: erc20ContractConfig.address,
        minimalAllowance: ethers.BigNumber.from(1),
        innerInput: new Uint8Array(),
      }
    );
    if (sauceNFTContractInstance && nftId) {
      const gasLimit = await sauceNFTContractInstance.estimateGas.sauceBuyBack(
        BigInt(nftId),
        {
          customData: {
            gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
            paymasterParams: paymasterParams,
          },
        }
      );

      const transactionOpts = {
        maxFeePerGas: data?.gasPrice || BigInt(10000000000),
        maxPriorityFeePerGas: ethers.BigNumber.from(0),
        gasLimit,
        customData: {
          gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
          paymasterParams,
        },
      };
      setTransactionOpts(transactionOpts);
      return transactionOpts;
    }
  }

  async function sell(nftId: number) {
    const transactionOpts = await estimateSell();
    if (sauceNFTContractInstance && transactionOpts) {
      await (
        await sauceNFTContractInstance.sauceBuyBack(
          BigInt(nftId),
          transactionOpts
        )
      ).wait();
    }
  }

  return {
    sauceNFTContractInstance,
    estimateSell,
    sell,
    transactionOptsState,
  };
};

export default useSellSauce;
