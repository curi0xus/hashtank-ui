import React, { useState } from 'react';
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useBlockNumber,
} from 'wagmi';
import useAuctionDetails from '@/hooks/useAuctionDetails';
import useGetHighestBidByFishInBatch from '@/hooks/useGetHighestBidByFishInBatch';
import { Card } from '@chakra-ui/react';
import useAdminAuctionHooks from '@/hooks/admin/useAdminAuctionHooks';
import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { getHumanReadableBatchStatus } from '@/helpers/batch/batchStatus';

const FishAuctionDetails = ({
  currentBatchId,
  batchFishIndex,
  setWinners,
  winners,
  fishType,
  fishTypeList,
  setFishTypeList,
  winningBids,
  setWinningBids,
  fishIndexList,
  setFishIndexList,
  fishIndex,
}: any) => {
  const { highestBidBigInt, winnerAddress } = useGetHighestBidByFishInBatch(
    currentBatchId,
    batchFishIndex,
    ""
  );
  const [isChecked, setIsChecked] = useState(false);

  const onChangeHandler = (e: any) => {
    if (isChecked) {
      let winnersCopy = [...winners];
      let fishTypeListCopy = [...fishTypeList];
      let winningBidsCopy = [...winningBids];
      let fishIndexListCopy = [...fishIndexList];
      winnersCopy.pop();
      fishTypeListCopy.pop();
      winningBidsCopy.pop();
      fishIndexList.pop();
      setWinners([...winnersCopy]);
      setFishTypeList([...fishTypeListCopy]);
      setWinningBids([...winningBidsCopy]);
      setFishIndexList([...fishIndexListCopy]);
      setIsChecked(false);
    } else {
      if (
        winnerAddress &&
        winnerAddress !== '0x0000000000000000000000000000000000000000'
      ) {
        setWinners([...winners, winnerAddress]);
        setFishTypeList([...fishTypeList, fishType]);
        setWinningBids([...winningBids, highestBidBigInt]);
        setFishIndexList([...fishIndexList, fishIndex]);
        setIsChecked(true);
      }
    }
  };

  return highestBidBigInt ? (
    <>
      <Card border='1px solid red' height={'fit-content'} width={'fit-content'}>
        <h1>
          Batch #{currentBatchId} for {fishType.toString()} fish
        </h1>
        {highestBidBigInt !== BigInt(0) && <p>Highest Bid: {highestBidBigInt.toString()}</p>}
        {winnerAddress && <p>Winner: {winnerAddress}</p>}
      </Card>
      <input checked={isChecked} type='checkbox' onChange={onChangeHandler} />
    </>
  ) : (
    <p></p>
  );
};

const CompleteAuctionButton = ({
  winners,
  winningBids,
  fishTypeList,
  currentBatchId,
  fishIndexList,
}: any) => {
  const { completeAuctionWriteAsync } = useAdminAuctionHooks(
    currentBatchId,
    winners,
    winningBids,
    fishTypeList,
    fishIndexList
  );

  // function completeAuction(
  //   uint256 batchId,
  //   address[] memory winners,
  //   uint256[] memory fishTypeList,
  //   uint256[] memory winningBids
  // )

  // Get the batch
  // Get the winning bids
  // Get the fishTypes of those fishes with winning bids
  // Get the addresses of those bids
  const onCompleteAuctionHandler = async (e: any) => {
    try {
      await completeAuctionWriteAsync();
    } catch (e: any) {
      console.log('complete auction error', e);
    }
  };
  return (
    <button
      style={{ border: '1px solid white', background: 'red', marginTop: 10 }}
      onClick={onCompleteAuctionHandler}
    >
      Complete Auction
    </button>
  );
};

const SetBaseTokenURIComponent = () => {
  const { data: tokenUri, error } = useReadContract({
    ...auctionContractConfig,
    functionName: 'hashTankTokenUri',
    args: [BigInt(2)],
  });

  const { data: baseTokenURI } = useReadContract({
    ...auctionContractConfig,
    functionName: 'baseTokenURI',
  });

  const setBaseTokenConfig = {
    ...auctionContractConfig,
    functionName: 'setBaseTokenURI',
    args: [process.env.NEXT_PUBLIC_SUPABASE_BASE_URL],
  };

  const {
    data: setBaseTokenURIWriteData,
    writeContractAsync: setBaseTokenURIWriteAsync,
    error: setBaseTokenURIWriteError,
  } = useWriteContract();

  const onSetBaseTokenURI = async (e: any) => {
    try {
      await setBaseTokenURIWriteAsync?.(setBaseTokenConfig);
    } catch (e: any) {
      console.log('ERROR', e);
    }
  };

  const { address } = useAccount();

  return (
    <div>
      <h1>TOKEN URI: {tokenUri as string}</h1>
      <h1>BASE TOKEN URI: {baseTokenURI as string}</h1>
      <button
        style={{ border: '1px solid white', background: 'red', marginTop: 10 }}
        onClick={onSetBaseTokenURI}
      >
        Set Base Token URI
      </button>
    </div>
  );
};

