'use client'

import React from 'react'

function TransactionState(props) {
    const type = props.type

  return (
    <>
        {type === "TRANSACTION-AJOUT" ?<span className='w-[130px] p-2 bg-green-100 rounded-[100px] justify-center items-center gap-4 flex text-green-500 text-base font-bold leading-normal tracking-tight'>
            Entrée
        </span>: null}
        {type === "TRANSACTION-RETRAIT" ?<span className='w-[130px] p-2 bg-yellow-50 rounded-[100px] justify-center items-center gap-4 flex text-amber-400 text-base font-bold leading-normal tracking-tight'>
            Sortie
        </span>: null}
    </>
  )
}

export default TransactionState