import { useEffect, useState } from 'react';
import { Contract, utils } from 'zksync-ethers';
import auctionContractConfig from '@/contracts/config/hashTankNFT';
import * as ethers from 'ethers';
import { useEstimateFeesPerGas } from 'wagmi';
import { walletClientToSigner } from '../useWagmiSigner';
import { createWalletClient, custom } from 'viem';
import { hashTankChain } from '@/wagmi';
import { FREE_PAYMASTER_CONTRACT_ADDRESS } from '@/contracts/config/freePayMaster';
import { useWallets } from '@privy-io/react-auth';

const useWithdrawBids = () => {
  const [auctionContractInstance, setAuctionContract] = useState<
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
          auctionContractConfig.address,
          auctionContractConfig.abi,
          signer
        );
        setAuctionContract(erc20Contract);
      } catch (e: any) {
        console.log('error', e);
      }
    }
    if (!auctionContractInstance && wallets.length > 0) init();
  }, [auctionContractInstance, wallets]);

  async function initWithdraw() {
    try {
      await estimateWithdraw();
    } catch (e) {
      console.log('ERROR', e);
    }
  }

  useEffect(() => {
    if (auctionContractInstance) initWithdraw();
  }, [auctionContractInstance]);

  async function estimateWithdraw() {
    const paymasterParams = utils.getPaymasterParams(
      FREE_PAYMASTER_CONTRACT_ADDRESS,
      {
        type: 'General',
        innerInput: new Uint8Array(),
      }
    );

    if (auctionContractInstance) {
      const gasLimit =
        await auctionContractInstance.estimateGas.withdrawTotalBid({
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

  async function withdraw() {
    const transactionOpts = await estimateWithdraw();
    if (auctionContractInstance && transactionOpts) {
      await (
        await auctionContractInstance.withdrawTotalBid(transactionOpts)
      ).wait();
    }
  }

  return {
    auctionContractInstance,
    estimateWithdraw,
    withdraw,
    transactionOptsState,
  };
};

export default useWithdrawBids;
