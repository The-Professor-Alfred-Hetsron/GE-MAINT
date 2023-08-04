'use client'

import React from 'react'
import Image from 'next/image'
import { FiMenu, FiX } from "react-icons/fi";

function Header(props) {
  const username = props.username? props.username.replace("-", " ") : "Nom Prenom"
  const userInitials = `${username.toUpperCase().split(" ")[0][0]} ${username.toUpperCase().split(" ")[username.toUpperCase().split(" ").length-1][0]}`


  return (
    <div className='w-full mb-2 rounded-2xl shadow-lg backdrop-blur-[20px] flex-col justify-start items-start'>
  
        <div className='w-full px-4 py-2 bg-white rounded-tl-2xl rounded-tr-2xl justify-start items-center flex flex-row sm:flex-col'>
          
          <div className="w-full flex flex-row justify-start items-center gap-4">
            <button onClick={()=>props.navToogler(!props.navStatus)} className='text-amber-400'>
              {props.navStatus? <FiX size={32}/>
                  : <FiMenu size={32}/>
              }
            </button>
            <Image className="rounded-[62.25px]" width="60" height="60" src="/assets/img/svgPAKLogo.svg" alt="Logo PAK"/>
            <div className="w-full flex flex-col h-full justify-evenly">
              <span className="w-full text-sky-700 text-[18px] font-normal">PORT AUTONOME DE KRIBI</span>
              <span className="w-full text-sky-500 text-[18px] font-normal">PORT AUTHORITY OF KRIBI</span>
            </div>
          </div>

          <div className='w-full flex flex-row gap-2 justify-end items-center'>
              <div className='flex-col justify-center items-start inline-flex'>
                  <span className='text-black text-[20px] font-normal'>{username}</span>
                  <span className='text-black text-[18px] font-medium leading-[30px] tracking-tight'>{props.role}</span>
              </div>
              <span className='w-[60px] h-[60px] px-2 py-5 bg-sky-800 rounded-[100px] justify-center items-center inline-flex text-white font-bold text-[20px]'>
                {userInitials}
              </span>
          </div>

        </div>

        <div className='w-full px-4 bg-amber-400 rounded-bl-2xl rounded-br-2xl justify-start items-center inline-flex'>
            <span className='text-white text-[24px] font-semibold uppercase'>Service d’Exploitation et Maintenance des Réseaux Utilitaires</span>
        </div>
    </div>
  )
}

export default Header