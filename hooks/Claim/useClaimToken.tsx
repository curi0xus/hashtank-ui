import { useEffect, useState } from 'react';
import { Contract, utils } from 'zksync-ethers';
import erc20ContractConfig from '@/contracts/config/erc20';
import * as ethers from 'ethers';
import { useEstimateFeesPerGas } from 'wagmi';
import { walletClientToSigner } from '../useWagmiSigner';
import { createWalletClient, custom } from 'viem';
import { hashTankChain } from '@/wagmi';
import { FREE_PAYMASTER_CONTRACT_ADDRESS } from '@/contracts/config/freePayMaster';
import { useWallets } from '@privy-io/react-auth';

const useClaimToken = () => {
  const [erc20ContractInstance, setErc20Contract] = useState<
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
        const erc20Contract = new Contract(
          erc20ContractConfig.address,
          erc20ContractConfig.abi,
          signer
        );
        setErc20Contract(erc20Contract);
      } catch (e: any) {
        console.log('error', e);
      }
    }
    if (!erc20ContractInstance && wallets.length > 0) init();
  }, [erc20ContractInstance, wallets]);

  async function initEstClaim() {
    try {
      await estimateClaim();
    } catch (e) {
      console.log('ERROR', e);
    }
  }

  useEffect(() => {
    if (erc20ContractInstance) initEstClaim();
  }, [erc20ContractInstance]);

  async function estimateClaim() {
    const paymasterParams = utils.getPaymasterParams(
      FREE_PAYMASTER_CONTRACT_ADDRESS,
      {
        type: 'General',
        innerInput: new Uint8Array(),
      }
    );

    if (erc20ContractInstance) {
      const gasLimit = await erc20ContractInstance.estimateGas.claim({
        customData: {
          gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
          paymasterParams: paymasterParams,
        },
      });

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

  async function claim() {
    const transactionOpts = await estimateClaim();
    if (erc20ContractInstance && transactionOpts) {
      await (await erc20ContractInstance.claim(transactionOpts)).wait();
    }
  }

  return {
    erc20ContractInstance,
    estimateClaim,
    claim,
    transactionOptsState,
  };
};

export default useClaimToken;
