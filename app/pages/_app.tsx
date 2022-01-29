import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '../styles/_reset.scss';
import '../styles/_global.scss';
import { PopupProvider } from 'react-customizable-popup';

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => (
  <SessionProvider session={session}>
    <PopupProvider root="#__next">
      <Component {...pageProps} />
    </PopupProvider>
  </SessionProvider>
);

export default App;
