import { useEffect, useState } from 'react';
import { Contract, utils } from 'zksync-ethers';
import erc20ContractConfig from '@/contracts/config/erc20';
import hashTankNFT from '@/contracts/config/hashTankNFT';
import * as ethers from 'ethers';
import { useEstimateFeesPerGas } from 'wagmi';
import { PAYMASTER_CONTRACT_ADDRESS } from '@/contracts/config/paymaster';
import { walletClientToSigner } from '../useWagmiSigner';
import { parseEther } from 'viem';
import { createWalletClient, custom } from 'viem';
import { hashTankChain } from '@/wagmi';
import { useWallets } from '@privy-io/react-auth';

const useHashTankNft = (
  bidAmount?: string,
  batchId?: bigint,
  batchFishIndex?: number
) => {
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

  async function initEstBid() {
    try {
      await estimateBid();
    } catch (e) {
      console.log('ERROR', e);
    }
  }

  useEffect(() => {
    if (hashtankContractInstance && bidAmount) initEstBid();
  }, [hashtankContractInstance]);

  async function estimateBid() {
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
      batchId &&
      batchFishIndex !== undefined &&
      batchFishIndex >= 0 &&
      bidAmount
    ) {
      const bidAmountInGweiString: string = parseEther(bidAmount).toString();
      const bidAmountInGweiBigInt: bigint = BigInt(bidAmountInGweiString);
      const gasLimit = await hashtankContractInstance.estimateGas.bid(
        ethers.BigNumber.from(batchId),
        batchFishIndex,
        bidAmountInGweiBigInt,
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
      console.log('BIDDER TXN OPTS', transactionOpts);
      setTransactionOpts(transactionOpts);
      return transactionOpts;
    }
  }

  async function bid(
    batchId: bigint,
    batchFishIndex: number,
    bidAmount: bigint
  ) {
    const transactionOpts = await estimateBid();
    if (hashtankContractInstance && transactionOpts) {
      await (
        await hashtankContractInstance.bid(
          ethers.BigNumber.from(batchId),
          batchFishIndex,
          ethers.BigNumber.from(bidAmount),
          transactionOpts
        )
      ).wait();
    }
  }

  return {
    hashtankContractInstance,
    estimateBid,
    bid,
    transactionOptsState,
  };
};

export default useHashTankNft;
