import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    if (req.url.startsWith('/api/get-url')) {
        console.log('returning early');
        return;
    }
    const random = nanoid();

    const res = NextResponse.next();

    //Set up cookies
    res.cookies.set('vercel', random, { sameSite: 'strict', secure: true });
}
