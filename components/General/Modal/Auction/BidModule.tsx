import React, { useEffect, useState } from 'react';
import {
  Divider,
  Flex,
  Text,
  NumberInput,
  NumberInputField,
  Button,
  useToast,
} from '@chakra-ui/react';
import { usePrivy } from '@privy-io/react-auth';
import axiosInstance from '@/util/axios';
import useFetchLatestAuctionDetails from '@/new-hooks/auction/useFetchLatestAuctionDetails';
import useFetchBidHistory from '@/new-hooks/auction/useFetchBidHistory';
import useFetchUsersClaims from '@/new-hooks/claims/useFetchUserClaims';
import { getAccessToken } from '@privy-io/react-auth';

const BidSubmissionForm = ({
  closeModalsList,
  img,
  // auctionId,
  fishName,
  fishId,
}: any) => {
  const toast = useToast();
  const { user } = usePrivy();
  const address = user?.wallet?.address;
  // @ts-ignore
  const { refetch: refetchUserBalance } = useFetchUsersClaims(address);
  const { minBid, auctionId } = useFetchLatestAuctionDetails((data: any) => ({
    minBid: data.minBid,
    auctionId: data.auctionId,
  }));
  const [bidAmount, setBidAmount] = useState<undefined | string>(undefined);
  const { data: highestBid, refetch } = useFetchBidHistory(
    auctionId,
    fishId,
    (data: any) => data.highestBid
  );

  useEffect(() => {
    refetch();
  }, [fishId]);


  return (
    <Flex gap='2%' flexDir={['column', 'row']} w='100%'>
      <NumberInput
        onKeyDown={(evt: any) =>
          ['e', 'E', '+', '-', '.'].includes(evt.key) && evt.preventDefault()
        }
        width={['100%', '65%']}
        onChange={(valueString: string) => {
          setBidAmount(valueString);
        }}
        min={highestBid ? highestBid + 1 : minBid}
        value={bidAmount}
        step={1}
      >
        <NumberInputField
          _active={{
            borderColor: 'brand.900',
            boxShadow: 'none',
          }}
          _focus={{
            borderColor: 'brand.900',
            boxShadow: 'none',
          }}
          onFocus={() => setBidAmount(highestBid ? highestBid + 1 : minBid)}
          step='1'
          borderRadius={5}
          backgroundColor='rgba(135, 180, 255, 0.32)'
          borderWidth={2}
          borderColor='brand.900'
          mb={['10px', '0']}
          width={['100%']}
          placeholder={`⌘ ${highestBid ? highestBid + 1 : minBid} or above`}
        />
      </NumberInput>
      <Button
        disabled={false}
        onClick={async (e: any) => {
          if (!bidAmount) {
            toast({
              title: 'No Bid Received',
              description: 'Please enter a valid bid.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            return;
          }
          if (Number(bidAmount) < highestBid) {
            toast({
              title: 'Bid Too Low',
              description: `Bid amount must be greater than ${highestBid} ETH.`,
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            return;
          }

          try {
            const accessToken = await getAccessToken();
            const instance = axiosInstance(accessToken!);
            const response = await instance.post(`/api/bids/submit-bid`, {
              fishId,
              bidAmount,
              address,
              auctionId,
            });
          
            if (response.status === 200 || response.data.success) {
              refetch(); // Refetch fish data
              refetchUserBalance(); // Refetch user balance
              setBidAmount(undefined); // Reset bid amount
          
              toast({
                title: 'Bid Successful!',
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
            }
          } catch (error: any) {
            toast({
              title: 'Bid Error',
              description: error?.response?.data?.error || 'Please enter a valid bid.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          }

          // if ((myBid as bigint) > BigInt(0)) {
          //   toast({
          //     title: 'Bid Already Received',
          //     description: "You're only allowed to bid once.",
          //     status: 'success',
          //     duration: 9000,
          //     isClosable: true,
          //   });
          //   return;
          // }
          // props.onClick(e);
        }}
        m='auto'
        width={['70%', '35%']}
        _hover={{
          background: 'white',
          color: 'brand.900',
        }}
        color='white'
        background={false ? 'grey' : 'brand.900'}
      >
        <Text textTransform={'uppercase'} fontWeight={'medium'} fontSize='sm'>
          Submit Bid
        </Text>
      </Button>
    </Flex>
  );
};

const BidModule = ({ closeModalsList, ...rest }: any) => {
  return (
    <>
      <BidSubmissionForm closeModalsList={closeModalsList} {...rest} />
      <Divider opacity={1} borderWidth={'1px'} borderColor={'brand.900'} />
    </>
  );
};

export default BidModule;
