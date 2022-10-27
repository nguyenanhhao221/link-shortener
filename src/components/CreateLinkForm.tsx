import React, { useState } from 'react';
import { z } from 'zod';
import { getRandom } from '../utils/helper';
import { trpc } from '../utils/trpc';
import { LoadingButton } from './LoadingButton';

export const inputType = z.string().url();

type From = {
    url: z.infer<typeof inputType>;
    slug: string;
};

export const CreateLinkForm = () => {
    const [input, setInput] = useState<From>({ url: '', slug: '' });
    const createShortLink = trpc.createShortLink.useMutation();
    const getShortLink = trpc.getShotLinks.useQuery();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const inputValue = inputType.parse(input.url);
        if (inputValue) {
            const randomSlug = getRandom();
            const response = createShortLink.mutate({
                ...input,
                slug: randomSlug,
            });
        }
    };

    return (
        <main className="grid h-screen w-screen place-content-center bg-slate-900">
            <div className="w-[90vw]">
                <form
                    className="flex flex-col items-center gap-4"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <input
                        className="form-input w-full rounded-lg"
                        placeholder="Enter Link"
                        type={'url'}
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
            </div>
        </main>
    );
};
