"use client";

import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";

export default async function ClientAuth({ children }: React.PropsWithChildren) {
    const session = await auth();
    if (session?.user)
        session.user = {
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
        };

    return (
        <SessionProvider session={session}>
            { children }
        </SessionProvider>
    );
}