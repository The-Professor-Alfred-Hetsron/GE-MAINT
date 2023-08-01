'use client'

import Link from "next/link"
import { usePathname } from 'next/navigation'

export default function DashboardLayout(
    { 
        children,
        params
    } : {
        children: React.ReactNode,
        params: { username: string }
    }
){
    const pathname = usePathname()
    const username = decodeURI(params.username)

    const tabLinks = [
        {
            name:"Liste des Pièces de Rechange",
            href: `/dashboard/${username}/stocks/listes`,
            tabId: "listes"
        },
        {
            name:"Transaction des Pièces",
            href: `/dashboard/${username}/stocks/transactions`,
            tabId: "transactions"
        }
    ]

    return (
        <div className="w-full h-full flex-col gap-2 flex justify-start items-center">
            {/* Le tab bar est ci-dessous */}
            <div className="w-full p-1 bg-white rounded-xl shadow backdrop-blur-[20px] justify-between items-center gap-2 flex">
                {
                    tabLinks.map((link, index) => {
                        const isActive = pathname.includes(link.tabId)
                        return <Link 
                                href={link.href}
                                key={index}
                                className={isActive ? "w-full p-1 bg-sky-700 rounded-xl justify-center items-center flex text-center text-white text-xl font-semibold leading-tight" : "w-full rounded-xl justify-center items-center flex text-center text-black hover:text-[#0B5DA7] text-xl font-semibold leading-tight"}
                            >
                            {link.name}
                            </Link>
                    })
                }
            </div>

            {/* Le Corps des stocks sont ci-dessous */}
            <div className="w-full h-full flex justify-center items-center">
                {children}
            </div>
        </div>
    )
}