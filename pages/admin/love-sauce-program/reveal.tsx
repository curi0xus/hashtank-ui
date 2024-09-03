import useRevealLoveSauceProgramHooks from '@/hooks/admin/useRevealLoveSauceProgramHooks';
import { useBlockNumber } from 'wagmi';

const RevealLoveSauceProgramPage = () => {
  const { data: blockNumber } = useBlockNumber({
    watch: true,
  });

  const {
    commitLoveSauceProgramStrainsWriteAsync,
    transfuseWriteAsync,
    transfuctionTimeForLoveSauceBatch,
    currentTokenCount,
  } = useRevealLoveSauceProgramHooks();

  const isDisabled: boolean = !(
    blockNumber !== undefined &&
    transfuctionTimeForLoveSauceBatch !== undefined &&
    blockNumber &&
    transfuctionTimeForLoveSauceBatch &&
    blockNumber >= (transfuctionTimeForLoveSauceBatch as bigint)
  ) as boolean;
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
      <h1>Current Token Count: {currentTokenCount?.toString()}</h1>
      <button
        style={{
          border: '1px solid white',
          background: 'red',
          marginTop: 10,
        }}
        onClick={commitLoveSauceProgramStrainsWriteAsync}
      >
        Commit DNA Sequence
      </button>
      <h1>Scheduled Block: {transfuctionTimeForLoveSauceBatch?.toString()}</h1>
      <h1>Current Block: {blockNumber?.toString()}</h1>
      <button
        disabled={isDisabled}
        style={{
          border: '1px solid white',
          background: isDisabled ? 'grey' : 'red',
          marginTop: 10,
        }}
        onClick={transfuseWriteAsync}
      >
        Transfuse DNA Sequence
      </button>
    </div>
  );
};

export default RevealLoveSauceProgramPage;
