
import ProfileLayout from "@/components/ProfileLayout";
import { Provider } from "@/components/Provider";
import { auth } from "@/lib/auth";

export default async function Page({ children }: { children: React.ReactNode }) {
    const session = await auth();
    return (
        <Provider session={session}>
            <ProfileLayout>
                {children}
            </ProfileLayout>
        </Provider>
    );
}