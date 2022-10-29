import { GetServerSideProps } from 'next';
import React from 'react';
import { prisma } from '../db/client';

//! Will redirect base on what we get from getServerSideProps
const index = () => {
    return <div>index</div>;
};

export default index;

export const getServerSideProps: GetServerSideProps = async ({
    query,
    res,
}) => {
    const { slug } = query;
    if (!slug || typeof slug !== 'string') return { notFound: true };
    if (slug && slug.length > 0) {
        const data = await prisma.shortLink.findFirst({
            where: {
                slug: {
                    equals: slug,
                },
            },
        });
        if (data) {
            res.setHeader(
                'Cache-Control',
                'public, s-maxage=1000, stale-while-revalidate=59'
            );
            return { redirect: { destination: data.url, permanent: false } };
        }
    }
    return { notFound: true };
};
