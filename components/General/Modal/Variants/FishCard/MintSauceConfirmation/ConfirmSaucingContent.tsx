import ModalTemplate from '@/components/General/Modal/CardModal/CustomContent';
import { CustomContent } from './ApproveSaucingContent';
import { formatEther } from 'viem';
import useSubmitSauceRequest from '@/hooks/SauceFactory/useSubmitSauceRequest';

const ConfirmSaucingContent = ({
  closeModalsList,
  saucingFeeInGweiBigInt,
  totalSize,
  selectedFishIds,
  ...rest
}: any) => {
  const { transactionOptsState } = useSubmitSauceRequest(
    selectedFishIds,
    totalSize
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
    ? saucingFeeInGweiBigInt + totalGasFeeBigInt
    : undefined;
  const totalInEtherString = totalInBigInt
    ? formatEther(totalInBigInt)
    : undefined;
  const saucingFeeInWholeTetras = formatEther(saucingFeeInGweiBigInt);
  return (
    <ModalTemplate
      // imgSrc={img}
      CustomContent={(props: any) => (
        <CustomContent
          totalSize={totalSize}
          selectedFishIds={selectedFishIds}
          saucingFeeInWholeTetras={saucingFeeInWholeTetras}
          totalGasFeeInEtherString={totalGasFeeInEtherString}
          totalInEtherString={totalInEtherString}
          instruction={`*${saucingFeeInWholeTetras} SHELL will taken from your wallet. This process cannot be reverse.`}
          type='confirm'
          {...props}
        />
      )}
    />
  );
};

export default ConfirmSaucingContent;
