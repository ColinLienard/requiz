import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '../styles/_reset.scss';
import '../styles/_global.scss';

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => (
  <SessionProvider session={session}>
    <Component {...pageProps} />
  </SessionProvider>
);

export default App;
