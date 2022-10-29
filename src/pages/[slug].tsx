import { GetServerSideProps } from 'next';
import React from 'react';
import { getBaseUrl } from '../utils/trpc';

//! Will redirect base on what we get from getServerSideProps
const index = () => {
    return <div>index</div>;
};

export default index;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { slug } = context.query;

    const baseUrl = getBaseUrl(); //get baseUrl depends on when in dev mode or in production
    if (slug && slug.length > 0) {
        //if slug exist fetch to our api and api will check in our database
        const endpoint = `${baseUrl}/api/get-url/${slug}`;
        const data = await fetch(endpoint);
        if (data.status === 404) {
            return {
                notFound: true,
            };
        }
        const jsonRes = await data.json();
        return {
            redirect: {
                destination: jsonRes.url,
                permanent: false,
            },
        };
    }

    return { notFound: true };
};
