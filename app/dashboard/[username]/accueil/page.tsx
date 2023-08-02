'use client'

import React, { useState } from 'react'
import NumberCards from '@/components/UIElements/NumberCards'
import DefaultCalendar from '@/components/UIElements/DefaultCalendar'
import ViewBtn from "@/components/UIElements/ViewBtn"

import {
    apiIntervenList,
    apiPanneCritiqueList
} from "@/data/homePage"
import { AiFillEye } from "react-icons/ai"
import { useRouter } from 'next/navigation'
import InterventionState from "@/components/UIElements/InterventionState"
import InterventionType from '@/types/intervention'
import critiquePanneType from '@/types/critiquePanne'

export default function Home ({params}:{params: {username:string }}) {

    const baseUrl = "/dashboard/" + decodeURI(params.username)
    const router = useRouter()

    const [ equipTotal, setEquipTotal ] = useState(10)
    const [ subSysTotal, setSubSysTotal ] = useState(20)
    const [ pieceTotal, setPieceTotal ] = useState(8)
    const [ pannesTotal, setPannesTotal ] = useState(16)

    const [ apiInterventionList, setApiInterventionList ] = useState<Array<InterventionType>>(apiIntervenList)
    const [ apiCritiquePanneList, setApiCritiquePanneList ] = useState<Array<critiquePanneType>>(apiPanneCritiqueList)

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

    return(
        <div className="w-full h-full flex flex-col gap-4 justify-start items-center">
            <div className='w-full h-auto flex flex-row gap-2 justify-end items-start'>
                <div className='w-full flex flex-wrap gap-4 justify-start'>
                    {
                        totalList.map((total, index) => {
                            return  <NumberCards
                                        key={index}
                                        info = {total}
                                    />
                        })
                    }
                </div>
                <div className='w-full p-2 flex flex-col items-start justify-end bg-white rounded-2xl border border-slate-300'>
                    <div className='w-full pr-6 border-b border-slate-300 pb-2 items-center flex flex-row justify-between'>
                        <span className='text-center text-[24px] font-bold'>
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

            <div className="w-full p-2 bg-white rounded-2xl border border-slate-300">
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
                        <span className="text-zinc-800 text-2xl font-semibold uppercase leading-[52.11px]">Panne Critiques</span>
                        <span className="w-10 h-10 p-5 bg-sky-500 rounded-[100px] justify-center items-center inline-flex text-white text-base font-semibold">{apiCritiquePanneList.length}</span>
                    </div>
                    <ViewBtn
                        viewText = "Voir Plus"
                        href = {`${baseUrl}/equipements`}
                    />
                </div>
                <table className="w-full p-2 rounded-2xl border border-slate-400 flex-col justify-start items-start inline-flex">
                    <thead className="w-full bg-white border-b border-slate-400">
                        <tr className="w-full p-2 flex gap-1 text-black text-lg font-bold leading-7 tracking-tight">
                            <td className="w-[150px]">N°</td>
                            <td className="w-full">Nom</td>
                            <td className="w-full">Sous Système</td>
                            <td className="w-full capitalize">équipement</td>
                            <td className="w-full">Description</td>
                            <td className="w-[250px] text-center">Gravité</td>
                            <td className="w-full text-right">Action</td>
                        </tr>
                    </thead>
                    <tbody className="w-full h-[300px] overflow-auto">
                    {
                        apiCritiquePanneList.map((panne, index) => {
                            return <tr key={index} className="w-full p-2 flex gap-1 text-black text-lg font-medium leading-7 tracking-tight odd:bg-white even:bg-indigo-50">
                                <td className="w-[150px]">{index+1}</td>
                                <td className="w-full">{panne.nom}</td>
                                <td className="w-full">{panne.sousSysteme}</td>
                                <td className="w-full">{panne.equipement}</td>
                                <td className="w-full">{panne.description}</td>
                                <td className="w-[250px] text-center">{panne.gravite}</td>
                                <td className="w-full flex gap-1 justify-end items-start flex-wrap">
                                    <button onClick={()=>{router.push(`${baseUrl}/equipements/${panne.equipement}/${panne.sousSysteme}/pannes/${panne.nom}`)}} className="py-1 px-2 bg-white rounded-[100px] text-[#149FDA] border border-sky-500 justify-center items-center gap-1 inline-flex hover:bg-[#149FDA] hover:text-white">
                                        <AiFillEye size={20}/>
                                        <span>Détails</span>
                                    </button>
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}