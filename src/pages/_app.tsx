import '../styles/globals.css';
import type { AppType } from 'next/app';
import Head from 'next/head';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { trpc } from '../utils/trpc';

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <title>Link Lee - Shorten Link</title>
            </Head>
            <ReactQueryDevtools initialIsOpen={false} />
            <Component {...pageProps} />
        </>
    );
};

export default trpc.withTRPC(MyApp);
