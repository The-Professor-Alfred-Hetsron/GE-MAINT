'use client'

import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { RiDeleteBin6Line } from "react-icons/ri";

interface TypesProps{
    sysPieceInfo: any,
    href:string,
    deleteAction:Function,

}

function SubsysPieceCard(props:TypesProps) {
    const router = useRouter()
    
    const sysPieceInfo = props.sysPieceInfo? props.sysPieceInfo : {}
    
    const routeToDetails = () => {
        router.push(props.href)
    }
  return (
    <div className='w-[180px] aspect-square bg-white rounded-[16px] shadow drop-shadow-md flex-col justify-start items-start inline-flex'>
        <button onClick={()=>routeToDetails()} className='w-full h-3/4 py-4 bg-[#D0E5F0] rounded-t-[16px] flex justify-center items-center'>
            <Image className="w-3/4 aspect-square hover:scale-105 ease-in-out duration-300" width="500" height="500" src={sysPieceInfo.image} alt={sysPieceInfo.nom}/>
        </button>
        <div className='text-black w-full p-2 flex-row justify-center items-center inline-flex'>
            <button onClick={()=>routeToDetails()} className='py-2 w-full flex-col justify-start items-start gap-[3px] inline-flex'>
                <span className='w-full inline-flex justify-start items-start text-[12px] font-semibold'>{sysPieceInfo.nom}</span>
                <span className='text-[11px] font-normal'>{sysPieceInfo.numero_serie}</span>
                {sysPieceInfo.qteStock? 
                    <span className='text-[11px] font-normal'>{sysPieceInfo.qteStock} Pièces en Stock</span>
                : null}
            </button>
            <div className='flex justify-center items-center'>
                <button onClick={()=>{props.deleteAction()}}>
                    <RiDeleteBin6Line size={20} color='#EA4335'/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default SubsysPieceCard