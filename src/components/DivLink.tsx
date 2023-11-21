import Link from 'next/link';

const DivLink = ({ route = '', className, children }: {route: string, className: string, children: React.ReactNode}) => {
    return (
        <Link
            className={className}
            href={route}
        >
            {children}
        </Link>
    )
}

export default DivLink;