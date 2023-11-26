"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

export const Provider = ({
    children,
    session,
}: React.PropsWithChildren<{ session: Session | null }>) => {
    return <SessionProvider session={session}>{children}</SessionProvider>;
};