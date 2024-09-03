import React, { useEffect } from 'react';
import AuctionSneak from './AuctionSneak';
import AuctionDetails from './AuctionDetails';
import AuctionItems from './AuctionItems';
import useHashTankAccount from '@/hooks/useHashtankAccount';
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  TableContainer,
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Tfoot,
  Text,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import MyBidFish from '../General/Modal/Variants/Auction/MyBidFish';
import HashtankTooltip from '../General/Tooltip';
import BellImage from 'public/static/images/General/Tooltip/Bell.webp';
import useFetchUserBids from '@/new-hooks/auction/useFetchUserBids';
import useFetchLatestAuctionDetails from '@/new-hooks/auction/useFetchLatestAuctionDetails';
import ArrowBackIcon from '@/components/General/Icons/ArrowBackIcon';
import ArrowForwardIcon from '@/components/General/Icons/ArrowForwardIcon';
import useFetchNextAuction from '@/new-hooks/auction/useFetchNextAuction';
import { useRouter } from 'next/router';
import useFetchUsersClaims from '@/new-hooks/claims/useFetchUserClaims';

function UserBids({ id }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { userShellBalanceBigInt } = useErc20Token();
  const { auctionId, batchPrefix, batchNumber } = useFetchLatestAuctionDetails(
    (data: any) => {
      return {
        auctionId: data.auctionId,
        batchPrefix: data.batchPrefix,
        batchNumber: data.batchNumber,
      };
    },
    id
  );
  const { address } = useHashTankAccount();
  const { data } = useFetchUsersClaims(address);
  const userBalance = data?.userBalance;

  const {
    data: logs,
    isLoading,
    refetch,
  } = useFetchUserBids(auctionId, address);
  let totalUniqueFamilyList: any = [];
  const totalSpend = logs?.reduce((acc: number, curr: any) => {
    if (totalUniqueFamilyList.indexOf(curr.fish.fishtype_id) === -1) {
      totalUniqueFamilyList.push(curr.fish.fishtype_id);
    }
    return acc + curr.bid_amount;
  }, 0);

  // const { batchContentDefined, batchNumber, currentBatchId, batchPrefix } =
  //   useAuctionDetails();
  // const { logs, refreshBids, isLoading } = useGetMyBids(currentBatchId);
  // let totalUnqiueFamilyList: BigInt[] = [];

  // const totalSpentBigInt = logs.reduce((acc: number, curr: any) => {
  //   if (
  //     curr?.fishBatchNumber &&
  //     totalUnqiueFamilyList.indexOf(
  //       batchContentDefined[Number(curr.fishBatchNumber.toString()) - 1]
  //     ) === -1
  //   ) {
  //     totalUnqiueFamilyList.push(
  //       batchContentDefined[Number(curr.fishBatchNumber.toString()) - 1]
  //     );
  //   }
  //   return acc + Number(curr.bid);
  // }, 0);

  useEffect(() => {
    async function init() {
      await refetch();
    }
    if (isOpen) {
      init();
    }
  }, [isOpen]);

  function closeHandler() {
    if (!isLoading) {
      onClose();
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '50px',
        margin: 'auto',
        left: 'calc(50% - 78px)',
        zIndex: 1,
      }}
    >
      <HashtankTooltip
        storageKey='my-bids'
        Icon={BellImage}
        title='KEEP TRACK OF BIDS'
        Instruction={() => (
          <>
            Access your bid panel to easily track bids placed and remaining{' '}
            <strong>⌘SHELL</strong> balance.
          </>
        )}
        Trigger={() => (
          <Button
            isDisabled={isLoading}
            textTransform={'uppercase'}
            color='white'
            bg='brand.900'
            onClick={onOpen}
          >
            See your bids
          </Button>
        )}
      />
      <Drawer placement={'bottom'} onClose={closeHandler} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg='brand.800'>
          <DrawerHeader
            display={'flex'}
            justifyContent={'space-between'}
            borderBottomWidth='1px'
          >
            <Text>
              <span style={{ color: '#FF530D' }}>YOUR BALANCE: </span> ⌘
              {userBalance}
            </Text>

            <div
              style={{ cursor: 'pointer', color: '#FF530D' }}
              onClick={closeHandler}
            >
              Close
            </div>
          </DrawerHeader>
          <DrawerBody>
            <TableContainer>
              <Table size={['sm', 'md']}>
                <Thead>
                  <Tr>
                    <Th>Auction ID</Th>
                    <Th>Details</Th>
                    <Th>Your Bid</Th>
                    <Th>Current Bid</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {logs?.map(
                    (each: any) =>
                      each && (
                        <MyBidFish
                          serialNumber={each.fish.serial_number}
                          fishId={each.fish.id}
                          batchPrefix={batchPrefix}
                          currentBatchId={auctionId}
                          batchNumber={batchNumber}
                          batchFishIndex={0}
                          fishTypeId={each.fish.fishtype_id}
                          key={each.fish.id}
                          myBid={each.bid_amount}
                        />
                      )
                  )}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th color={'brand.900'}>Total Bids: {logs?.length}</Th>
                    <Th color={'brand.900'}>
                      Total unique species: {totalUniqueFamilyList.length}
                    </Th>
                    <Th color={'brand.900'}>Total Spent: ⌘ {totalSpend}</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

const AuctionPageContent = ({ id }: any) => {
  const router = useRouter();
  const { isConnected } = useHashTankAccount();
  const { data } = useFetchNextAuction(id);
  const after = data?.paginate?.after?.id;
  const before = data?.paginate?.before?.id;

  const onNext = () => {
    router.push(`/auction/${after}`);
  };

  const onPrevious = () => {
    router.push(`/auction/${before}`);
  };

  return (
    <main
      style={{
        height: 'fit-content',
        backgroundColor: '#373A49',
        paddingBottom: '10vh',
        overflow: 'none',
      }}
      id='auction-page-main'
    >
      {before && (
        <IconButton
          cursor={'pointer'}
          zIndex={99999}
          top={'50%'}
          position={'fixed'}
          left={0}
          _hover={{
            background: 'none',
          }}
          variant='ghost'
          color={'brand.900'}
          onClick={onPrevious}
          background='none'
          aria-label='Back Arrow'
          icon={<ArrowBackIcon fontSize={[50, 120]} />}
        />
      )}
      <UserBids id={id} />
      {isConnected ? (
        <>
          <AuctionSneak id={id} />
          <AuctionDetails id={id} />
          <AuctionItems id={id} />
        </>
      ) : (
        <div style={{ height: '150vh' }}></div>
      )}

      {after && (
        <IconButton
          cursor={'pointer'}
          zIndex={99999}
          top={'50%'}
          position={'fixed'}
          right={0}
          display={'flex'}
          _hover={{
            background: 'none',
          }}
          variant='ghost'
          color={'brand.900'}
          onClick={onNext}
          background='none'
          aria-label='Back Arrow'
          icon={<ArrowForwardIcon fontSize={[50, 120]} />}
        />
      )}
    </main>
  );
};

export default AuctionPageContent;
