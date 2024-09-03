import React, { useState } from 'react';
import { Box, Flex, Button, Text, VStack } from '@chakra-ui/react';
import useSendToLoveSauceProgram from '@/hooks/LoveSauceProgram/useSendToLoveSauceProgram';
import useLoveSauceProgram from '@/hooks/LoveSauceProgram/useLoveSauceProgram';
import useSelectedBroodFish from '@/hooks/LoveSauceProgram/useSelectedBroodFish';
import useErc20Token from '@/hooks/useErc20Token';
import auctionContractConfig from '@/contracts/config/hashTankNFT';
import useGetOwnersFish from '@/hooks/useGetOwnersFish';
import useGetFishInLoveSauceProgram from '@/hooks/LoveSauceProgram/useGetFishInLoveSauceProgram';
import { useReadContract, useWatchContractEvent } from 'wagmi';
import erc20ContractConfig from '@/contracts/config/erc20';
import { useToast } from '@chakra-ui/react';
import HTModal from '../../..';
import BidLoadingScreen from '../../../Auction/BidLoadingScreen';
import ApproveLoveSauceBatchContent from './ApproveLoveSauceBatchContent';
import ConfirmLoveSauceBatchContent from './ConfirmLoveSauceBatchContent';
import { usePrivy } from '@privy-io/react-auth';
import useGetBroodFish from '@/hooks/LoveSauceProgram/useGetBroodFish';

