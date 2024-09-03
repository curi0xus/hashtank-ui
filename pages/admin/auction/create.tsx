import React, { useState } from 'react';
import { parseEther } from 'viem';
import useCreateNewAuctionBatch from '@/hooks/admin/auction/useCreateNewAuctioBatch';
import hiddenFishTypeIdDetailsMap from '@/constants/auction/hiddenFishTypeIdDetailsMap';
import Image from 'next/image';

const LIST_OF_AVAILABLE_TYPES = Object.keys(hiddenFishTypeIdDetailsMap).map(
  (key: string) => ({
    key,
    image: hiddenFishTypeIdDetailsMap[key].thumbnailImg,
  })
);

const CreateAuctionBatch = () => {
  const [fishTypes, setFishTypes] = useState<string[]>([]);
  const [fishTypeQty, setFishTypeQty] = useState(0);
  // const [fishSetLength, setFishSetLength] = useState(0);
  const [batchName, setBatchName] = useState('');
  const [batchPrefix, setBatchPrefix] = useState('');
  const [batchDescription, setBatchDescription] = useState('');
  const [minBid, setMinBid] = useState('');
  const [startTs, setStartTs] = useState(0);
  const [endTs, setEndTs] = useState(0);

  const { currentAuctionBatch, createAuctionBatchWriteAsync } =
    useCreateNewAuctionBatch();

  const qtyHandler = (e: any) => {
    setFishTypeQty(e.target.value);
  };

  // const fishSetLengthHandelr = (e: any) => {
  //   setFishSetLength(e.target.value);
  // };

  const createFishType = (key: string) => () => {
    if (fishTypes.indexOf(key) === -1) {
      setFishTypes([...fishTypes, key]);
    }
  };

  const removeFishType = (key: string) => () => {
    setFishTypes(fishTypes.filter((each: string) => each !== key));
  };

  const createAuctionBatchHandler = async () => {
    let batch = [];
    for (let i = 0; i < fishTypes.length; i++) {
      for (let k = 0; k < fishTypeQty; k++) {
        batch.push(Number(fishTypes[i]));
      }
    }
    await createAuctionBatchWriteAsync({
      mindBidInEth: parseEther(minBid),
      batchContent: batch,
      startTime: startTs,
      endTime: endTs,
      batchPrefix,
      batchName,
      batchDescription,
      fishTypeQty,
    });
  };

  const onBatchNameChange = (e: any) => {
    setBatchName(e.target.value);
  };

  const onBatchPrefixChange = (e: any) => {
    setBatchPrefix(e.target.value);
  };

  const onBatchDescriptionChange = (e: any) => {
    setBatchDescription(e.target.value);
  };

  const onMinBidChange = (e: any) => {
    setMinBid(e.target.value);
  };

  const onStartDateChange = (e: any) => {
    setStartTs(Math.round(e.target.valueAsNumber / 1000));
  };

  const onEndDateChange = (e: any) => {
    setEndTs(Math.round(e.target.valueAsNumber / 1000));
  };
  return (
    <div
      style={{
        color: 'black',
        padding: '400px 100px',
        display: 'flex',
        gap: '10px',
        flexDirection: 'column',
        height: 'fit-content',
        width: '100vw',
        background: 'black',
      }}
    >
      <h1>Current Auction Batch: {currentAuctionBatch?.toString()}</h1>

      <div style={{ display: 'flex', gap: '10px', color: 'white' }}>
        <h1>Select Fish Types: </h1>
        {LIST_OF_AVAILABLE_TYPES.map((each: any) => {
          return (
            <div
              onClick={createFishType(each.key)}
              style={{
                border: '1px solid orange',
                padding: 10,
                cursor: 'pointer',
              }}
              key={each.key}
            >
              <h1>FISH TYPE ID: {each.key}</h1>
              <Image alt={each.key} height={100} width={100} src={each.image} />
            </div>
          );
        })}
      </div>
      <h1>Selected Fish Types:</h1>
      <ul style={{ color: 'white' }}>
        {fishTypes.map((each: string) => (
          <li
            style={{ cursor: 'pointer' }}
            onClick={removeFishType(each)}
            key={each}
          >
            {each}
          </li>
        ))}
      </ul>
      <input onChange={onBatchNameChange} placeholder='Batch Name' />
      <input onChange={onBatchPrefixChange} placeholder='Batch Prefix' />
      <textarea
        onChange={onBatchDescriptionChange}
        placeholder='Enter Batch Description'
      ></textarea>
      <input
        onChange={onMinBidChange}
        placeholder='Enter Min. Bid Price In Eth'
        type='number'
      />

      <input
        placeholder='Enter Number Of Fish In Each Type'
        onChange={qtyHandler}
        type='number'
      />
      {/* <input
        placeholder='Enter Number Of Total Number of Fish In Gene Pool'
        onChange={fishSetLengthHandelr}
        type='number'
      /> */}
      <input
        onChange={onStartDateChange}
        type='datetime-local'
        placeholder='Set Start Date'
      />
      <input
        onChange={onEndDateChange}
        type='datetime-local'
        placeholder='Set End Date'
      />
      <button
        style={{ background: 'orange' }}
        onClick={createAuctionBatchHandler}
      >
        Create Auction Batch
      </button>
    </div>
  );
};

export default CreateAuctionBatch;
