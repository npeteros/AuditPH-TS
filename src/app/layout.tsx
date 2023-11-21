import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import DarkModeToggle from '@/components/DarkModeToggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'AuditPH',
    description: 'Manage your finances easily',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={'dark ' + inter.className}>
                {children}
                <DarkModeToggle />
            </body>
        </html>
    )
}
