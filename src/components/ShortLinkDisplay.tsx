import React from 'react';
import copy from 'copy-to-clipboard';
type Props = {
    shortLink: string | undefined;
};

export const ShortLinkDisplay = ({ shortLink }: Props) => {
    // TODO: Update method so this app can still work if we deploy on other platform rather than VERCEl
    // ! After deploy, it might only display the short link after submit if this app is deploy on VERCEL, because the env will work due to Vercel set up.
    const url = process.env.VERCEL_URL
        ? `${process.env.VERCEL_URL}/${shortLink}`
        : `http://localhost:${process.env.PORT || 3000}/${shortLink}`;

    if (!shortLink) return <></>;
    return (
        <div className="flex flex-col items-center gap-4 text-center text-white">
            <h2 className="text-xl">Shorten Link:</h2>
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-lg font-bold ring-2 ring-fuchsia-700"
            >
                {url}
            </a>
            <button
                className="w-32 rounded-lg bg-fuchsia-500 p-2 text-stone-800"
                onClick={() => copy(url)}
                type="button"
            >
                Copy
            </button>
        </div>
    );
};
