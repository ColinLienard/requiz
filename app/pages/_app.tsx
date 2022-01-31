import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { PopupProvider } from 'react-customizable-popup';
import Navbar from '../components/Common/Navbar/Navbar';
import '../styles/_reset.scss';
import '../styles/_global.scss';

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => (
  <SessionProvider session={session}>
    <PopupProvider root="#__next">
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </PopupProvider>
  </SessionProvider>
);

export default App;
