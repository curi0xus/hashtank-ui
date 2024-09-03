import ModalTemplate from '@/components/General/Modal/CardModal';
import { HStack, Box, VStack, Grid, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import Sauce from 'public/static/images/Home/sauce.webp';
import ToTheRight from 'public/static/icons/ToTheRight.png';
import Danger from 'public/static/icons/Danger.png';
import useSelectedFishIds from '@/hooks/SauceFactory/useSelectedFishIds';
import useFetchFishDetailsByIds from '@/new-hooks/fish/useFetchFishDetailsByIds';
import useFetchTokenMetas from '@/new-hooks/useFetchTokenMetas';

const SpecialContent = () => {
  const { selectedFishIds } = useSelectedFishIds();
  const fishDetailList = useFetchFishDetailsByIds(selectedFishIds);
  const listOfMetadataUrls =
    fishDetailList?.map((each: any) => each.metadata_url) || [];
  const tokenMetas = useFetchTokenMetas(listOfMetadataUrls);
  return (
    <HStack
      pl='30px'
      w='100%'
      maxHeight={'10%'}
      pt='30px'
      pb='30px'
      display='flex'
    >
      {tokenMetas.length === 1 && (
        <Box height={[100, 186]} flex={2}>
          <Image
            style={{ margin: 'auto', width: 'auto', height: '100%' }}
            src={tokenMetas[0].image}
            alt='More details fish'
          />
        </Box>
      )}
      {tokenMetas.length === 2 && (
        <Grid flex={2}>
          {tokenMetas.map((meta: any, i: number) => (
            <Box key={i} height={[100, 186]} flex={2}>
              <Image
                width={100}
                height={100}
                style={{ margin: 'auto', width: 'auto', height: '100%' }}
                src={meta.image}
                alt='More details fish'
              />
            </Box>
          ))}
        </Grid>
      )}
      {tokenMetas.length === 3 && (
        <Flex justify={'center'} flexWrap='wrap' flex={2}>
          {tokenMetas.map((meta: any, i: number) => (
            <Box key={i} w='50%'>
              <Image
                width={100}
                height={100}
                style={{ margin: 'auto', width: 'auto', height: '100%' }}
                src={meta.image}
                alt='More details fish'
              />
            </Box>
          ))}
        </Flex>
      )}
      {tokenMetas.length === 4 && (
        <Flex justify={'center'} flexWrap='wrap' flex={2}>
          {tokenMetas.map((meta: any, i: number) => (
            <Box key={i} w='50%'>
              <Image
                width={100}
                height={100}
                style={{ margin: 'auto', width: 'auto', height: '100%' }}
                src={meta.image}
                alt='More details fish'
              />
            </Box>
          ))}
        </Flex>
      )}
      {selectedFishIds.length === 5 && (
        <Flex justify={'center'} flexWrap='wrap' flex={2}>
          {tokenMetas.map((meta: any, i: number) => {
            if (i === 2) {
              return (
                <Flex key={i} w='100%'>
                  <Box flex={1}></Box>
                  <Box transform={'translateX(-50%)'} flex={1}>
                    <Image
                      width={100}
                      height={100}
                      style={{ margin: 'auto', width: 'auto', height: '100%' }}
                      src={meta.image}
                      alt='More details fish'
                    />
                  </Box>
                </Flex>
              );
            }
            return (
              <Box key={i} w='50%'>
                <Image
                  width={100}
                  height={100}
                  style={{ margin: 'auto', width: 'auto', height: '100%' }}
                  src={meta.image}
                  alt='More details fish'
                />
              </Box>
            );
          })}
        </Flex>
      )}
      <VStack flex={1}>
        <Box>
          <Image
            width={100}
            height={100}
            style={{ margin: 'auto', width: '100%', height: 'auto' }}
            src={Danger}
            alt='Danger'
          />
        </Box>
        <Box>
          <Image
            width={100}
            height={100}
            style={{ margin: 'auto', width: '100%', height: 'auto' }}
            src={ToTheRight}
            alt='Right hand side'
          />
        </Box>
      </VStack>
      <Box flex={2} height={[150, 288]}>
        <Image
          width={100}
          height={100}
          style={{
            margin: 'auto',
            width: 'auto',
            height: '100%',
            // maxHeight: 150,
          }}
          src={Sauce}
          alt='Sauce'
        />
      </Box>
    </HStack>
  );
};

const Content = ({
  textColor,
  hasNoHistory,
  borderColor,
  specialColor,
  ...props
}: any) => {
  return (
    <ModalTemplate
      SpecialContent={SpecialContent}
      specialColor={specialColor}
      hasNoHistory={hasNoHistory}
      title='saucing summary'
      hasSauceSummary
      textColor={textColor}
      borderColor={borderColor}
    />
  );
};

export default Content;
