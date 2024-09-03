import React from 'react';
import PageTitle from './PageTitle';
import SauceFactoryIntro from './SauceFactoryIntro';
import SelectFishToSauce from './SelectFishToSauce';
import dynamic from 'next/dynamic';

const BatchSauce = dynamic(() => import('./BatchSauce'), {
  ssr: false,
});
import Fishery from './Fishery';

const SauceFactoryPageContent = () => {
  return (
    <main
      style={{
        height: 'fit-content',
        backgroundColor: '#373A49',
        paddingBottom: '10vh',
      }}
      id='sauce-factory-main'
    >
      <PageTitle />
      <SauceFactoryIntro />
      <BatchSauce />
      <SelectFishToSauce />
      {/* <Fishery /> */}
    </main>
  );
};

export default SauceFactoryPageContent;
