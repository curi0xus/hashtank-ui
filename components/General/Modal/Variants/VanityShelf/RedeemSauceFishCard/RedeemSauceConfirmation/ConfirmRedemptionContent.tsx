import ModalTemplate from '@/components/General/Modal/CardModal/CustomContent';
import { CustomContent } from './ApproveRedemptionContent';
import { formatEther } from 'viem';
import useRedeemSauce from '@/hooks/RedemptionCenter/useRedeemSauce';

const ConfirmRedemptionContent = ({
  closeModalsList,
  redemptionFeeAmountInGweiBigInt,
  sauceId,
  ...rest
}: any) => {
  const { transactionOptsState } = useRedeemSauce(sauceId);
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
    ? redemptionFeeAmountInGweiBigInt + totalGasFeeBigInt
    : undefined;
  const totalInEtherString = totalInBigInt
    ? formatEther(totalInBigInt)
    : undefined;
  const redemptionFeeInWholeTetras = formatEther(
    redemptionFeeAmountInGweiBigInt
  );
  return (
    <ModalTemplate
      // imgSrc={img}
      CustomContent={(props: any) => (
        <CustomContent
          sauceId={sauceId}
          redemptionFeeInWholeTetras={redemptionFeeInWholeTetras}
          totalGasFeeInEtherString={totalGasFeeInEtherString}
          totalInEtherString={totalInEtherString}
          instruction={`*${redemptionFeeInWholeTetras} SHELL will be charged to redeem sauce. This process cannot be reversed.`}
          type='confirm'
          {...props}
        />
      )}
    />
  );
};

export default ConfirmRedemptionContent;
