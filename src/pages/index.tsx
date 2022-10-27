import React, { Suspense } from 'react';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

//Dynamic import NextJS with named exported component
//nextjs.org/docs/advanced-features/dynamic-import
const CreateLinkForm = dynamic(() =>
    import('../components/CreateLinkForm').then(
        (module) => module.CreateLinkForm
    )
);

const Home: NextPage = () => {
    return (
        <Suspense fallback={<div>Loading ...</div>}>
            <CreateLinkForm />
        </Suspense>
    );
};
export default Home;
