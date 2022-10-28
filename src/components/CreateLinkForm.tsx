import React, { Suspense, useState } from 'react';
import { z } from 'zod';
import { getRandom } from '../utils/helper';
import { trpc } from '../utils/trpc';
import { LoadingButton } from './LoadingButton';
import { ShortLinkDisplay } from './ShortLinkDisplay';

export const inputType = z.string().url();

type From = {
    url: z.infer<typeof inputType>;
    slug: string;
};

export const CreateLinkForm = () => {
    const [input, setInput] = useState<From>({ url: '', slug: '' });
    const createShortLink = trpc.createShortLink.useMutation();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const inputValue = inputType.parse(input.url);
        if (inputValue) {
            const randomSlug = getRandom();
            return createShortLink.mutate({
                ...input,
                slug: randomSlug,
            });
        }
    };
    //useCallback to add focus state to the input when component first mount
    //Can also use useEffect combine with useRef here but I don't want to deal with useEffect
    const urlInput = useCallback(
        (element: HTMLInputElement) => (element ? element.focus() : null),
        []
    );
    return (
        <main className="grid h-screen w-screen place-content-center bg-slate-900">
            <div className="flex w-[90vw] flex-col items-center gap-4">
                <form
                    className="flex w-full flex-col items-center gap-4"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <input
                        className="form-input w-full rounded-lg"
                        placeholder="Enter Link"
                        ref={urlInput}
                        value={input.url}
                        onChange={(e) =>
                            setInput({ ...input, url: e.target.value })
                        }
                        required
                    ></input>
                    <input
                        type="submit"
                        value="Get Short Link"
                        title="Get Short Link"
                        className={`cursor-pointer rounded-lg bg-fuchsia-500 p-2 font-bold text-stone-800 disabled:cursor-not-allowed disabled:opacity-75 ${
                            createShortLink.isLoading && `hidden`
                        }`}
                        disabled={
                            input.url.length === 0 || createShortLink.isLoading
                        }
                    />
                    {createShortLink.isLoading && <LoadingButton />}
                </form>
                <Suspense fallback={<div>Loading...</div>}>
                    <ShortLinkDisplay
                        shortLink={
                            createShortLink.data?.slug
                                ? createShortLink.data.slug
                                : undefined
                        }
                    />
                </Suspense>
            </div>
        </main>
    );
};
