import React from 'react';
import ShellIntroduction from './ShellIntroduction';
import ClaimShell from './ClaimShell';

const ClaimShellContent = () => {
  return (
    <main
      style={{
        height: 'fit-content',
        backgroundColor: '#373A49',
        paddingBottom: '10vh',
      }}
    >
      <ShellIntroduction />
      <ClaimShell />
    </main>
  );
};

export default ClaimShellContent;
