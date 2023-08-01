'use client'

import React from 'react'

function InterventionState(props) {
    const state = props.state
  return (
    <>
        {state === "EnAttente" ?<span className='w-[130px] p-2 bg-blue-100 rounded-[100px] justify-center items-center gap-4 flex text-indigo-800 text-base font-bold leading-normal tracking-tight'>
            En Attente
        </span>: null}
        {state === "Validé" ?<span className='w-[130px] p-2 bg-green-100 rounded-[100px] justify-center items-center gap-4 flex text-green-500 text-base font-bold leading-normal tracking-tight'>
            Validé
        </span>: null}
        {state === "Rapport" ?<span className='w-[130px] p-2 bg-yellow-50 rounded-[100px] justify-center items-center gap-4 flex text-amber-400 text-base font-bold leading-normal tracking-tight'>
            Rapport
        </span>: null}
    </>
  )
}

export default InterventionState