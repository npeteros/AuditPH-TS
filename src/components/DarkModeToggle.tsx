'use client';

import { useState } from 'react';

const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark');
    };

    const renderToggle = () => {
        if (isDarkMode) {
            return (
                <>
                    <svg width="24" height="24" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992V3Z"></path>
                    </svg>
                </>
            );
        } else {
            return (
                <>
                    <svg width="24" height="24" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path>
                        <path d="m6.3 17.7-.7.7M3 12h1-1Zm9-9v1-1Zm8 9h1-1Zm-8 8v1-1ZM5.6 5.6l.7.7-.7-.7Zm12.8 0-.7.7.7-.7Zm-.7 12.1.7.7-.7-.7Z"></path>
                    </svg>
                </>
            );
        }
    }

    return (
        <div className="fixed bottom-4 right-4 text-white">
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultValue="" className="sr-only peer" onClick={toggleDarkMode} />
                <div
                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-600 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-400"
                    onClick={toggleDarkMode}
                />
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {renderToggle()}
                </span>
            </label>
        </div>

    );
};

export default DarkModeToggle;