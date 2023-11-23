import { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    type?: string;
    className?: string;
    isFocused?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
    type = 'text',
    className = '',
    isFocused = false,
    ...props
}) => {
    return (
        <input
            {...props}
            type={type}
            className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-black p-2 ${className}`}
        />
    );
};

export default TextInput;