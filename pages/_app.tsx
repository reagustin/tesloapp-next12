import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react";
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SWRConfig } from 'swr';

import { lightTheme } from '../themes';
import { AuthProvider, CartProvider, UiProvider } from '../context';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {

  /* const [showChild, setShowChild] = useState(false);
    useEffect(() => {
        setShowChild(true);
    }, []);
    if (!showChild) {
        return <></>;
  } */

  return (
    <SessionProvider>
      <SWRConfig 
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <AuthProvider>
          <CartProvider>
            <UiProvider>
              <ThemeProvider theme={ lightTheme}>
                  <CssBaseline />
                  <Component {...pageProps} />
              </ThemeProvider>
            </UiProvider>
          </CartProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  )
}

export default MyApp
