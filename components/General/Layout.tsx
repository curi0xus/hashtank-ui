import React from 'react';
import NavHeader from './Navheader';
import Footer from './Footer';
import { useRouter } from 'next/router';

const Layout = ({ children }: any) => {
  const { pathname } = useRouter();
  return (
    <div>
      <NavHeader />
      {children}
      {pathname !== '/' && <Footer />}
    </div>
  );
};

export default Layout;
