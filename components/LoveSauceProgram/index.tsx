import React from 'react';
import PageTitle from './PageTitle';
import LoveSauceProgramIntroduction from './LoveSauceProgramIntroduction';
import BroodFish from './BroodFish';
// import Nursery from './Nursery';
import ProgramEngagement from './ProgramEngagement';

const AquariumPageContent = () => {
  return (
    <main
      style={{
        height: 'fit-content',
        backgroundColor: '#373A49',
        paddingBottom: '10vh',
      }}
      id='love-sauce-program-main'
    >
      <PageTitle />
      <LoveSauceProgramIntroduction />
      <BroodFish />
      {/* <Nursery /> */}
      <ProgramEngagement />
    </main>
  );
};

export default AquariumPageContent;
