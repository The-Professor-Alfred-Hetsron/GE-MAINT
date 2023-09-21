'use client'

import React, { useState, useEffect } from 'react'
import NumberCards from '@/components/UIElements/NumberCards'
import DefaultCalendar from '@/components/UIElements/DefaultCalendar'
import ViewBtn from "@/components/UIElements/ViewBtn"

import {
    apiIntervenList,
    apiRapportIntervenList
} from "@/data/homePage"
// import { useRouter } from 'next/navigation'
// import InterventionState from "@/components/UIElements/InterventionState"
import InterventionType from '@/types/intervention'
// import InterventionActionBtn from '@/components/UIElements/InterventionActionBtn'
import Modal from '@/components/UIElements/Modal'

export default function Home ({params}:{params: {username:string }}) {

    const username = decodeURI(params.username)
    const baseUrl = "/dashboard/" + username

    const [ equipTotal, setEquipTotal ] = useState(0)
    const [ subSysTotal, setSubSysTotal ] = useState(0)
    const [ pieceTotal, setPieceTotal ] = useState(0)
    const [ pannesTotal, setPannesTotal ] = useState(0)

    const [ isDetailModal, setDetailModalVisibility ] = useState<boolean>(false)
    const [ selectedInterven, setSelectedInterven ] = useState<number>(0)

    const [ apiInterventionList, setApiInterventionList ] = useState<Array<InterventionType>>(apiIntervenList)
    const [ apiRaaportList, setApiRaaportList ] = useState<Array<InterventionType>>(apiRapportIntervenList)


    const totalList = [
        {
            name: "Nombre d’Équipements",
            image: "/assets/img/dashboard/acceuil/equipTotal.svg",
            total: equipTotal,
            href: `${baseUrl}/equipements`
        },
        {
            name: "Nombre de Sous Systèmes",
            image: "/assets/img/dashboard/acceuil/subSysTotal.svg",
            total: subSysTotal,
            href: `${baseUrl}/equipements`
        },
        {
            name: "Nombre de Pièces",
            image: "/assets/img/dashboard/acceuil/pieceTotal.svg",
            total: pieceTotal,
            href: `${baseUrl}/stocks/listes`
        },
        {
            name: "Nombre de Pannes",
            image: "/assets/img/dashboard/acceuil/panneTotal.svg",
            total: pannesTotal,
            href: `${baseUrl}/equipements`
        }
    ]

    const closeModal = () =>{
        setDetailModalVisibility(false)
        setSelectedInterven(0)

    }

    useEffect(() => {
        const loadEquipements = async () => {
            const response = await fetch('/api/equipements')
            const json = await response.json()
            console.log(json)
            const { equipements } = json
            if (!equipements) return;
            setEquipTotal(equipements.length)
        }
        const loadSubsystems = async () => {
            const response = await fetch('/api/equipements/sous-systeme')
            const json = await response.json()
            console.log(json)
            const { sousSystemes } = json
            if (!sousSystemes) return;
            setSubSysTotal(sousSystemes.length)
        }
        const loadPieces = async () => {
            const response = await fetch('/api/equipements/sous-systeme/pieces')
            const json = await response.json()
            console.log(json)
            const { pieces } = json
            if (!pieces) return;
            setPieceTotal(pieces.length)
        }
        const loadPannes = async () => {
            const response = await fetch('/api/equipements/sous-systeme/panne')
            const json = await response.json()
            console.log(json)
            const { pannes } = json
            if (!pannes) return;
            setPannesTotal(pannes.length)
        }
        loadEquipements()
        loadSubsystems()
        loadPieces()
        loadPannes()

    }, [])

    return(
        <div className="w-full h-full py-2 flex flex-col gap-8 justify-start items-center overflow-y-auto">
            <div className='w-full flex flex-row 2xl:flex-col gap-4 justify-end items-start' style={{}}>
                <div className='w-[1000px] 2xl:w-full z-10 flex flex-auto flex-row flex-wrap gap-4'>
                    {
                        totalList.map((total, index) => {
                            return  <NumberCards
                                        key={index}
                                        info = {total}
                                    />
                        })
                    }
                </div>
                <div className='w-full h-[600px] z-10 p-2 flex flex-col items-start justify-end bg-white rounded-2xl border border-slate-300'>
                    <div className='w-full pr-6 border-b border-slate-300 pb-2 items-center flex flex-row justify-between'>
                        <span className='text-zinc-800 text-2xl font-semibold uppercase'>
                            Calendrier de Maintenance
                        </span>
                        <ViewBtn
                            viewText = "Voir Plus"
                            href = {`${baseUrl}/maintenance`}
                        />
                    </div>
                    <DefaultCalendar/>
                </div>
            </div>

            {/* <div className="w-full p-2 bg-white rounded-2xl border border-slate-300">
                <div className="w-full justify-between items-center inline-flex">
                    <div className='flex flex-row justify-start gap-4 items-center'>
                        <span className="text-zinc-800 text-2xl font-semibold uppercase leading-[52.11px]">Demande D’Interventions</span>
                        <span className="w-10 h-10 p-5 bg-sky-500 rounded-[100px] justify-center items-center inline-flex text-white text-base font-semibold">{apiInterventionList.length}</span>
                    </div>
                    <ViewBtn
                        viewText = "Voir Plus"
                        href = {`${baseUrl}/interventions`}
                    />
                </div>
                <table className="w-full p-2 rounded-2xl border border-slate-400 flex-col justify-start items-start flex overflow-x-auto">
                    <thead className="w-full bg-white border-b border-slate-400">
                        <tr className="w-full p-2 flex gap-1 text-black text-lg font-bold leading-7 tracking-tight">
                            <td className="w-[150px]">N°</td>
                            <td className="w-full">Panne</td>
                            <td className="w-full">Sous Système</td>
                            <td className="w-full text-center">Demandé par</td>
                            <td className="w-full capitalize text-center">état de l’équipement</td>
                            <td className="w-full capitalize text-center">état</td>
                        </tr>
                    </thead>
                    <tbody className="w-full h-[300px] overflow-auto">
                    {
                        apiInterventionList.map((intervention, index) => {
                            return <tr key={index} className="w-full p-2 flex gap-1 text-black text-lg font-medium leading-7 tracking-tight odd:bg-white even:bg-indigo-50">
                                <td className="w-[150px]">{index+1}</td>
                                <td className="w-full">{intervention.panne}</td>
                                <td className="w-full">{intervention.sousSysteme}</td>
                                <td className="w-full text-center">{intervention.demanderPar}</td>
                                <td className="w-full capitalize text-center">{intervention.etatEquipementInitial}</td>
                                <td className="w-full flex justify-center items-center text-center"><InterventionState state={intervention.etat}/></td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>

            <div className="w-full p-2 bg-white rounded-2xl border border-slate-300">
                <div className="w-full justify-between items-center inline-flex">
                    <div className='flex flex-row justify-start gap-4 items-center'>
                        <span className="text-zinc-800 text-2xl font-semibold uppercase leading-[52.11px]">Rapport D’Interventions</span>
                        <span className="w-10 h-10 p-5 bg-sky-500 rounded-[100px] justify-center items-center inline-flex text-white text-base font-semibold">{apiRaaportList.length}</span>
                    </div>
                    <ViewBtn
                        viewText = "Voir Plus"
                        href = {`${baseUrl}/interventions`}
                    />
                </div>
                <table className="w-full p-2 rounded-2xl border border-slate-400 flex-col justify-start items-start flex overflow-x-auto">
                    <thead className="w-full bg-white border-b border-slate-400">
                        <tr className="w-full p-2 flex gap-1 text-black text-lg font-bold leading-7 tracking-tight">
                            <td className="w-[150px]">N°</td>
                            <td className="w-full">Panne</td>
                            <td className="w-full">Sous Système</td>
                            <td className="w-full text-center">Demandé par</td>
                            <td className="w-full capitalize text-center">état de l’équipement</td>
                            <td className="w-full capitalize text-center">Action</td>
                        </tr>
                    </thead>
                    <tbody className="w-full h-[300px] overflow-auto">
                    {
                        apiRaaportList.map((intervention, index) => {
                            return <tr key={index} className="w-full p-2 flex gap-1 text-black text-lg font-medium leading-7 tracking-tight odd:bg-white even:bg-indigo-50">
                                <td className="w-[150px]">{index+1}</td>
                                <td className="w-full">{intervention.panne}</td>
                                <td className="w-full">{intervention.sousSysteme}</td>
                                <td className="w-full text-center">{intervention.demanderPar}</td>
                                <td className="w-full capitalize text-center">{intervention.etatEquipementInitial}</td>
                                <td className="w-full flex gap-1 justify-end items-start flex-wrap">
                                    <InterventionActionBtn
                                        state={intervention.etat}
                                        viewIntervention={()=>{setDetailModalVisibility(true)
                                                                setSelectedInterven(index)}}
                                    />
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div> */}

            {/* View Intervention Detail Modal */}
            <Modal
                modalTitle="Details de l'Intervention"
                isVisible={isDetailModal}
                isDeleteModalVisible = {false}
                isDetailIntervention={isDetailModal}
                index= {selectedInterven+1}
                interventionInfo = {apiRaaportList[selectedInterven]}
                username = {username}
                modalWidth = {650}
                closeModalAction = {closeModal}
            />
        </div>
    )
}