export default function ResponsiveNavText({ active = false, className = '', children, ...props }: { active: boolean, className: string, children: React.ReactNode }) {
    return (
        <span
            {...props}
            className={`w-full flex items-start pl-3 pr-4 py-2 border-l-4 ${
                active
                    ? 'border-neutral-500 text-neutral-800 bg-neutral-500 focus:text-white focus:bg-neutral-600 focus:border-neutral-700'
                    : 'border-transparent text-neutral-800 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-white focus:bg-neutral-400 focus:border-neutral-700'
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </span>
    );
}
