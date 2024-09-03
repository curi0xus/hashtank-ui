import { useEffect, useState } from 'react';
import { Contract, utils } from 'zksync-ethers';
import erc20ContractConfig from '@/contracts/config/erc20';
import hashTankNFT from '@/contracts/config/hashTankNFT';
import * as ethers from 'ethers';
import { useEstimateFeesPerGas } from 'wagmi';
import { PAYMASTER_CONTRACT_ADDRESS } from '@/contracts/config/paymaster';
import { walletClientToSigner } from '../useWagmiSigner';
import { createWalletClient, custom } from 'viem';
import { hashTankChain } from '@/wagmi';
import { useWallets } from '@privy-io/react-auth';

const useSubmitSauceRequest = (fishIds: string[], totalSize: number) => {
  const [hashtankContractInstance, setHashtankContractInstance] = useState<
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
        const hashTankNFTContract = new Contract(
          hashTankNFT.address,
          hashTankNFT.abi,
          signer
        );
        setHashtankContractInstance(hashTankNFTContract);
      } catch (e: any) {
        console.log('error', e);
      }
    }
    if (!hashtankContractInstance && wallets.length > 0) init();
  }, [hashtankContractInstance, wallets]);

  async function initSauceRequest() {
    try {
      await estimateSubmitSauceRequest();
    } catch (e) {
      console.log('ERROR', e);
    }
  }

  useEffect(() => {
    if (hashtankContractInstance && fishIds.length && totalSize >= 100)
      initSauceRequest();
  }, [hashtankContractInstance]);

  async function estimateSubmitSauceRequest() {
    const paymasterParams = await utils.getPaymasterParams(
      PAYMASTER_CONTRACT_ADDRESS,
      {
        type: 'ApprovalBased',
        token: erc20ContractConfig.address,
        minimalAllowance: ethers.BigNumber.from(1),
        innerInput: new Uint8Array(),
      }
    );
    if (
      hashtankContractInstance &&
      fishIds.length > 0 &&
      fishIds.length <= 5 &&
      totalSize >= 100
    ) {
      const gasLimit =
        await hashtankContractInstance.estimateGas.submitSauceRequest(
          fishIds,
          ethers.BigNumber.from(totalSize),
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

  async function submitSauceRequest(fishIds: string[], totalSize: number) {
    const transactionOpts = await estimateSubmitSauceRequest();
    if (hashtankContractInstance && transactionOpts) {
      await (
        await hashtankContractInstance.submitSauceRequest(
          fishIds,
          ethers.BigNumber.from(totalSize),
          transactionOpts
        )
      ).wait();
    }
  }

  return {
    hashtankContractInstance,
    estimateSubmitSauceRequest,
    submitSauceRequest,
    transactionOptsState,
  };
};

export default useSubmitSauceRequest;
