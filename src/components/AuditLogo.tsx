import Image from 'next/image';

function AuditLogo({ className }: {className: string}) {
    return (
        <>
            <div className='hidden dark:block'>
                <Image src="/audit-white.png" alt="Audit Logo" width={1000} height={760} className={className} />
            </div>
            <div className='block dark:hidden'>
                <Image src="/audit-black.png" alt="Audit Logo" width={1000} height={760} className={className} />
            </div>
        </>
    )
}

export default AuditLogo;