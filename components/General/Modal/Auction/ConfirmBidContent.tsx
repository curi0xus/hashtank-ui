import ModalTemplate from '@/components/General/Modal/CardModal/CustomContent';
import { CustomContent } from './ApproveBidContent';
import useHashTankNft from '@/hooks/LoveSauceProgram/useHashTankNFT';
import { formatEther, parseEther } from 'viem';

const ConfirmBidContent = ({
  closeModalsList,
  batchNumber,
  fishTypeId,
  fishName,
  batchId,
  batchFishIndex,
  bidAmount,
  batchPrefix,
  batchName,
  img,
  ...rest
}: any) => {
  const { transactionOptsState } = useHashTankNft(
    bidAmount,
    batchId,
    batchFishIndex
  );

  const gasPriceInGweiString = transactionOptsState?.maxFeePerGas?.toString();
  const gasLimitInGweiString = transactionOptsState?.gasLimit?.toString();
  const totalGasFeeBigInt =
    gasPriceInGweiString && gasPriceInGweiString
      ? BigInt(gasPriceInGweiString) * BigInt(gasLimitInGweiString)
      : undefined;

  const totalGasFeeInEtherString = totalGasFeeBigInt
    ? formatEther(totalGasFeeBigInt)
    : undefined;

  const totalInBigInt = totalGasFeeBigInt
    ? parseEther(bidAmount) + totalGasFeeBigInt
    : undefined;
  const totalInEtherString = totalInBigInt
    ? formatEther(totalInBigInt)
    : undefined;
  return (
    <ModalTemplate
      imgSrc={img}
      CustomContent={(props: any) => (
        <CustomContent
          bidAmount={bidAmount}
          totalGasFeeInEtherString={totalGasFeeInEtherString}
          totalInEtherString={totalInEtherString}
          instruction={`*${bidAmount} SHELL will be refunded to your wallet if bid fails.`}
          type='confirm'
          batchFishIndex={batchFishIndex}
          batchNumber={batchNumber}
          batchPrefix={batchPrefix}
          batchName={batchName}
          {...props}
          fishName={fishName}
        />
      )}
    />
  );
};

export default ConfirmBidContent;
