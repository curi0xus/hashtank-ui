import ModalTemplate from '@/components/General/Modal/CardModal/CustomContent';
import { CustomContent } from './ApproveLoveSauceBatchContent';
import { formatEther } from 'viem';
import useSendToLoveSauceProgram from '@/hooks/LoveSauceProgram/useSendToLoveSauceProgram';

const ConfirmLoveSauceBatchContent = ({
  closeModalsList,
  loveSauceProgramFeeAmountInGweiBigInt,
  totalSize,
  selectedBroodFishIds,
  currentLoveSauceProgramId,
  ...rest
}: any) => {
  const { transactionOptsState } = useSendToLoveSauceProgram(
    selectedBroodFishIds,
    currentLoveSauceProgramId
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
    ? loveSauceProgramFeeAmountInGweiBigInt + totalGasFeeBigInt
    : undefined;
  const totalInEtherString = totalInBigInt
    ? formatEther(totalInBigInt)
    : undefined;
  const loveSauceProgramFeeInWholeTetras = loveSauceProgramFeeAmountInGweiBigInt
    ? formatEther(loveSauceProgramFeeAmountInGweiBigInt)
    : '0';
  return (
    <ModalTemplate
      // imgSrc={img}
      CustomContent={(props: any) => (
        <CustomContent
          totalSize={totalSize}
          selectedBroodFishIds={selectedBroodFishIds}
          programFeeInWholeTetras={loveSauceProgramFeeInWholeTetras}
          totalGasFeeInEtherString={totalGasFeeInEtherString}
          totalInEtherString={totalInEtherString}
          instruction={`*${loveSauceProgramFeeInWholeTetras} TETRA will be charged regardless of program success.`}
          type='confirm'
          {...props}
        />
      )}
    />
  );
};

export default ConfirmLoveSauceBatchContent;
