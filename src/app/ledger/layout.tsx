import AuthLayout from "@/components/AuthLayout";
import { Provider } from "@/components/Provider";
import { auth } from "@/lib/auth";

export default async function Page({ children }: { children: React.ReactNode }) {
    const session = await auth();
    return (
        <Provider session={session}>
            <AuthLayout>
                {children}
            </AuthLayout>
        </Provider>
    );
}