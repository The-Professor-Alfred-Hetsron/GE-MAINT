'use client'

import React, { useState, useEffect } from 'react'
import NumberCards from '@/components/UIElements/NumberCards'
import DefaultCalendar from '@/components/UIElements/DefaultCalendar'
import ViewBtn from "@/components/UIElements/ViewBtn"

import InterventionType from '@/types/intervention'
import Modal from '@/components/UIElements/Modal'

import { useAppDispatch } from "@/redux/hooks"
import { addAlert } from "@/redux/features/alerts/alertsSlice"
import { DISPLAYTIMEOUT } from "@/constants/time"

import InterventionActionBtn from '@/components/UIElements/InterventionActionBtn'
import InterventionState from '@/components/UIElements/InterventionState'
import { useRouter } from 'next/navigation'

export default function Home ({params}:{params: {username:string }}) {

    const username = decodeURI(params.username)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const baseUrl = "/dashboard/" + username

    const [ userRole, setUserRole ] = useState<string|null>("Responsable")

    const [ equipTotal, setEquipTotal ] = useState(0)
    const [ subSysTotal, setSubSysTotal ] = useState(0)
    const [ pieceTotal, setPieceTotal ] = useState(0)
    const [ pannesTotal, setPannesTotal ] = useState(0)

    const [ isDetailModal, setDetailModalVisibility ] = useState<boolean>(false)
    const [ selectedInterven, setSelectedInterven ] = useState<{index:number, status:string}>({index:0, status:""})

    const [ apiDemandList, setApiDemandList ] = useState<Array<InterventionType>>([])
    const [ apiRaportList, setApiRaportList ] = useState<Array<InterventionType>>([])


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
        setSelectedInterven({index:0, status:""})

    }

    useEffect(() => {
        const loadEquipements = async () => {
            const response = await fetch('/api/equipements/count')
            const json = await response.json()
            // console.log(json)
            const { count } = json
            if (!count) return;
            setEquipTotal(count)
        }
        const loadSubsystems = async () => {
            const response = await fetch('/api/equipements/sous-systeme/count')
            const json = await response.json()
            // console.log(json)
            const { count } = json
            if (!count) return;
            setSubSysTotal(count)
        }
        const loadPieces = async () => {
            const response = await fetch('/api/equipements/sous-systeme/pieces/count')
            const json = await response.json()
            // console.log(json)
            const { count } = json
            if (!count) return;
            setPieceTotal(count)
        }
        const loadPannes = async () => {
            const response = await fetch('/api/equipements/sous-systeme/panne/count')
            const json = await response.json()
            console.log(json)
            const { count } = json
            if (!count) return;
            setPannesTotal(count)
        }
        loadEquipements()
        loadSubsystems()
        loadPieces()
        loadPannes()

    }, [])

    useEffect(()=>{
        const loadInterventions = async() => {
            try {
                const response = await fetch('/api/equipements/sous-systeme/panne/intervention/demandeRaport')
                const json = await response.json()
                const { interventions } = json
                if (!interventions) return
                // console.log(interventions.length)

                if(interventions.length > 0){
                    const tempArray:InterventionType[] = []
                    for (let i = 0; i < interventions.length; i++) {
                        const interven = interventions[i];
                        const response1 = await fetch('/api/equipements/sous-systeme/panne/'+interven.panne_id)
                        const json1 = await response1.json();
                        const { panne } = json1
                        if (!panne) return;

                        const response2 = await fetch("/api/equipements/sous-systeme/"+panne.soussysteme_id)
                        const json2 = await response2.json()
                        const { sousSysteme } = json2
                        if (!sousSysteme) return;

                        const response3 = await fetch('/api/equipements/'+sousSysteme.equipement_id)
                        const json3 = await response3.json()
                        const { equipement } = json3
                        if (!equipement) return;
                        
                        const intervenObj: InterventionType = {
                            id:interven.id,
                            panneId:panne.id,
                            panne: panne.nom,
                            sousSystemeId:sousSysteme.id,
                            sousSysteme: sousSysteme.nom,
                            equipementId:equipement.id,
                            equipement: equipement.nom,
                            etatEquipementInitial: interven.etat_initial,
                            demanderPar: interven.demander_par,
                            executant: interven.executant?interven.executant:"",
                            debutIntervention: interven.debut_intervention?interven.debut_intervention:"",
                            finIntervention: interven.fin_intervention?interven.fin_intervention:"",
                            etatEquipementFinal: interven.etat_final?interven.etat_final:"",
                            observation: interven.observation?interven.observation:"",
                            etat: interven.statut
                        }
                        tempArray.splice(0,0,intervenObj)
                        // console.log(tempArray)
                    }
                    setApiDemandList(tempArray.filter((int:InterventionType)=>{
                        return int.etat === "En Attente"
                    }))
                    setApiRaportList(tempArray.filter((int:InterventionType)=>{
                        return int.etat === "Rapport"
                    }))
                    setTimeout(() => {
                        dispatch(addAlert({type: 'SUCCESS', message: 'Interventions chargées avec succes'}))
                    }, DISPLAYTIMEOUT)
                }else{
                    setTimeout(() => {
                        dispatch(addAlert({type: 'SUCCESS', message: 'Aucune Interventions Enregistrées'}))
                    }, DISPLAYTIMEOUT)
                }
            } catch (error) {
                console.log(error)
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: 'Echec du chargement des Interventions, verifier votre Connexion'}))
                }, DISPLAYTIMEOUT)
            }
        }
        loadInterventions()
        setUserRole(localStorage.getItem('role'))
    },[dispatch])

    return(
        <div className="w-full h-full p-2 flex flex-col gap-8 justify-start items-center overflow-y-auto">
            <div className='w-full flex flex-col gap-4 justify-end items-start' style={{}}>
                <div className='w-full z-10 flex flex-auto flex-row flex-wrap gap-4'>
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

            <div className="w-full p-2 bg-white rounded-2xl border border-slate-300">
                <div className="w-full justify-between items-center inline-flex">
                    <div className='flex flex-row justify-start gap-4 items-center'>
                        <span className="text-zinc-800 text-2xl font-semibold uppercase leading-[52.11px]">Demande D’Interventions</span>
                        <span className="w-10 h-10 p-5 bg-sky-500 rounded-[100px] justify-center items-center inline-flex text-white text-base font-semibold">{apiDemandList.length}</span>
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
                            <td className="w-full capitalize text-center">Statut</td>
                            <td className="w-full capitalize text-center">Action</td>
                        </tr>
                    </thead>
                    <tbody className="w-full h-[200px] overflow-auto">
                    {
                        apiDemandList.map((intervention, index) => {
                            return <tr key={index} className="w-full p-2 flex gap-1 text-black text-lg font-medium leading-7 tracking-tight odd:bg-white even:bg-indigo-50">
                                <td className="w-[150px]">{index+1}</td>
                                <td className="w-full">{intervention.panne}</td>
                                <td className="w-full">{intervention.sousSysteme}</td>
                                <td className="w-full text-center">{intervention.demanderPar}</td>
                                <td className="w-full capitalize text-center">{intervention.etatEquipementInitial}</td>
                                <td className="w-full flex justify-center items-center text-center"><InterventionState state={intervention.etat}/></td>
                                <td className="w-full flex gap-1 justify-end items-start flex-wrap">
                                    <InterventionActionBtn
                                        state={intervention.etat}
                                        adminRole= "Personnel"
                                        viewIntervention={()=>{setDetailModalVisibility(true)
                                                                setSelectedInterven({index:index, status:intervention.etat})}}
                                    />
                                </td>
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
                        <span className="w-10 h-10 p-5 bg-sky-500 rounded-[100px] justify-center items-center inline-flex text-white text-base font-semibold">{apiRaportList.length}</span>
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
                            <td className="w-full capitalize text-center">Statut</td>
                            <td className="w-full capitalize text-center">Action</td>
                        </tr>
                    </thead>
                    <tbody className="w-full h-[200px] overflow-auto">
                    {
                        apiRaportList.map((intervention, index) => {
                            return <tr key={index} className="w-full p-2 flex gap-1 text-black text-lg font-medium leading-7 tracking-tight odd:bg-white even:bg-indigo-50">
                                <td className="w-[150px]">{index+1}</td>
                                <td className="w-full">{intervention.panne}</td>
                                <td className="w-full">{intervention.sousSysteme}</td>
                                <td className="w-full text-center">{intervention.demanderPar}</td>
                                <td className="w-full capitalize text-center">{intervention.etatEquipementInitial}</td>
                                <td className="w-full flex justify-center items-center text-center"><InterventionState state={intervention.etat}/></td>
                                <td className="w-full flex gap-1 justify-end items-start flex-wrap">
                                    <InterventionActionBtn
                                        state={intervention.etat}
                                        adminRole= {userRole}
                                        viewIntervention={()=>{setDetailModalVisibility(true)
                                                                setSelectedInterven({index:index, status:intervention.etat})}}
                                    />
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>

            {/* View Intervention Detail Modal */}
            <Modal
                modalTitle="Details de l'Intervention"
                isVisible={isDetailModal}
                isDeleteModalVisible = {false}
                isDetailIntervention={isDetailModal}
                index= {selectedInterven.index+1}
                interventionInfo = {selectedInterven.status==="Rapport"?apiRaportList[selectedInterven.index]:apiDemandList[selectedInterven.index]}
                validateIntervention={()=>{router.push(`${baseUrl}/interventions`)}}
                username = {username}
                modalWidth = {650}
                closeModalAction = {closeModal}
            />
        </div>
    )
}