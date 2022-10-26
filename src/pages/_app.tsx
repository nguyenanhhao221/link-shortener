import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
    DehydratedState,
} from '@tanstack/react-query';
import { useState } from 'react';

function MyApp({
    Component,
    pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <>
            <Head>
                <title>Link Lee - Shorten Link</title>
            </Head>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <Component {...pageProps} />
                </Hydrate>
            </QueryClientProvider>
        </>
    );
}

export default MyApp;
