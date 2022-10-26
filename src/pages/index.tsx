import React from 'react';
import type { NextPage } from 'next';
import { useState } from 'react';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';

export const inputType = z.string().url();
const Home: NextPage = () => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const inputValue = inputType.parse(input);

        const {} = useQuery(['getShortLink'], async () => {
            const response = await fetch('/api/');
        });
    };
    return (
        <main className="grid h-screen w-screen place-content-center bg-slate-900">
            <div className="w-[90vw]">
                <form className="flex gap-4" onSubmit={(e) => handleSubmit(e)}>
                    <input
                        className="form-input w-full rounded-lg"
                        placeholder="Enter Link"
                        type={'url'}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    ></input>
                    <input
                        type="submit"
                        className="rounded-lg bg-fuchsia-500 p-2 font-bold text-stone-800"
                    />
                </form>
            </div>
        </main>
    );
};

export default Home;
