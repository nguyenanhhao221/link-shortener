import { useRouter } from 'next/router';

export default function Custom404() {
    const router = useRouter();
    return (
        <div className="grid h-screen w-screen place-content-center gap-4 bg-black">
            <h1 className="text-white">404 - Page Not Found</h1>

            <button
                className="rounded-xl bg-fuchsia-500 p-1 text-white"
                type="button"
                onClick={() => router.push('/')}
            >
                Back Home
            </button>
        </div>
    );
}
