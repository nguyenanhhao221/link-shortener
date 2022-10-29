import React, { Suspense, useCallback, useState } from 'react';
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
    const [input, setInput] = useState('');
    const [shortLink, setShortLink] = useState('');
    const createShortLink = trpc.createShortLink.useMutation();

    //We have to use enabled: false and other options because this query is base in the input.url. If we enable it by default, every time a user type a character in the input the component render and this query will automatically refetch and will cause error because the input might not be an valid url.
    const findShortLink = trpc.findShortLinkExist.useQuery(
        {
            url: input,
        },
        {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            enabled: false,
        }
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const inputValue = inputType.parse(input);
        if (inputValue) {
            const response = await findShortLink.refetch();

            if (response.isSuccess && response.data?.slug) {
                return setShortLink(response.data.slug);
            }

            const randomSlug = getRandom();
            createShortLink.mutate({
                url: input,
                slug: randomSlug,
            });
            if (createShortLink.isSuccess && createShortLink.data) {
                return setShortLink(createShortLink.data.slug);
            }
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
                        className="autofocus form-input w-full rounded-lg"
                        placeholder="Enter Link"
                        ref={urlInput}
                        type="url"
                        value={input}
                        onChange={(e) => {
                            return setInput(e.target.value);
                        }}
                        required
                    ></input>
                    <input
                        type="submit"
                        value="Shorten Link"
                        title="Shorten Link"
                        className={`cursor-pointer rounded-lg bg-fuchsia-500 p-2 font-bold text-stone-800 disabled:cursor-not-allowed disabled:bg-fuchsia-800 disabled:opacity-75 ${
                            findShortLink.isFetching && `hidden`
                        } ${createShortLink.isLoading && `hidden`}`}
                        disabled={
                            input.length === 0 || createShortLink.isLoading
                        }
                    />
                    {findShortLink.isFetching && <LoadingButton />}
                    {createShortLink.isLoading && <LoadingButton />}
                </form>
                <Suspense fallback={<div>Loading...</div>}>
                    <ShortLinkDisplay longUrl={input} shortLink={shortLink} />
                </Suspense>
            </div>
        </main>
    );
};
