'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { AiOutlineHome, AiOutlineAppstoreAdd } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { FiRotateCcw } from "react-icons/fi";
import { LuClipboardCopy } from "react-icons/lu";
import { RiAlarmWarningLine } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi";
import { TbLogout2 } from "react-icons/tb";

function NavBar(props) {
  const pathname = usePathname()
  const baseUrl = "/dashboard/" + props.username
  const navLinks = [
    {
      name: "Accueil",
      icon: <AiOutlineHome size={24}/>,
      href: `${baseUrl}/accueil`,
    },
    {
      name: "Equipements",
      icon: <RxDashboard size={24}/>,
      href: `${baseUrl}/equipements`,
    },
    {
      name: "Maintenance",
      icon: <FiRotateCcw size={24}/>,
      href: `${baseUrl}/maintenance`,
    },
    {
      name: "Interventions",
      icon: <LuClipboardCopy size={24}/>,
      href: `${baseUrl}/interventions`,
    },
    {
      name: "Stocks des pièces de rechange",
      icon: <AiOutlineAppstoreAdd size={24}/>,
      href: `${baseUrl}/stocks`,
    },
    {
      name: "Alarmes",
      icon: <RiAlarmWarningLine size={24}/>,
      href: `${baseUrl}/alarmes`,
    },
    {
      name: "Utilisateurs",
      icon: <HiOutlineUserGroup size={24}/>,
      href: `${baseUrl}/utilisateurs`,
    },
    {
      name: "Se Deconnecter",
      icon: <TbLogout2 size={24}/>,
      href: `/login`,
    }
  ]
  return (
    <nav className='w-[25%] sticky top-0 h-full overflow-auto p-4 bg-sky-700 rounded-tr-2xl shadow backdrop-blur-[20px] rounded-br-2xl flex-col justify-center items-center'>
        <div className='pb-1 border-b-2 border-sky-500 justify-center items-center inline-flex'>
          <span className=' w-full text-center text-white text-[45px] font-semibold tracking-wide'>TYA MAINT</span>
        </div>
        <div className='w-full py-2 flex-col justify-center items-center gap-2 inline-flex'>
        {
          navLinks.map((link, index)=>{
            const isActive = pathname.startsWith(link.href)
            return (
                <Link
                  key={index}
                  href={link.href}
                  className={isActive ? "w-full p-4 bg-white rounded-2xl justify-start items-center gap-2.5 inline-flex" : "w-full p-4 rounded-2xl justify-start items-center gap-2.5 inline-flex"}
                >
                  <span className={isActive ? "text-sky-700" : "text-white"}>{link.icon}</span>
                  <span className={isActive ? "text-sky-700 text-xl font-semibold" : "text-white text-xl font-semibold"}>{link.name}</span>
                </Link>
            )
          })
        }
        </div>
    </nav>
  )
}

export default NavBar