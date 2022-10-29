import React from 'react';
import copy from 'copy-to-clipboard';
type Props = {
    shortLink: string | undefined;
    longUrl: string | undefined;
};

export const Result = ({ shortLink, longUrl }: Props) => {
    // TODO: Update method so this app can still work if we deploy on other platform rather than VERCEl
    // ! After deploy, it might only display the short link after submit if this app is deploy on VERCEL, because the env will work due to Vercel set up.
    const url = process.env.NEXT_PUBLIC_VERCEL_URL
        ? `${process.env.NEXT_PUBLIC_VERCEL_URL}/${shortLink}`
        : `http://localhost:${process.env.PORT || 3000}/${shortLink}`;

    if (!shortLink) return <></>;
    //Query to Find if that long url already exist in database, if it does we will return the short url that already created before.

    return (
        <div className="flex w-full flex-col items-center gap-4 text-center text-white">
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="md:text-md break-all p-2 text-sm font-bold tracking-wider ring-2 ring-fuchsia-700"
            >
                {url}
            </a>
            <button
                className="w-32 rounded-lg bg-fuchsia-500 p-2 font-bold text-stone-800"
                onClick={() => copy(url)}
                type="button"
                title="Copy"
                disabled={!url}
            >
                Copy
            </button>
            <h2 className="text-xl">Original Link:</h2>
            <div className=" md:text-md break-all p-2 text-sm font-bold tracking-wider opacity-50 ring-2 ring-fuchsia-700">
                {longUrl}
            </div>
        </div>
    );
};
