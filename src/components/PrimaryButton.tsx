import { ButtonHTMLAttributes } from "react";

interface PirmaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

const PrimaryButton: React.FC<PirmaryButtonProps> = ({ className = '', disabled, children, ...props }) => {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-neutral-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-neutral-700 focus:bg-neutral-700 active:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default PrimaryButton;
