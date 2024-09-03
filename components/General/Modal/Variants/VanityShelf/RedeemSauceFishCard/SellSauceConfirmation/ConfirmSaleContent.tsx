import ModalTemplate from '@/components/General/Modal/CardModal/CustomContent';
import { CustomContent } from './ApproveSaleContent';
import { formatEther } from 'viem';

const ConfirmSaleContent = ({
  closeModalsList,
  resaleValueInGweiBigInt,
  sauceId,
  transactionOptsState,
  ...rest
}: any) => {
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
    ? resaleValueInGweiBigInt + totalGasFeeBigInt
    : undefined;
  const totalInEtherString = totalInBigInt
    ? formatEther(totalInBigInt)
    : undefined;
  const resaleValueInWholeTetras = formatEther(resaleValueInGweiBigInt);
  return (
    <ModalTemplate
      // imgSrc={img}
      CustomContent={(props: any) => (
        <CustomContent
          sauceId={sauceId}
          resaleValueInWholeTetras={resaleValueInWholeTetras}
          totalGasFeeInEtherString={totalGasFeeInEtherString}
          totalInEtherString={totalInEtherString}
          instruction={`*${resaleValueInWholeTetras} SHELL will be deposited to your wallet on confirmation.`}
          type='confirm'
          {...props}
        />
      )}
    />
  );
};

export default ConfirmSaleContent;
