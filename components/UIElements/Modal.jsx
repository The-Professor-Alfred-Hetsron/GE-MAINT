'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { GrClose } from "react-icons/gr";

function Modal(props, {children}) {
  const [ isModalVisible, setModalVisibility ] = useState(props.isVisible)
  const [ isDeleteModalVisible, setDeleteModalVisibility ] = useState(props.isDeleteModalVisible)
  
  useEffect(()=> {
    setModalVisibility(props.isVisible)
    setDeleteModalVisibility(props.isDeleteModalVisible)
  }, [props])
  return (
    <>
      {isModalVisible ?
        <>
          <div className='p-10 fixed left-0 top-0 right-0 bottom-0 z-[9999] rounded-2xl inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80 flex justify-center items-center overflow-y-auto'>
            {/* modal container */}
            <div className="p-8 bg-white rounded-2xl shadow flex flex-col gap-4 justify-center items-center" style={{width:props.modalWidth}}>
              {/* modal header */} 
              <div className='w-full px-2 text-[26px] font-semibold leading-10 text-black flex flex-row justify-center items-center'>
                <span className='w-full text-center capitalize'>{props.modalTitle}</span>
                <button onClick={()=>props.closeModal()} className='text-black hover:text-red-600'>
                  <GrClose size={24}/>
                </button>
              </div>

              {/* modal body */}
              <div className='w-full flex justify-center items-center'>

                {isDeleteModalVisible ?
                  <div className='w-full flex flex-col gap-4 justify-center items-center'>
                    <Image src="/assets/img/dashboard/modal/warningLogo.png" alt='warining Image' width="100" height="100"/>
                    <span className='w-full text-black text-center text-[20px] font-normal leading-[34px]'>
                      {props.deleteText}
                    </span>
                    <div className='w-full justify-between items-center gap-4 flex flex-row'>
                      <button onClick={()=>props.closeModalAction()} className='w-full py-2 px-4 rounded-md border border-red-500 justify-center items-center gap-2 flex text-center text-red-500 text-base font-medium uppercase leading-snug tracking-[3px]'>
                        Non, Annuler
                      </button>
                      <button onClick={()=>props.deleteAction()} className='w-full py-2 px-4 bg-red-500 rounded-md justify-center items-center gap-2 flex text-center text-white text-base font-medium uppercase leading-snug tracking-[3px]'>
                        OUI, LE SUPPRIMER
                      </button>
                    </div>
                  </div> :null}

                {children}
              </div>
            </div>
          </div>
        </>
      : null}
    </>
  )
}

export default Modal