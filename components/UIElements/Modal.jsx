'use client'

import React, { useState, useEffect } from 'react'
import { createPortal } from "react-dom";
import { GrClose } from "react-icons/gr";

import Image from 'next/image'
import { useRouter } from 'next/navigation'


import InterventionActionBtn from "@/components/UIElements/InterventionActionBtn"
import InterventionState from "@/components/UIElements/InterventionState"

function Modal(props) {
  const router = useRouter()
  const [ isModalVisible, setModalVisibility ] = useState(props.isVisible?props.isVisible: false)
  const [ isDetailIntervention, setDetailIntervention ] = useState(props.isDetailIntervention?props.isDetailIntervention:false)
  const [ isDeleteModalVisible, setDeleteModalVisibility ] = useState(props.isDeleteModalVisible? props.isDeleteModalVisible: false)
  const [ interventionInfo, setInterventionInfo ] = useState(props.interventionInfo?props.interventionInfo:null)


  useEffect(()=> {
    setModalVisibility(props.isVisible? props.isVisible: false)
    setDetailIntervention(props.isDetailIntervention?props.isDetailIntervention:false)
    setDeleteModalVisibility(props.isDeleteModalVisible? props.isDeleteModalVisible: false)
    setInterventionInfo(props.interventionInfo?props.interventionInfo:null)
  }, [props])

  return createPortal(
    <React.Fragment>
      {isModalVisible &&
        <div className={`w-full h-full py-10 z-50 fixed top-0 left-0 bottom-0 right-0 inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80 flex flex-col items-center overflow-auto ${(isDeleteModalVisible||isDetailIntervention)?"justify-center":"justify-start"}`}>
          {/* modal container */}
          {!isDetailIntervention &&
            <form className="py-5 px-6 z-50 min-w-[600px] bg-stone-50 rounded-2xl backdrop-blur-[20px] flex flex-col gap-2 justify-center items-center" style={{width:props.modalWidth,boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.25)'}} onSubmit={(e)=>(e.preventDefault())}>
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
                <div className='w-full flex flex-col gap-3 justify-center items-center'>
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
                  <div className="w-full flex flex-row gap-2 justify-end items-center">
                      <button onClick={()=>props.closeModalAction()} className='p-4 bg-red-500 rounded-md justify-center items-center flex text-center text-white text-base font-medium uppercase leading-snug tracking-[3px]'>
                          Annuler
                      </button>
                      <button onClick={()=>props.addNewAction()} type='submit' className='p-4 bg-sky-700 rounded-md justify-center items-center flex text-center text-white text-base font-medium uppercase leading-snug tracking-[3px]'>
                          {props.addBtnLabel}
                      </button>
                  </div>
                </>}
            </div>
          </form>}
          
          {/* modal Intervention Detail Container */}
          {isDetailIntervention &&
            <form className="py-5 px-6 z-50 bg-stone-50 rounded-2xl shadow backdrop-blur-[20px] flex flex-col gap-2 justify-center items-center" style={{width:props.modalWidth}} onSubmit={(e)=>(e.preventDefault())}>
              
              {/* modal header */} 
              <div className='w-full  text-[26px] font-semibold leading-10 text-black flex flex-row justify-between items-center'>
                <div className='flex flex-row justify-between items-center'>
                  <span className='w-full text-left capitalize text-black text-[32px] font-bold leading-7 tracking-tight'>Intervention #{props.index}</span>
                  <InterventionState state={interventionInfo.etat}/>
                </div>
                <button onClick={()=>props.closeModalAction()} className='text-black hover:text-red-600'>
                  <GrClose size={24}/>
                </button>
              </div>

              {/* modal body */}
              <div className='w-full flex flex-col gap-4 justify-center items-center'>
                <div className="w-full flex-col justify-start items-start inline-flex">
                    <div className="justify-start items-center gap-[4px] inline-flex">
                        <span className="text-black text-[18px] font-normal leading-loose">Panne: </span>
                        <span className="text-black text-[20px] font-semibold">{interventionInfo.panne}</span>
                    </div>
                    <div className="justify-start items-center gap-[4px] inline-flex">
                        <span className="text-black text-[18px] font-normal leading-loose">Sous Système: </span>
                        <span className="text-black text-[20px] font-semibold">{interventionInfo.sousSysteme}</span>
                    </div>
                    <div className="justify-start items-center gap-[4px] inline-flex">
                        <span className="text-black text-[18px] font-normal leading-loose capitalize">équipement: </span>
                        <span className="text-black text-[20px] font-semibold">{interventionInfo.equipement}</span>
                    </div>
                    <div className="justify-start items-center gap-[4px] inline-flex">
                        <span className="text-black text-[18px] font-normal leading-loose capitalize">état de l’équipement: </span>
                        <span className="text-black text-[20px] font-semibold">{interventionInfo.etatEquipementInitial}</span>
                    </div>
                    <div className="justify-start items-center gap-[4px] inline-flex">
                        <span className="text-black text-[18px] font-normal leading-loose">Demandé par: </span>
                        <span className="text-black text-[20px] font-semibold">{interventionInfo.demanderPar}</span>
                    </div>
                    {(interventionInfo.etat === "Validé" || interventionInfo.etat === "Rapport") &&
                    <>
                      <div className="justify-start items-center gap-[4px] inline-flex">
                          <span className="text-black text-[18px] font-normal leading-loose">Executant: </span>
                          <span className="text-black text-[20px] font-semibold">{interventionInfo.executant}</span>
                      </div>
                      <div className="justify-start items-center gap-[4px] inline-flex">
                          <span className="text-black text-[18px] font-normal leading-loose">Début d’intervention: </span>
                          <span className="text-black text-[20px] font-semibold">{interventionInfo.debutIntervention}</span>
                      </div>
                      <div className="justify-start items-center gap-[4px] inline-flex">
                          <span className="text-black text-[18px] font-normal leading-loose">Fin d’intervention: </span>
                          <span className="text-black text-[20px] font-semibold">{interventionInfo.finIntervention}</span>
                      </div>
                    </>}
                    {interventionInfo.etat === "Rapport" && 
                    <>
                      <div className="justify-start items-center gap-[4px] inline-flex">
                          <span className="text-black text-[18px] font-normal leading-loose">Nouveau état de l’équipement: </span>
                          <span className="text-black text-[20px] font-semibold">{interventionInfo.etatEquipementFinal}</span>
                      </div>
                      <div className="justify-start items-baseline gap-[4px] inline-flex">
                          <span className="text-black text-[18px] font-normal leading-loose">Observation: </span>
                          <span className="text-black text-[20px] font-semibold">{interventionInfo.observation}</span>
                      </div>
                    </>}
                </div>
                <div className='w-full flex gap-1 justify-end items-start flex-wrap'>
                  <InterventionActionBtn
                      state={interventionInfo.etat}
                      viewIntervention={()=>{router.push(`/dashboard/${props.username}/equipements/${interventionInfo.equipement}/${interventionInfo.sousSysteme}/pannes/${interventionInfo.panne}`)}}
                      validateIntervention={()=>props.validateIntervention()}
                      reportIntervention={()=>{props.reportIntervention()}}
                      detailPlaceholder = "Consulter les protocols"
                      reportPlaceholder = "Faire le Rapport"
                  />
                </div>
              </div>
            </form>
          }
        </div>
      }
    </React.Fragment>, document.body
  )
}

export default Modal