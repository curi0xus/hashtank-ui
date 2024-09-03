import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/General/Layout';
import { extendTheme, Theme } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import ScrollContainer from '@/components/General/ScrollContainer';
import { config } from '../wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { WagmiProvider } from 'wagmi';
import { WagmiProvider } from '@privy-io/wagmi';
import NoSSR from 'react-no-ssr';
import { useEffect, Suspense, useState } from 'react';
import ErrorBoundary from '@/helpers/ErrorBoundary';
// import HashTankProvider from '@/provider';'
import { PrivyProvider } from '@privy-io/react-auth';
import { hashTankChain } from '../wagmi';
// 2. Set up a React Query client.
const queryClient = new QueryClient();
import { store } from '@/redux/store';
import { Provider } from 'react-redux';

// import { addRpcUrlOverrideToChain } from '@privy-io/react-auth';

// const mainnetOverride = addRpcUrlOverrideToChain(
//   hashTankChain,
//   'http://localhost:8011'
// );

const mainnetOverride = hashTankChain;
// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  components: {
    Stepper: {
      baseStyle: {
        indicator: {
          borderColor: '#FF530D',
          bg: '#FF530D',
          '&[data-status=active]': {
            borderWidth: '#FF530D',
            borderColor: '#FF530D',
          },
          '&[data-status=complete]': {
            bg: '#FF530D',
            color: '#FF530D',
          },
        },
        separator: {
          bg: '#FF530D',
          '&[data-status=complete]': {
            bg: '#FF530D',
          },
        },
      },
    },
    Progress: {
      baseStyle: {
        filledTrack: {
          bg: '#4AF8FF',
        },
      },
    },
  },
  colors: {
    brand: {
      900: '#FF530D',
      800: '#212431',
      700: '#4AF8FF',
      600: '#3D4B65',
    },
  },
  fonts: {
    body: 'Roboto Mono, monospace',
  },
  fontSizes: {
    xxs: '10px',
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '32px',
    '4.5xl': '36px',
    '5xl': '48px',
    '6xl': '64px',
  },
  breakpoints: {
    // base: '0px',
    // sm: '320px',
    // md: '768px',
    // lg: '960px',
    // xl: '1200px',
    '2xl': '1440px',
    '3xl': '2560px',
    '4xl': '3840px',
    '5xl': '5120px',
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
});

export default function App({ Component, pageProps, router }: AppProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // useEffect(() => {
  //   // @ts-ignore
  //   if (window && window?.ethereum) {
  //     // @ts-ignore
  //     window.ethereum.on('accountsChanged', async (accounts) => {
  //       console.log('accounts', accounts);
  //     });
  //   }
  // }, []);
  const scrollIntertia = 70;

  return router.route === '/about' ? (
    <ChakraProvider theme={theme}>
      <Suspense>
        <ErrorBoundary
          fallback={<p>There was an error somewhere in the App</p>}
        >
          <NoSSR>
            <Component {...pageProps} />
          </NoSSR>
        </ErrorBoundary>
      </Suspense>
    </ChakraProvider>
  ) : (
    <PrivyProvider
      config={{
        defaultChain: mainnetOverride,
        supportedChains: [mainnetOverride],
        appearance: {
          theme: 'dark',
        },
      }}
      appId={'clta0sokp08l7nsuyhqxuidke' || ''}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          <ChakraProvider theme={theme}>
            <Provider store={store}>
              <Suspense>
                <ErrorBoundary
                  fallback={<p>There was an error somewhere in the App</p>}
                >
                  {/* <PrivyProvider
                  config={{
                    defaultChain: mainnetOverride,
                    supportedChains: [mainnetOverride],
                    appearance: {
                      theme: 'dark',
                    },
                  }}
                  appId={'clta0sokp08l7nsuyhqxuidke' || ''}
                > */}
                  {/* <QueryClientProvider client={queryClient}>
                  <WagmiProvider config={config}> */}
                  {mounted && (
                    <>
                      {/* <ScrollContainer scrollIntertia={scrollIntertia}> */}
                      {/* <HashTankProvider> */}
                      <Layout>
                        <NoSSR>
                          <Component {...pageProps} />
                        </NoSSR>
                      </Layout>
                      {/* </HashTankProvider> */}
                      {/* </ScrollContainer> */}
                    </>
                  )}
                  {/* </WagmiProvider>
                </QueryClientProvider> */}
                  {/* </PrivyProvider> */}
                </ErrorBoundary>
              </Suspense>
            </Provider>
          </ChakraProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
