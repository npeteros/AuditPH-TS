"use server";

import { signOut } from "@/lib/auth";

export async function SignOut() {
    await signOut({ redirect: false, redirectTo: '/login' })
        .then(() => console.log(1241))
}