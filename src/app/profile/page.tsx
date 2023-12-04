








export default function Page() {
    return (
        <>
            <div className="bg-white max-w-6xl mx-auto py-2 m-14 rounded-xl">
                <div className="m-5 pb-10">
                    <p className="text-xl text-gray-900">Profile Information</p>
                    <p className="text-medium text-gray-600">Update your account's profile information and email address.</p>
                </div>
                <div> {/* for name and email div */}
                    <div className="m-5">
                        <p className="text-gray-900 text-xl pb-1">
                            Name
                        </p>
                        <input className="border border-gray-300 p-3 w-full rounded-md" type="text" placeholder="type here..." />
                    </div>
                    <div className="m-5 pt-6">
                        <p className="text-gray-900 text-xl pb-1">
                            Email
                        </p>
                        <input className="border border-gray-300 p-3 w-full rounded-md" type="text" placeholder="ex: asd@gmail.com" />
                    </div>
                </div>
                <button className="bg-gray-900 m-5 rounded-md px-4 py-2 text-white ">
                    SAVE
                </button>
            </div>


            <div className="bg-white max-w-6xl mx-auto py-2 m-14 rounded-xl">
                <div className="m-5 pb-10">
                    <p className="text-xl text-gray-900">Update Password</p>
                    <p className="text-medium text-gray-600">Ensure your account is using a long random password to stay secure.</p>
                </div>
                <div> {/* for name and email div */}
                    <div className="m-5">
                        <p className="text-gray-900 text-xl pb-1">
                            Current Password
                        </p>
                        <input className="border border-gray-300 p-3 w-full rounded-md" type="password" placeholder="type here..." />
                    </div>
                    <div className="m-5 pt-6">
                        <p className="text-gray-900 text-xl pb-1">
                            New Password
                        </p>
                        <input className="border border-gray-300 p-3 w-full rounded-md" type="password" placeholder="**********" />
                    </div>
                    <div className="m-5 pt-6">
                        <p className="text-gray-900 text-xl pb-1">
                            Confirm Password
                        </p>
                        <input className="border border-gray-300 p-3 w-full rounded-md" type="password" placeholder="**********" />
                    </div>
                </div>
                <button className="bg-gray-900 m-5 rounded-md px-4 py-2 text-white ">
                    SAVE
                </button>
            </div>






        </>
    );
}