const CallToAction = (props: any) => {
  const { refetchBroodFish } = useGetBroodFish();
  const [isApprovedSpend, setIsSpendingApproved] = useState(false);
  const { removeOwnerFish } = useGetOwnersFish();
  const [isSendLoading, setIsSendLoading] = useState(false);
  const [isApproveSpendLoading, setIsApproveSpendLoading] = useState(false);
  const { currentLoveSauceProgramId } = useLoveSauceProgram();
  const { selectedBroodFishIds, resetSelectedBroodFishIds, totalFertility } =
    useSelectedBroodFish();
  const {
    estimateEnterLoveSauceProgram,
    enterLoveSauceProgram,
    transactionOptsState,
  } = useSendToLoveSauceProgram(
    selectedBroodFishIds,
    currentLoveSauceProgramId
  );
  const { addFishInLoveSauceProgram } = useGetFishInLoveSauceProgram();
  const { data: loveSauceProgramFee } = useReadContract({
    ...auctionContractConfig,
    functionName: 'loveSauceProgramFee',
  });
  const loveSauceProgramFeeAmountInGweiBigInt: bigint = (loveSauceProgramFee ||
    BigInt(0)) as bigint;
  const { approve, userShellBalanceBigInt, totalInBigInt, refetchBalance } =
    useErc20Token(loveSauceProgramFeeAmountInGweiBigInt);
  const { user } = usePrivy();
  const address = user?.wallet?.address;
  const { data: allowance } = useReadContract({
    ...erc20ContractConfig,
    functionName: 'allowance',
    args: [address, auctionContractConfig.address],
  });
  useWatchContractEvent({
    ...erc20ContractConfig,
    eventName: 'Approval',
    onLogs(logs: any) {
      const owner = logs.find((log: any) => (log.args.owner = address));
      if (owner) {
        setIsSpendingApproved(true);
        setIsApproveSpendLoading(false);
      }
    },
  });
  const toast = useToast();

  const allowanceValueInString: string = allowance ? allowance.toString() : '0';
  const allowanceValueInBigInt: bigint = BigInt(allowanceValueInString);

  const isApproveSpend = isApprovedSpend
    ? false
    : allowanceValueInBigInt === BigInt(0) ||
      loveSauceProgramFeeAmountInGweiBigInt > allowanceValueInBigInt;

  const approveSpend = async (e: any) => {
    if (userShellBalanceBigInt < totalInBigInt) {
      toast({
        title: 'Insufficient Balance',
        description: 'Please purchase more SHELL to complete transaction',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (loveSauceProgramFee && (loveSauceProgramFee as bigint) > BigInt(0)) {
      const allowanceValueInString: string = allowance
        ? allowance.toString()
        : '0';
      const allowanceValueInBigInt: bigint = BigInt(allowanceValueInString);

      if (
        allowanceValueInBigInt === BigInt(0) ||
        (loveSauceProgramFee as bigint) > allowanceValueInBigInt
      ) {
        try {
          toast({
            title: `Waiting for approval transaction`,
            status: 'loading',
            duration: 3000,
            isClosable: true,
          });
          setIsApproveSpendLoading(true);
          const approveRes = await approve(
            auctionContractConfig.address,
            loveSauceProgramFee as bigint
          );
        } catch (e: any) {
          setIsApproveSpendLoading(false);
          let errorMsg: string = '';
          if (
            e.reason === 'user rejected signing' &&
            e.code === 'ACTION_REJECTED'
          ) {
            errorMsg = `Rejected Approval`;
          } else {
            if (
              e?.data.code === 3 &&
              e?.data.message ===
                'failed paymaster validation. error message: ERC20: transfer amount exceeds balance'
            ) {
              errorMsg =
                'Please make sure you have enough SHELL in your wallet';
            }
          }
          toast({
            title: errorMsg || e.reason,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      }
    }
  };

  async function initConfirmLoveSauceBatch(e: any) {
    try {
      toast({
        title: `Confirm Love Sauce Transaction`,
        status: 'loading',
        duration: 3000,
        isClosable: true,
      });
      setIsSendLoading(true);
      await enterLoveSauceProgram?.();
      await refetchBalance();
      removeOwnerFish(selectedBroodFishIds);
      addFishInLoveSauceProgram(selectedBroodFishIds);
      resetSelectedBroodFishIds();
      refetchBroodFish();
      props?.closeModalsList?.map((each: any) => each?.(e));
    } catch (e: any) {
      setIsSendLoading(false);
      let errorMsg: string = '';
      if (
        e.reason === 'user rejected signing' &&
        e.code === 'ACTION_REJECTED'
      ) {
        errorMsg = `Rejected Love Sauce Transaction`;
      }
      toast({
        title: errorMsg || e.reason,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const closeModals = (e: any) => {
    props?.closeModalsList?.map((each: any) => each?.(e));
  };

  return (
    <Box>
      <VStack mb={['10px', '36px']} mt={['10px', '62px']}>
        <Text
          textAlign={'center'}
          color='brand.900'
          textTransform={'uppercase'}
          fontWeight={'medium'}
          fontSize={['xl']}
        >
          send creatures into breeding program?
        </Text>
        <Text
          textAlign={'center'}
          maxW='80%'
          color='brand.900'
          as='i'
          fontWeight={'medium'}
          fontSize={['xl']}
        >
          fish will be locked from other activities for 30 days
        </Text>
      </VStack>

      <Flex
        flexDir={['column-reverse', 'row']}
        pl={[0, '80px']}
        pr={[0, '80px']}
        alignItems={'center'}
        gap={[0, '30px']}
        justifyContent={'center'}
        w='100%'
      >
        <Button
          onClick={closeModals}
          color='white'
          _hover={{
            bg: 'white',
            color: 'brand.600',
          }}
          mt={['10px', '0']}
          mb={['10px', '28px']}
          w={['60%', '35%']}
          bg='brand.600'
          p='3'
          // leftIcon={<NotAllowedIcon color={'brand.900'} fontSize={'xl'} />}
        >
          <Text textTransform={'uppercase'} fontWeight={'bold'} fontSize='md'>
            exit
          </Text>
        </Button>

        <HTModal
          bgColor={
            isApproveSpendLoading || isSendLoading
              ? '#FF530D'
              : isApproveSpend
              ? '#FFEE57'
              : '#4AF8FF'
          }
          closeButtonType='hollow'
          CallToAction={(props: any) => {
            return (
              <Button
                p={'15px 0'}
                // onClick={(e: any) => {
                //   console.log('close modals list', closeModalsList);
                //   closeModalsList?.map((each: any) => each?.(e));
                // }}
                disabled={isApproveSpendLoading || isSendLoading}
                onClick={
                  isApproveSpend ? approveSpend : initConfirmLoveSauceBatch
                }
                m='0 auto 30px auto'
                width={['70%', '35%']}
                _hover={{
                  background: 'white',
                  color: 'brand.900',
                }}
                color='white'
                background={
                  isApproveSpendLoading || isSendLoading ? 'grey' : 'brand.900'
                }
              >
                <Text
                  textTransform={'uppercase'}
                  fontWeight={'medium'}
                  fontSize='sm'
                >
                  {isApproveSpendLoading || isSendLoading
                    ? '...loading'
                    : isApproveSpend
                    ? 'Approve'
                    : 'Confirm'}
                </Text>
              </Button>
            );
          }}
          Trigger={(props: any) => {
            return (
              <Button
                {...props}
                color='white'
                _active={{
                  color: 'white',
                  bg: 'brand.900',
                }}
                _hover={{
                  bg: 'white',
                  color: 'brand.900',
                }}
                mb={['0px', 0, 0, '28px']}
                w={['60%', '35%']}
                bg='brand.900'
                p='3'
                height='fit-content'
              >
                <Text
                  textTransform={'uppercase'}
                  fontWeight={'bold'}
                  fontSize='md'
                >
                  confirm
                </Text>
              </Button>
            );
          }}
          Content={() => {
            return isApproveSpendLoading || isSendLoading ? (
              <BidLoadingScreen
                msg={
                  isApproveSpendLoading
                    ? 'approving love sauce batch'
                    : 'confirming love sauce batch'
                }
              />
            ) : (
              <div>
                {isApproveSpend && selectedBroodFishIds.length ? (
                  <ApproveLoveSauceBatchContent
                    totalFertility={totalFertility}
                    selectedBroodFishIds={selectedBroodFishIds}
                    loveSauceProgramFeeAmountInGweiBigInt={
                      loveSauceProgramFeeAmountInGweiBigInt
                    }
                  />
                ) : (
                  <ConfirmLoveSauceBatchContent
                    totalFertility={totalFertility}
                    currentLoveSauceProgramId={currentLoveSauceProgramId}
                    selectedBroodFishIds={selectedBroodFishIds}
                    loveSauceProgramFeeAmountInGweiBigInt={
                      loveSauceProgramFeeAmountInGweiBigInt
                    }
                  />
                )}
              </div>
            );
          }}
        />
      </Flex>
    </Box>
  );
};

export default CallToAction;
