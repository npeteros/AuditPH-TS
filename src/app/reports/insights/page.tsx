"use client";

import { fetchTransactionSumByBudgetType } from "@/lib/data"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    
    const { data: session } = useSession();
    if (!session) redirect('/login');

    const [data, setData] = useState([])

    useEffect(() => {
        const userEmail = session?.user?.email
        const encodedValue = encodeURIComponent(String(userEmail));
        async function insightsData() {
            try {
                fetch(`/api/insightsData?email=${encodedValue}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        setData(data.data)
                    })
            } catch (error) {
                console.error('Error fetching Transaction Data:', error);
            }
        }

        insightsData()
    }, [])
    
    return (
        <div>
            Hello world!
        </div>
    )
}