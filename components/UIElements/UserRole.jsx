'use client'

import React from 'react'

function UserRole(props) {
    const role = props.role
  return (
    <>
        {role === "Personnel" ?<span className='w-[130px] p-2 bg-green-100 rounded-[100px] justify-center items-center gap-4 flex text-green-500 text-base font-bold leading-normal tracking-tight'>
            Personnel
        </span>: null}
        {role === "Responsable" ?<span className='w-[130px] p-2 bg-yellow-50 rounded-[100px] justify-center items-center gap-4 flex text-amber-400 text-base font-bold leading-normal tracking-tight'>
            Responsable
        </span>: null}
    </>
  )
}

export default UserRole