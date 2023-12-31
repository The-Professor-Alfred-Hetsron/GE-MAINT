'use client'

import React from 'react'

function InterventionState(props) {
    const state = props.state
  return (
    <>
        {state === "En Attente" && <span className='w-[130px] p-2 bg-blue-100 rounded-[100px] justify-center items-center gap-4 flex text-indigo-800 text-base font-bold leading-normal tracking-tight'>
            {state}
        </span>}
        {state === "Validé" && <span className='w-[130px] p-2 bg-green-100 rounded-[100px] justify-center items-center gap-4 flex text-green-500 text-base font-bold leading-normal tracking-tight'>
            {state}
        </span>}
        {state === "Rapport" && <span className='w-[130px] p-2 bg-yellow-50 rounded-[100px] justify-center items-center gap-4 flex text-amber-400 text-base font-bold leading-normal tracking-tight'>
            {state}
        </span>}
    </>
  )
}

export default InterventionState