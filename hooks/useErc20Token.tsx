import { useEffect, useState } from 'react';
import { Contract, utils } from 'zksync-ethers';
import erc20ContractConfig from '@/contracts/config/erc20';
import auctionContractConfig from '@/contracts/config/hashTankNFT';
import * as ethers from 'ethers';
import { useEstimateFeesPerGas, useAccount, useReadContract } from 'wagmi';
import { PAYMASTER_CONTRACT_ADDRESS } from '@/contracts/config/paymaster';
import { walletClientToSigner } from './useWagmiSigner';
import { formatEther } from 'viem';
import { createWalletClient, custom } from 'viem';
import { hashTankChain } from '@/wagmi';
import { usePrivy } from '@privy-io/react-auth';
import { useWallets } from '@privy-io/react-auth';

const useErc20Token = (approveAmount?: bigint) => {
  const [erc20ContractInstance, setErc20ContractInstance] = useState<
    undefined | Contract
  >(undefined);
  const { data } = useEstimateFeesPerGas();
  const [transactionOptsState, setTransactionOpts] = useState<undefined | any>(
    undefined
  );
  const { address } = useAccount();
  const { wallets } = useWallets();
  const [isLoading, setIsLoading] = useState(false);

  const { data: balance, refetch: refetchBalance } = useReadContract({
    ...erc20ContractConfig,
    functionName: 'balanceOf',
    args: [address],
  });

  useEffect(() => {
    async function init() {
      setIsLoading(true);
      try {
        const embeddedWallet = wallets.find(
          (wallet) => wallet.walletClientType === 'privy'
        );
        const wallet = embeddedWallet || wallets[0];
        const provider = await wallet.getEthereumProvider();
        const client = createWalletClient({
          // @ts-ignore
          account: address,
          chain: hashTankChain,
          transport: custom(provider),
        });

        const signer = walletClientToSigner(client);
        const erc20Contract = new Contract(
          erc20ContractConfig.address,
          erc20ContractConfig.abi,
          signer
        );
        setErc20ContractInstance(erc20Contract);
        setIsLoading(false);
      } catch (e: any) {
        console.log('error', e);
      }
    }
    if (!erc20ContractInstance && wallets.length > 0) init();
  }, [erc20ContractInstance, wallets]);

  async function startEstimate() {
    try {
      await estimateApprove(approveAmount as bigint);
    } catch (e) {
      console.log('ERROR', e);
    }
  }

  useEffect(() => {
    if (erc20ContractInstance && approveAmount && approveAmount > BigInt(0)) {
      startEstimate();
    }
  }, [erc20ContractInstance, wallets]);

  async function estimateApprove(amount: bigint) {
    const paymasterParams = await utils.getPaymasterParams(
      PAYMASTER_CONTRACT_ADDRESS,
      {
        type: 'ApprovalBased',
        token: erc20ContractConfig.address,
        minimalAllowance: ethers.BigNumber.from(1),
        innerInput: new Uint8Array(),
      }
    );

    if (erc20ContractInstance) {
      const gasLimit = await erc20ContractInstance.estimateGas.approve(
        auctionContractConfig.address,
        approveAmount,
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

  async function approve(spenderAddress: string, amount: bigint) {
    const transactionOpts = await estimateApprove(amount);
    if (erc20ContractInstance) {
      const res = await erc20ContractInstance.approve(
        spenderAddress,
        approveAmount,
        transactionOpts
      );

      const result = await res.wait();
      return result;
    }
  }

  const gasPriceInGweiString = transactionOptsState?.maxFeePerGas?.toString();
  const gasLimitInGweiString = transactionOptsState?.gasLimit?.toString();
  const totalGasFeeBigInt =
    gasPriceInGweiString && gasPriceInGweiString
      ? BigInt(gasPriceInGweiString) * BigInt(gasLimitInGweiString)
      : BigInt(0);

  const totalGasFeeInEtherString = totalGasFeeBigInt
    ? formatEther(totalGasFeeBigInt)
    : undefined;
  const totalInBigInt =
    (approveAmount || BigInt(0)) + (totalGasFeeBigInt || BigInt(0));
  const totalInEtherString = totalInBigInt ? formatEther(totalInBigInt) : '';
  const userShellBalanceBigInt = balance ? (balance as bigint) : BigInt(0);

  return {
    userShellBalanceBigInt,
    erc20ContractInstance,
    approve,
    estimateApprove,
    transactionOptsState,
    totalGasFeeInEtherString,
    totalInBigInt,
    totalInEtherString,
    totalGasFeeBigInt,
    refetchBalance,
    isLoading,
  };
};

export default useErc20Token;
