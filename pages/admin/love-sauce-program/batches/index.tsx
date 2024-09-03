import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import useGetAllLoveSaucePrograms from '@/hooks/admin/loveSauceProgram/useGetAllLoveSaucePrograms';
import useGetProgramParticipants from '@/hooks/admin/loveSauceProgram/useGetProgramParticipants';
import useCloseBatch from '@/hooks/admin/loveSauceProgram/useCloseBatch';

const ParticipantsRow = ({ batchId }: any) => {
  const { registrationDetails } = useGetProgramParticipants(batchId);
  return registrationDetails.length ? (
    <Td>
      {registrationDetails.map((each: any) => (
        <a
          key={each.batchId}
          href={`/admin/love-sauce-program/batches/${each.fishOwner}?batchId=${batchId}`}
          style={{
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          {each.fishOwner}
        </a>
      ))}
    </Td>
  ) : (
    <Td>No participants</Td>
  );
};

const CloseBatch = ({ batchId }: any) => {
  const { closeBatchWriteAsync } = useCloseBatch(batchId);
  const onClickHandler = async (e: any) => {
    await closeBatchWriteAsync?.();
  };
  return (
    <button
      style={{ border: '1px solid white', background: 'red' }}
      onClick={onClickHandler}
    >
      Close {batchId}
    </button>
  );
};

const LoveSauceProgramBatches = () => {
  const { loveSaucePrograms } = useGetAllLoveSaucePrograms();
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
      <h1>LOVE SAUCE PROGRAM BATCHES</h1>
      <TableContainer>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th>Batch ID</Th>
              <Th>Start At</Th>
              <Th>End At</Th>
              <Th>Participants</Th>
              <Th>Close</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loveSaucePrograms.map((each: any) => {
              return (
                <Tr key={each.batchId}>
                  <Td>{each.batchId}</Td>
                  <Td>{each.startAt}</Td>
                  <Td>{each.endAt}</Td>
                  <ParticipantsRow batchId={each.batchId} />
                  <CloseBatch batchId={each.batchId} />
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LoveSauceProgramBatches;
