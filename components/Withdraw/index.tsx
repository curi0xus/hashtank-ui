import React from 'react';
import WithdrawIntro from './WithdrawIntro';
import WithdrawShell from './WithdrawShell';

const WithdrawShellContent = () => {
  return (
    <main
      style={{
        height: 'fit-content',
        backgroundColor: '#373A49',
        paddingBottom: '10vh',
      }}
    >
      <WithdrawIntro />
      <WithdrawShell />
    </main>
  );
};

export default WithdrawShellContent;
