"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import ChartComponent from "./ChartComponent";

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
        <>
            <div className='w-8/12 mx-auto'>
                <p className='text-4xl md:text-6xl text-center text-lime-100 font-semibold mt-12 mb-6'>TOTAL EXPENDITURES</p>
            </div>
            <div className='bg-neutral-700 rounded-lg p-4 w-full md:w-1/2 mx-auto'>
                <div className="bg-white p-4 rounded-lg">
                    <ChartComponent data={data} />
                </div>
            </div>
        </>

    );
}