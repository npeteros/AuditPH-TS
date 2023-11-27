import { handlers } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const { GET: AuthGET, POST } = handlers;
export { POST };

// Showcasing advanced initialization in Route Handlers
export async function GET(request: NextRequest) {
    // Do something with request
    const user = await auth();
    if (user) {
        const response = await AuthGET(request);
        // Do something with response
        return response;
    }
}
