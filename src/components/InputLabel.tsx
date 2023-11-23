import { LabelHTMLAttributes } from "react";

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    value?: string;
    className?: string;
    children?: React.ReactNode;
}

const InputLabel: React.FC<InputLabelProps> = ({ value, className = '', children, ...props }) => {
    return (
        <label {...props} className={`block font-medium text-sm ${className}`}>
            {value ? value : children}
        </label>
    );
};

export default InputLabel;