"use server";

import { signOut } from "@/lib/auth";

export async function SignOut() {
    await signOut({ redirect: true, redirectTo: '/' })
        .then(() => console.log(1241))
}