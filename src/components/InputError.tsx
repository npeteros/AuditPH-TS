export default function InputError({ message = '', className = '', ...props }) {
    return message ? (
        <p {...props} className={'text-sm ' + className}>
            {message}
        </p>
    ) : null;
}
