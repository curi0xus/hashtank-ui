import React from 'react';
import useCompleteLoveSauceProgramHooks from '@/hooks/admin/useCompleteSauceProgramHooks';
import { getHumanReadableBatchStatus } from '@/helpers/batch/batchStatus';
import Link from 'next/link';

const CompleteLoveSauceProgram = ({}: any) => {
  const {
    completeLoveSauceProgramBatchWriteAsync,
    loveSauceProgramBatch,
    programParticipants,
  } = useCompleteLoveSauceProgramHooks();

  const onCompleteLoveSauceBatchHandler = async (e: any) => {
    await completeLoveSauceProgramBatchWriteAsync?.();
  };

  console.log('loveSauceProgramBatch', loveSauceProgramBatch);

  // @ts-ignore
  const batchStatus: string = loveSauceProgramBatch?.[3]?.toString();
  // @ts-ignore
  const batchPercentageWin: bigint = loveSauceProgramBatch?.[4];
  // @ts-ignore
  const numOfPartipants: number = programParticipants?.length || 0;
  // @ts-ignore
  const batchMultiplier: bigint = loveSauceProgramBatch?.[5];
  // @ts-ignore
  const batchMultiplierChance: bigint = loveSauceProgramBatch?.[6];

  const numWinners: bigint =
    (batchPercentageWin *
      BigInt(numOfPartipants) *
      batchMultiplier *
      batchMultiplierChance) /
    BigInt(10000);

  const isDisabled = batchStatus === '2';
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>Batch Status: {getHumanReadableBatchStatus(Number(batchStatus))}</h1>
      <p>Pick {numWinners?.toString()} offspring to distribute</p>
      <h1></h1>
      <button
        disabled={isDisabled}
        style={{
          border: '1px solid white',
          background: isDisabled ? 'grey' : 'red',
          marginTop: 10,
        }}
        onClick={onCompleteLoveSauceBatchHandler}
      >
        {isDisabled ? 'Completed' : 'Complete Love Sauce Program'}
      </button>
      {isDisabled && (
        <Link
          style={{ textDecoration: 'underline', marginTop: 30 }}
          href='/admin/love-sauce-program/reveal'
        >
          {'Go To Reveal >'}
        </Link>
      )}
    </div>
  );
};

const CompleteLoveSauceProgramProgramAdminPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        background: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <CompleteLoveSauceProgram />
    </div>
  );
};

export default CompleteLoveSauceProgramProgramAdminPage;
