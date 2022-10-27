import { useQuery } from '@tanstack/react-query';
import { url } from 'inspector';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { z } from 'zod';
import { getBaseUrl } from '../utils/request';

type From = {
    url: string;
    slug: string;
};

export const inputType = z.string().url();

export const CreateLinkForm = () => {
    const [input, setInput] = useState<From>({ url: '', slug: '' });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const inputValue = inputType.parse(input.url);
        if (inputValue) {
            const randomSlug = nanoid(10);
            const url = getBaseUrl();
            console.log(`${url}/${randomSlug}`);
            return;
        }
        // const {} = useQuery(['getShortLink'], async () => {
        //     const response = await fetch('/api/');
        // });
    };
    return (
        <main className="grid h-screen w-screen place-content-center bg-slate-900">
            <div className="w-[90vw]">
                <form className="flex gap-4" onSubmit={(e) => handleSubmit(e)}>
                    <input
                        className="form-input w-full rounded-lg"
                        placeholder="Enter Link"
                        type={'url'}
                        value={input.url}
                        onChange={(e) =>
                            setInput({ ...input, url: e.target.value })
                        }
                    ></input>
                    <input
                        type="submit"
                        className="rounded-lg bg-fuchsia-500 p-2 font-bold text-stone-800"
                        disabled={input.url.length === 0}
                    />
                </form>
            </div>
        </main>
    );
};
