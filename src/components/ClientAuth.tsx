"use client";

import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";

export default async function ClientAuth({ children }: React.PropsWithChildren) {
    const session = await auth();
    if (session?.user)
        session.user = {
            email: session.user.email,
            name: session.user.name
        };

    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    );
}