'use server';

import { signOut } from '@/lib/auth';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
    await signOut({
        redirect: true,
        redirectTo: '/'
    });
    return NextResponse.json({ status: 201 });
}
