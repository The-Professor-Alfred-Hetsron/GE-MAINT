'use client'

import React from 'react'
import 'animate.css';
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { AiOutlineHome, AiOutlineAppstoreAdd } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { FiRotateCcw, FiMenu, FiX } from "react-icons/fi";
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
      name: "Équipements",
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
      name: "Stocks",
      icon: <AiOutlineAppstoreAdd size={24}/>,
      href: `${baseUrl}/stocks/listes`,
      href2: `${baseUrl}/stocks/transactions`
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
    <div className='w-[320px] h-full fixed left-0 top-0 lg:w-screen lg:h-screen lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:bottom-0 lg:z-50 lg:inset-0 lg:bg-black/20 lg:backdrop-blur-sm lg:dark:bg-slate-900/80'>
      <button onClick={()=>props.navToogler(false)} className='text-amber-400 hidden lg:flex lg:absolute lg:right-8 lg:top-8'>
        <FiX size={32}/>
      </button>
      
      <nav className='w-[320px] h-full fixed left-0 top-0 rounded-tr-2xl rounded-br overflow-y-auto p-4 bg-sky-700 shadow backdrop-blur-[20px] flex-col justify-center items-center animate__animated animate__fadeInLeft'>
        <div className='w-full pb-1 border-b-2 border-sky-500 justify-center items-center inline-flex'>
          <span className='w-full text-center text-white text-[60px] font-semibold'>TYA MAINT</span>
        </div>
        <div className='w-full py-2 flex-col justify-center items-center gap-2.5 inline-flex'>
        {
          navLinks.map((link, index)=>{
            const newPath = decodeURI(pathname)
            const isActive = link.href2? (newPath.startsWith(link.href) || newPath.startsWith(link.href2)) : newPath.startsWith(link.href)
            return (
                <Link
                  key={index}
                  href={link.href}
                  className={isActive ? "w-full p-3 bg-white rounded-2xl justify-start items-center gap-2.5 inline-flex" : "group hover:bg-white w-full p-3 rounded-2xl justify-start items-center gap-2.5 inline-flex"}
                >
                  <span className={isActive ? "text-sky-700" : "text-white group-hover:text-sky-700"}>{link.icon}</span>
                  <span className={isActive ? "text-sky-700 text-xl font-semibold" : "text-white text-xl font-semibold group-hover:text-sky-700"}>{link.name}</span>
                </Link>
            )
          })
        }
        </div>
      </nav>
    </div>
  )
}

export default NavBar