const InitialiseBatch = ({ batchId }: any) => {
  const initialiseBatchConfig = {
    ...auctionContractConfig,
    functionName: 'initialiaseBatch',
    args: ['1u9u3ioenwiondfiowher902oih3noiennwejksndfjwednf', BigInt(batchId)],
  };
  const {
    data: initialiseBatchWriteData,
    writeContractAsync: initialiseBatchWriteAsync,
    error: initialiseBatchWriteError,
  } = useWriteContract();

  const onInitialiseHandler = async (e: any) => {
    try {
      await initialiseBatchWriteAsync?.(initialiseBatchConfig);
    } catch (e: any) {
      console.log('error', e);
    }
  };
  return (
    <div>
      <h1>Initialise Batch</h1>
      <button
        style={{ border: '1px solid white', background: 'red', marginTop: 10 }}
        onClick={onInitialiseHandler}
      >
        Initialise Batch
      </button>
    </div>
  );
};

const RevealBatch = ({ batchId, scheduledRevealTimes }: any) => {
  const { data: blockNumber } = useBlockNumber({
    watch: true,
  });

  const revealBatchConfig = {
    ...auctionContractConfig,
    functionName: 'revealBatch',
    args: [BigInt(batchId)],
  };

  const {
    data: revealBatchWriteData,
    writeContractAsync: revealBatchWriteAsync,
    error: revealBatchWriteError,
  } = useWriteContract();

  const onRevealHandler = async (e: any) => {
    await revealBatchWriteAsync?.(revealBatchConfig);
  };
  return (
    <div>
      <h1>Reveal Batch</h1>
      <h1>Current Time: {blockNumber?.toString()}</h1>
      <h1>Scheduled Reveal Time: {scheduledRevealTimes.toString()}</h1>
      {blockNumber !== undefined && (
        <button
          disabled={scheduledRevealTimes > blockNumber}
          style={{
            border: '1px solid white',
            background: scheduledRevealTimes > blockNumber ? 'grey' : 'red',
            marginTop: 10,
          }}
          onClick={onRevealHandler}
        >
          Reveal Batch
        </button>
      )}
    </div>
  );
};

const AdminPage = () => {
  const { isConnected } = useAccount();
  const {
    batchStatus,
    batchNumber,
    batchName,
    batchContentDefined,
    humanReadableStartTime,
    endAtTsInMs,
    batchDescription,
    currentBatchId,
  } = useAuctionDetails();
  const [winners, setWinners] = useState([]);
  const [winningBids, setWinningBids] = useState([]);
  const [fishTypeList, setFishTypeList] = useState([]);
  const [fishIndexList, setFishIndexList] = useState([]);
  const { data: scheduledRevealTimes } = useReadContract({
    ...auctionContractConfig,
    functionName: 'scheduledRevealTimes',
    args: [BigInt(currentBatchId)],
  });

  const isCompleteAuctionButtonActive =
    winners.length &&
    winningBids.length &&
    fishTypeList.length &&
    fishIndexList.length &&
    winningBids.length === winners.length &&
    winningBids.length === fishTypeList.length &&
    winners.length === fishTypeList.length &&
    fishIndexList.length === winners.length &&
    fishIndexList.length === winningBids.length &&
    fishIndexList.length === fishTypeList.length &&
    currentBatchId !== undefined &&
    BigInt(currentBatchId) >= BigInt(0);

  return (
    <div
      style={{
        display: 'flex',
        height: 'fit-content',
        minHeight: '100vh',
        width: '100vw',
        background: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {batchStatus >= 1 && (
        <h1>Batch Status: {getHumanReadableBatchStatus(batchStatus)}</h1>
      )}

      <SetBaseTokenURIComponent />

      {batchContentDefined &&
        batchContentDefined.map((each: any, i: number) => {
          return (
            <FishAuctionDetails
              fishIndexList={fishIndexList}
              setFishIndexList={setFishIndexList}
              fishTypeList={fishTypeList}
              setFishTypeList={setFishTypeList}
              winningBids={winningBids}
              setWinningBids={setWinningBids}
              winners={winners}
              setWinners={setWinners}
              key={i}
              fishIndex={BigInt(i)}
              fishType={each}
              currentBatchId={currentBatchId}
              batchFishIndex={i}
            />
          );
        })}

      {isCompleteAuctionButtonActive && (
        <CompleteAuctionButton
          fishIndexList={fishIndexList}
          currentBatchId={currentBatchId}
          winners={winners}
          winningBids={winningBids}
          fishTypeList={fishTypeList}
        />
      )}
      {batchStatus === 2 &&
        ((scheduledRevealTimes as bigint) > BigInt(0) ? (
          <RevealBatch
            scheduledRevealTimes={scheduledRevealTimes}
            batchId={currentBatchId}
          />
        ) : (
          <InitialiseBatch batchId={currentBatchId} />
        ))}
    </div>
  );
};

export default AdminPage;
