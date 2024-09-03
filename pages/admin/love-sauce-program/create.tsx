import React from 'react';
import useCreateLoveSauceProgramHooks from '@/hooks/admin/loveSauceProgram/useCreateLoveSauceProgramHooks';
import { Stat, StatLabel, StatNumber, StatGroup } from '@chakra-ui/react';
import Link from 'next/link';

const CreateLoveSauceProgramBatch = ({
  startAt,
  endAt,
  distributedAt,
  cohortSize,
  maxCohortSize,
  minCohortSize,
}: any) => {
  const { createLoveSauceProgramBatchWriteAsync, loveSauceProgramBatch } =
    useCreateLoveSauceProgramHooks(
      startAt,
      endAt,
      distributedAt,
      maxCohortSize,
      minCohortSize
    );

  const onCreateLoveSauceBatchHandler = async (e: any) => {
    await createLoveSauceProgramBatchWriteAsync?.();
  };

  // @ts-ignore
  const batchStatus = loveSauceProgramBatch?.[3]?.toString();
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>Batch Status: {batchStatus}</h1>
      {batchStatus === '1' && (
        <Link
          style={{ textDecoration: 'underline' }}
          href='/love-sauce-program'
        >
          Enter fish into love sauce program{' > '}
        </Link>
      )}
      {batchStatus === '1' && (
        <Link
          style={{ textDecoration: 'underline' }}
          href='/admin/love-sauce-program/start'
        >
          Start love sauce program {' > '}
        </Link>
      )}
      <button
        disabled={!startAt || !endAt || !maxCohortSize || !minCohortSize}
        style={{
          border: '1px solid white',
          background:
            !startAt || !endAt || !maxCohortSize || !minCohortSize
              ? 'grey'
              : 'red',
          marginTop: 10,
        }}
        onClick={onCreateLoveSauceBatchHandler}
      >
        Create Love Sauce Batch
      </button>
    </div>
  );
};

const LoveSauceProgramAdmin = () => {
  //5mins from now
  const nowTsInSecs = Math.round(new Date().getTime() / 1000) + 10;
  // // 30 days later
  // const closingTsInSecs = nowTsInSecs + 2.592e6;
  // 5mins
  const closingTsInSecs = nowTsInSecs + 3000;
  const distTsInSecs = nowTsInSecs + 5000;
  const maxCohortSize = 20;
  const minCohortSize = 2;
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
      <StatGroup>
        <Stat border='1px solid red'>
          <StatLabel>Start At</StatLabel>
          <StatNumber>{nowTsInSecs}</StatNumber>
        </Stat>

        <Stat border='1px solid red'>
          <StatLabel>End At</StatLabel>
          <StatNumber>{closingTsInSecs}</StatNumber>
        </Stat>
        <Stat border='1px solid red'>
          <StatLabel>Distributed At</StatLabel>
          <StatNumber>{distTsInSecs}</StatNumber>
        </Stat>
        <Stat border='1px solid red'>
          <StatLabel>Max Cohort Size</StatLabel>
          <StatNumber>{maxCohortSize}</StatNumber>
        </Stat>
        <Stat border='1px solid red'>
          <StatLabel>Min Cohort Size</StatLabel>
          <StatNumber>{minCohortSize}</StatNumber>
        </Stat>
      </StatGroup>
      <CreateLoveSauceProgramBatch
        distributedAt={distTsInSecs}
        startAt={nowTsInSecs}
        endAt={closingTsInSecs}
        maxCohortSize={maxCohortSize}
        minCohortSize={minCohortSize}
      />
    </div>
  );
};

export default LoveSauceProgramAdmin;
