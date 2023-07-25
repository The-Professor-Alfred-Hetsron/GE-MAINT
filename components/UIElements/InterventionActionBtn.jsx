'use client'

import React from 'react'
import { AiFillEye } from "react-icons/ai"
import { LuClipboardCopy } from "react-icons/lu";
import { BsClipboardCheck } from "react-icons/bs";
// import { RiDeleteBin6Line } from "react-icons/ri";

function InterventionActionBtn(props) {
    const state = props.state

  return (
    <>
        <button onClick={()=>props.viewIntervention()} className="py-1 px-2 bg-white rounded-[100px] text-[#149FDA] border border-sky-500 justify-center items-center gap-1 inline-flex hover:bg-[#149FDA] hover:text-white">
            <AiFillEye size={20}/>
            <span>Details</span>
        </button>

        {state === "En Attente" ?
        <button onClick={()=>props.validateIntervention()} className="py-1 px-2 bg-white rounded-[100px] text-[#34A853] border border-green-600 justify-center items-center gap-1 inline-flex hover:bg-[#34A853] hover:text-white">
            <BsClipboardCheck size={16}/>
            <span>Valider</span>
        </button>: null}

        {state === "Validé" ?
        <button onClick={()=>props.reportIntervention()} className="py-1 px-2 bg-white rounded-[100px] text-[#EDA92A] border border-amber-400 justify-center items-center gap-1 inline-flex hover:bg-[#EDA92A] hover:text-white">
            <LuClipboardCopy size={20}/>
            <span>Rapport</span>
        </button>: null}

        {/* {state === "Rapport" ?
        {/* <button onClick={()=>deletePanne()} className="py-1 px-2 bg-white rounded-[100px] text-[#EA4335] border border-red-500 justify-center items-center gap-1 inline-flex hover:bg-[#EA4335] hover:text-white">
            <RiDeleteBin6Line size={20}/>
            <span>Supprimer</span>
        </button> }: null} */}
    </>
  )
}

export default InterventionActionBtn