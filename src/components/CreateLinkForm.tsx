import React, { Suspense, useCallback, useState } from 'react';
import { z } from 'zod';
import { getRandom } from '../utils/helper';
import { trpc } from '../utils/trpc';
import { LoadingButton } from './LoadingButton';
import { Result } from './Result';

export const inputType = z.string().url();

export const CreateLinkForm = () => {
    const [input, setInput] = useState<z.infer<typeof inputType>>('');

    const createShortLink = trpc.createShortLink.useMutation();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const inputValue = inputType.parse(input);
        if (inputValue) {
            const randomSlug = getRandom();
            createShortLink.mutate({
                url: input,
                slug: randomSlug,
            });
        }
        setInput('');
        return;
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
                        className={`cursor-pointer rounded-lg bg-fuchsia-500 p-2 font-bold text-stone-800 disabled:cursor-not-allowed disabled:bg-fuchsia-800 disabled:opacity-75  ${
                            createShortLink.isLoading && `hidden`
                        }`}
                        disabled={
                            input.length === 0 || createShortLink.isLoading
                        }
                    />
                    {createShortLink.isLoading && <LoadingButton />}
                </form>
                <Suspense fallback={<div>Loading...</div>}>
                    <div className={`${createShortLink.isLoading && `hidden`}`}>
                        <Result
                            longUrl={createShortLink.data?.url}
                            shortLink={createShortLink.data?.slug}
                        />
                    </div>
                </Suspense>
            </div>
        </main>
    );
};
