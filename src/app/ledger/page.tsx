export default function Page() {
    return (
        <>
            <div className="bg-white max-w-7xl my-10 mx-auto rounded-lg ">
                <div className="flex flex-col items-center">
                    <p className="text-gray-900 text-6xl pt-14 pb-2">AuditPH</p>
                    <p className="text-gray-600 text-4xl p-1 pb-2">GENERAL LEDGER</p>
                    <p className="text-xl pt-2 pb-6">list of all transactions of all types</p>
                </div>

                <div className="pb-6">
                    <div className="w-full grid grid-cols-5 border-solid border-2 text-center max-w-6xl mx-auto font-bold border-sky-500">
                        <div className="border border-sky-500">
                            Date
                        </div>

                        <div className="border border-sky-500">
                            Entry #
                        </div>

                        <div className="border border-sky-500">
                            Description
                        </div>

                        <div className="border border-sky-500">
                            Type (Income/Expenses)
                        </div>

                        <div className="border border-sky-500">
                            Amount
                        </div>
                        
                    </div>
                </div>











            </div>
        </>
    );
}