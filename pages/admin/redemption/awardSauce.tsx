//  We going to use this page to retrieve information of who to drop the sauce NFT to

//https://abhwuvqbjnxuwdbqusiz.supabase.co/storage/v1/object/public/hashtank/sauce/json/0.json
import useMintSauceToUsers from '@/hooks/admin/redemption/useMintSauceToUsers';
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
import { useToast } from '@chakra-ui/react';
import useIsSauceIdInRegistry from '@/hooks/admin/redemption/useIsSauceIdInRegistry';

const FishSauceContentRow = ({ content }: any) => {
  const [data, setData] = useState([]);

  async function init() {
    let cloned = [];
    for (let i = 0; i < content.length; i++) {
      const res = await fetch(content[i]);
      const metadata = await res.json();
      cloned.push(metadata);
    }
    // @ts-ignore
    setData(cloned);
  }

  useEffect(() => {
    content && data.length === 0 && init();
  }, [content]);

  return (
    <Td display={'flex'}>
      {data.map((each: any, i: number) => (
        <img
          style={{ height: 30, width: 30 }}
          key={i}
          src={each.image}
          alt={'test'}
        />
      ))}
    </Td>
  );
};

const MetadataRow = ({ metadataUrl, isGenerating }: any) => {
  const [data, setData] = useState({
    image: '',
  });
  const [isOpen, setIsOpen] = useState(false);

  async function init() {
    const res = await fetch(metadataUrl);
    const metadata = await res.json();
    setData(metadata);
  }

  useEffect(() => {
    metadataUrl && !data.image && init();
  }, [metadataUrl]);

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
        {isGenerating ? 'loading...' : 'View metadata'}
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

const BottleIdRow = ({ bottleId }: any) => {
  const { isInRegistry } = useIsSauceIdInRegistry(BigInt(bottleId));
  return (
    <Td>
      {bottleId} {isInRegistry ? 'yes' : 'no'}
    </Td>
  );
};

const AwardSauce = () => {
  const { validSauceBottleRequests, mintSauceToWinnersWallet, sauceUrls } =
    useMintSauceToUsers();
  // console.log('VALID SAUCE BOTTLE REQUESTS', validSauceBottleRequests);
  const toast = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

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
      <h1>Sauce Requests</h1>
      <TableContainer>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th>Bottle ID</Th>
              <Th>Fish Content</Th>
              <Th>Sauce Metadata</Th>
              <Th isNumeric>Buyback Price</Th>
              <Th isNumeric>Winner</Th>
            </Tr>
          </Thead>
          <Tbody>
            {validSauceBottleRequests.map((each: any, i: number) => {
              return (
                <Tr key={each.bottleId}>
                  <BottleIdRow bottleId={each.bottleId} />
                  <FishSauceContentRow content={each.fishContent} />
                  <MetadataRow
                    isGenerating={isGenerating}
                    metadataUrl={sauceUrls[i]}
                  />
                  <Td isNumeric>{each.buyBackPrice} SHELL</Td>
                  <Td>{each.winner}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

      <button
        onClick={mintSauceToWinnersWallet}
        style={{ border: '1px solid white', background: 'red', marginTop: 10 }}
      >
        {isGenerating ? 'wait...' : 'Mint Sauces'}
      </button>
    </div>
  );
};

export default AwardSauce;
