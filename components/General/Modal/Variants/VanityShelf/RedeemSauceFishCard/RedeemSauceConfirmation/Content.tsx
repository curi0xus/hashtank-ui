import ModalTemplate from '@/components/General/Modal/CardModal';
import { HStack, Box, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import EmptySauce from 'public/static/images/VanityShelf/EmptyBottle.webp';
import ToTheRight from 'public/static/icons/ToTheRight.png';
import Danger from 'public/static/icons/Danger.png';
import { SauceImageMapper } from '../Content';
import useHashTankAccount from '@/hooks/useHashtankAccount';
import { formatTime } from '@/util/formatTime';
import { formatDate } from '@/util/formatDate';

export const SpecialContent = ({ sauceName }: any) => {
  return (
    <HStack w='90%' maxHeight={'10%'} pt='50px' pb='30px' display='flex'>
      <Box
        height='30vh'
        // height={[150, 288]}
        flex={2}
      >
        <Image
          height={100}
          width={100}
          style={{ margin: 'auto', width: 'auto', height: '100%' }}
          // @ts-ignore
          src={SauceImageMapper[sauceName]}
          alt='Sauce'
        />
      </Box>
      <VStack flex={1}>
        <Box>
          <Image
            style={{ margin: 'auto', width: '100%', height: 'auto' }}
            src={Danger}
            alt='Danger'
          />
        </Box>
        <Box>
          <Image
            style={{ margin: 'auto', width: '100%', height: 'auto' }}
            src={ToTheRight}
            alt='Right hand side'
          />
        </Box>
      </VStack>
      <Box
        height='30vh'
        flex={2}
        // height={[150, 288]}
      >
        <Image
          style={{
            margin: 'auto',
            width: 'auto',
            height: '100%',
            // maxHeight: 150,
          }}
          src={EmptySauce}
          alt='Empty Sauce'
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
  CallToAction,
  sauceId,
  sauceMetadata,
  ...props
}: any) => {
  const { address } = useHashTankAccount();
  const { image, attributes, name, description, createdAt } = sauceMetadata;
  const resaleValue = attributes?.find(
    (each: any) => each.trait_type === 'resale_value'
  )?.value;
  const ACTIONS = [
    {
      actionText: 'resale price',
      amount: resaleValue,
      ts: {
        content: `${formatDate(
          new Date(createdAt).toISOString()
        )} / ${formatTime(new Date(createdAt).toISOString())}`,
        color: 'black',
      },
      walletAddress: address,
    },
  ];
  return (
    <ModalTemplate
      CallToAction={CallToAction}
      SpecialContent={(props: any) => (
        <SpecialContent {...props} sauceName={name} />
      )}
      specialColor={specialColor}
      hasNoHistory={hasNoHistory}
      actions={ACTIONS}
      title={name}
      hasFishTraits
      textColor={textColor}
      borderColor={borderColor}
    />
  );
};

export default Content;
