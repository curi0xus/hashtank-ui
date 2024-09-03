//  We going to use this page to retrieve information of who to drop the sauce NFT to

//https://abhwuvqbjnxuwdbqusiz.supabase.co/storage/v1/object/public/hashtank/sauce/json/0.json
import useMintBottleToUsers from '@/hooks/admin/redemption/useMintBottleToWinners';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Code,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const MetadataRow = ({ metadataUrl }: any) => {
  const [data, setData] = useState({
    image: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    async function init() {
      const res = await fetch(metadataUrl);
      const metadata = await res.json();
      setData(metadata);
    }
    metadataUrl && init();
  }, []);
  return (
    <Td>
      {data?.image && (
        <Image alt='sauce' height={100} width={100} src={data.image} />
      )}
      <p
        style={{
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        View metadata
      </p>
      {isOpen && (
        <Code
          style={{
            textDecoration: 'underline',
            maxWidth: 300,
            overflow: 'scroll',
          }}
        >
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Code>
      )}
    </Td>
  );
};

const AwardSauce = () => {
  const { bottleDrops, isLoading, dropBottleToWinnersWallet } =
    useMintBottleToUsers();
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
      <h1>AWARD BOTTLE</h1>
      <TableContainer>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th>Original Sauce ID</Th>
              <Th>Winner</Th>
              <Th>Bottle Metadata</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bottleDrops.map((each: any) => {
              return (
                <Tr key={each.originalTokenId}>
                  <Td>{each.originalTokenId}</Td>
                  <Td>{each.winner}</Td>
                  <MetadataRow metadataUrl={each.bottleMetadataUrl} />
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <button
        onClick={dropBottleToWinnersWallet}
        style={{ border: '1px solid white', background: 'red', marginTop: 10 }}
      >
        Drop Bottles
      </button>
    </div>
  );
};

export default AwardSauce;
