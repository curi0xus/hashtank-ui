import React from 'react';
import { Box } from '@chakra-ui/react';
import FilterLayout from '@/components/General/Filter';
import InBreedingProgramFish from '@/components/General/Modal/Variants/ProgramEngagement/InBreedingProgram';
import ProgramSuccesFish from '@/components/General/Modal/Variants/ProgramEngagement/ProgramSuccess';
import ProgramFailureFish from '@/components/General/Modal/Variants/ProgramEngagement/ProgramFailed';
import useGetOffsprings from '@/hooks/LoveSauceProgram/useGetOffsprings';
import useLoveSauceProgram from '@/hooks/LoveSauceProgram/useLoveSauceProgram';
import useGetFishInLoveSauceProgram from '@/hooks/LoveSauceProgram/useGetFishInLoveSauceProgram';
import scrollToId from '@/util/scrollToId';
import useGetTokenMetas from '@/hooks/admin/loveSauceProgram/useGetTokenMetas';

const SORT_FILTERS = [['name', 'name 2', 'name 3']];

const FILTER_OPTIONS = [
  ['mutation', 'mutation 2', 'mutation 3'],
  ['umami', 'umami 2', 'umami 3'],
];

const ProgramEngagement = () => {
  const { currentLoveSauceProgramId } = useLoveSauceProgram();
  const { mintedOffsprings, failedParentIds } = useGetOffsprings(
    currentLoveSauceProgramId
  );
  const { fishInLoveSauceProgram, distributeAtTs } =
    useGetFishInLoveSauceProgram(Number(currentLoveSauceProgramId));

  function onLinkClick(e: any) {
    e.preventDefault();
    e.stopPropagation();
    scrollToId('selectBroodFish');
  }

  const { tokenMetasMap } = useGetTokenMetas(
    fishInLoveSauceProgram?.map((each: bigint) => each?.toString() || '0')
  );

  return (
    <Box
      mt={['0vh', '10vh', '', '', '0']}
      p={['0 7vw 0 7vw', '10vh 16vw 0vh 16vw']}
    >
      <FilterLayout
        title='program engagement'
        sortFilters={SORT_FILTERS}
        filters={FILTER_OPTIONS}
        items={() => (
          <>
            {mintedOffsprings?.map((nftid: bigint, i: number) => {
              return <ProgramSuccesFish nftId={nftid.toString()} key={i} />;
            })}
            {failedParentIds.map((nftid: bigint, i: number) => {
              return <ProgramFailureFish nftId={nftid.toString()} key={i} />;
            })}
            {fishInLoveSauceProgram.map((nftid: bigint, i: number) => {
              return (
                <InBreedingProgramFish
                  metadata={tokenMetasMap[nftid.toString()]}
                  distributeAtTs={distributeAtTs}
                  nftId={nftid.toString()}
                  key={i}
                />
              );
            })}
            {!mintedOffsprings?.length &&
              !failedParentIds?.length &&
              !fishInLoveSauceProgram?.length && (
                <p>
                  No love here.{' '}
                  <a
                    onClick={onLinkClick}
                    style={{ color: '#FF530D', textDecoration: 'underline' }}
                    // href='#loveSauceProgramEnrolment'
                  >
                    Enter your fish into the program now!
                  </a>
                </p>
              )}
          </>
        )}
      />
    </Box>
  );
};

export default ProgramEngagement;
