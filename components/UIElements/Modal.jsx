'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { GrClose } from "react-icons/gr";

function Modal(props) {
  const [ isModalVisible, setModalVisibility ] = useState(props.isVisible?props.isVisible: false)
  const [ isDeleteModalVisible, setDeleteModalVisibility ] = useState(props.isDeleteModalVisible? props.isDeleteModalVisible: false)
  
  useEffect(()=> {
    setModalVisibility(props.isVisible? props.isVisible: false)
    setDeleteModalVisibility(props.isDeleteModalVisible? props.isDeleteModalVisible: false)
  }, [props])
  return (
    <>
      {isModalVisible ?
        <>
          <div className='w-full fixed p-10 rounded-2xl inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80 flex flex-row justify-center items-center'>
            {/* modal container */}
            <form className="p-8 bg-stone-50 rounded-2xl shadow backdrop-blur-[20px] flex flex-col gap-4 justify-center items-center overflow-auto" style={{width:props.modalWidth}} onSubmit={(e)=>(e.preventDefault())}>
              {/* modal header */} 
              <div className='w-full px-2 text-[26px] font-semibold leading-10 text-black flex flex-row justify-center items-center'>
                <span className='w-full text-center capitalize'>{props.modalTitle}</span>
                <button onClick={()=>props.closeModalAction()} className='text-black hover:text-red-600'>
                  <GrClose size={24}/>
                </button>
              </div>

              {/* modal body */}
              <div className='w-full flex flex-col gap-4 justify-center items-center'>

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
                  </div> :
                  <>
                    {props.children}
                    <div className="w-full flex flex-row gap-4 justify-end items-center">
                        <button onClick={()=>props.closeModalAction()} className='p-4 bg-red-500 rounded-md justify-center items-center flex text-center text-white text-base font-medium uppercase leading-snug tracking-[3px]'>
                            Annuler
                        </button>
                        <button type='submit' className='p-4 bg-sky-700 rounded-md justify-center items-center flex text-center text-white text-base font-medium uppercase leading-snug tracking-[3px]'>
                            {props.addBtnLabel}
                        </button>
                    </div>
                  </>}
              </div>
            </form>
          </div>
        </>
      : null}
    </>
  )
}

export default Modal