'use client'

import AddBtn from "@/components/UIElements/AddBtn"
import InputSearchField from "@/components/UIElements/FormElments/InputSearchField"
import InterventionState from "@/components/UIElements/InterventionState"
import InterventionActionBtn from "@/components/UIElements/InterventionActionBtn"
import Modal from "@/components/UIElements/Modal"

import InterventionType from '@/types/intervention'

import { useState, useEffect } from "react"

export default function Interventions ({params}:{params: {username:string}}) {
    const username = decodeURI(params.username)

    const [ apiInterventionList, setApiInterventionList ] = useState<Array<InterventionType>>([
        {
            panne: "Nom Panne1",
            sousSysteme: "Nom Sous Systeme1",
            equipement: "Nom Equipement",
            etatEquipementInitial: "Très Mal",
            demanderPar: "Nom Prénom",
            etat: "En Attente"
        },
        {
            panne: "Nom Panne1",
            sousSysteme: "Nom Sous Systeme1",
            equipement: "Nom Equipement",
            etatEquipementInitial: "Très Mal",
            demanderPar: "Nom Prénom",
            etat: "Validé",
            executant: "Nom Executant",
            debutIntervention: "12.06.2023",
            finIntervention: "12.06.2023"
        },
        {
            panne: "Nom Panne1",
            sousSysteme: "Nom Sous Systeme1",
            equipement: "Nom Equipement",
            etatEquipementInitial: "Très Mal",
            demanderPar: "Nom Prénom",
            etat: "Validé",
            executant: "Nom Executant",
            debutIntervention: "12.06.2023",
            finIntervention: "12.06.2023"
        },
        {
            panne: "Nom Panne1",
            sousSysteme: "Nom Sous Systeme1",
            equipement: "Nom Equipement",
            etatEquipementInitial: "Très Mal",
            demanderPar: "Nom Prénom",
            etat: "Rapport",
            executant: "Nom Executant",
            debutIntervention: "12.06.2023",
            finIntervention: "12.06.2023",
            etatEquipementFinal: "Fonctionnel",
            observation:"La panne a été retablit"
        },
        {
            panne: "Nom Panne1",
            sousSysteme: "Nom Sous Systeme1",
            equipement: "Nom Equipement",
            etatEquipementInitial: "Très Mal",
            demanderPar: "Nom Prénom",
            etat: "En Attente"
        },
        {
            panne: "Nom Panne1",
            sousSysteme: "Nom Sous Systeme1",
            equipement: "Nom Equipement",
            etatEquipementInitial: "Très Mal",
            demanderPar: "Nom Prénom",
            etat: "Rapport",
            executant: "Nom Executant",
            debutIntervention: "12.06.2023",
            finIntervention: "12.06.2023",
            etatEquipementFinal: "Fonctionnel",
            observation:"La panne a été retablit"
        },
        {
            panne: "Nom Panne1",
            sousSysteme: "Nom Sous Systeme1",
            equipement: "Nom Equipement",
            etatEquipementInitial: "Très Mal",
            demanderPar: "Nom Prénom",
            etat: "Rapport",
            executant: "Nom Executant",
            debutIntervention: "12.06.2023",
            finIntervention: "12.06.2023",
            etatEquipementFinal: "Fonctionnel",
            observation:"La panne a été retablit"
        },
        {
            panne: "Nom Panne1",
            sousSysteme: "Nom Sous Systeme1",
            equipement: "Nom Equipement",
            etatEquipementInitial: "Très Mal",
            demanderPar: "Nom Prénom",
            etat: "Rapport",
            executant: "Nom Executant",
            debutIntervention: "12.06.2023",
            finIntervention: "12.06.2023",
            etatEquipementFinal: "Fonctionnel",
            observation:"La panne a été retablit"
        },
        {
            panne: "Nom Panne1",
            sousSysteme: "Nom Sous Systeme1",
            equipement: "Nom Equipement",
            etatEquipementInitial: "Très Mal",
            demanderPar: "Nom Prénom",
            etat: "Rapport",
            executant: "Nom Executant",
            debutIntervention: "12.06.2023",
            finIntervention: "12.06.2023",
            etatEquipementFinal: "Fonctionnel",
            observation:"La panne a été retablit"
        },
        {
            panne: "Nom Panne1",
            sousSysteme: "Nom Sous Systeme1",
            equipement: "Nom Equipement",
            etatEquipementInitial: "Très Mal",
            demanderPar: "Nom Prénom",
            etat: "Rapport",
            executant: "Nom Executant",
            debutIntervention: "12.06.2023",
            finIntervention: "12.06.2023",
            etatEquipementFinal: "Fonctionnel",
            observation:"La panne a été retablit"
        }
    ])

    const [ displayIntervenList, setDisplayIntervenList] = useState<Array<InterventionType>>(apiInterventionList)

    const [ isAddModal, setAddModalVisibility ] = useState<boolean>(false)
    const [ isDetailModal, setDetailModalVisibility ] = useState<boolean>(false)

    const [ selectedInterven, setSelectedInterven ] = useState<number>(0)
    const [ isFormValid, setFormValidity ] = useState<boolean>(false)
    
    const closeModal = () => {
        setAddModalVisibility(false)
        setDetailModalVisibility(false)
        setSelectedInterven(0)
    }

    const sortInterventionList = (value: string) => {
        if(value !== ""){
            let tempList = [...apiInterventionList]
            tempList = apiInterventionList.filter((intervention)=>{
                return ((intervention.panne.toLowerCase().trim().includes(value.toLowerCase().trim())) ||
                        (intervention.sousSysteme.toLowerCase().trim().includes(value.toLowerCase().trim())) ||
                        (intervention.equipement.toLowerCase().trim().includes(value.toLowerCase().trim())) ||
                        (intervention.etatEquipementInitial.toLowerCase().trim().includes(value.toLowerCase().trim())) ||
                        (intervention.demanderPar.toLowerCase().trim().includes(value.toLowerCase().trim())) ||
                        (intervention.executant?.toLowerCase().trim().includes(value.toLowerCase().trim())) ||
                        (intervention.etat.toLowerCase().trim().includes(value.toLowerCase().trim())) ||
                        (intervention.etatEquipementFinal?.toLowerCase().trim().includes(value.toLowerCase().trim())) )
                        
            })
            if(tempList.length > 0) {
                setDisplayIntervenList(tempList)
            }
        }
        else{
            setDisplayIntervenList(apiInterventionList)
        }
    }

    useEffect(()=>{
        setDisplayIntervenList(apiInterventionList)
    },[apiInterventionList])

    return(
        <div className="w-full bg-white rounded-2xl shadow backdrop-blur-[20px] p-2 flex-col justify-start items-center gap-2 flex">
            <div className="w-full justify-start items-center gap-4 inline-flex">
                <span className="text-zinc-800 text-2xl font-semibold uppercase leading-[52.11px]">Interventions</span>
                <span className="w-10 h-10 p-5 bg-sky-500 rounded-[100px] justify-center items-center inline-flex text-white text-base font-semibold">{apiInterventionList.length}</span>
            </div>

            <div className="w-full h-full p-2 bg-white rounded-2xl border border-slate-300 flex-col justify-start items-center gap-2.5 inline-flex">
                <div className="w-full justify-between items-center gap-4 inline-flex">
                    <InputSearchField setNewSearchValue={sortInterventionList} placeholder="Rechercher une intervention: tout critère"/>
                    <AddBtn width={700} placeholder="Demander une Intervention" addFunction={()=>{setAddModalVisibility(true)}}/>
                </div>

                {/* Liste des interventions ci-dessous */}
                <div className="w-full flex flex-col gap-4 justify-start items-start flex-wrap">
                    <table className="w-full p-2 rounded-2xl border border-slate-400 flex-col justify-start items-start flex overflow-x-auto">
                        <thead className="w-full bg-white border-b border-slate-400">
                            <tr className="w-full p-2 flex gap-1 text-black text-lg font-bold leading-7 tracking-tight">
                                <td className="w-[150px]">N°</td>
                                <td className="w-full">Panne</td>
                                <td className="w-full text-center">Demandé par</td>
                                <td className="w-full capitalize text-center">état de l’équipement</td>
                                <td className="w-full capitalize text-center">état</td>
                                <td className="w-full text-center">Action</td>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                        {
                            displayIntervenList.map((intervention, index) => {
                                return <tr key={index} className="w-full p-2 flex gap-1 text-black text-lg font-medium leading-7 tracking-tight odd:bg-white even:bg-indigo-50">
                                    <td className="w-[150px]">{index+1}</td>
                                    <td className="w-full">{intervention.panne}</td>
                                    <td className="w-full text-center">{intervention.demanderPar}</td>
                                    <td className="w-full capitalize text-center">{intervention.etatEquipementInitial}</td>
                                    <td className="w-full flex justify-center items-center text-center"><InterventionState state={intervention.etat}/></td>
                                    <td className="w-full flex gap-1 justify-end items-start flex-wrap">
                                        <InterventionActionBtn
                                            state={intervention.etat}
                                            viewIntervention={()=>{setSelectedInterven(index)
                                                                    setDetailModalVisibility(true)}}
                                            validateIntervention={()=>{setSelectedInterven(index)}}
                                            reportIntervention={()=>{setSelectedInterven(index)}}
                                        />
                                    </td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Intervention Detail Modal */}
            <Modal
                modalTitle="Supprimer l'utilisateur"
                isVisible={isDetailModal}
                isDeleteModalVisible = {false}
                isDetailIntervention={isDetailModal}
                index= {selectedInterven}
                interventionInfo = {apiInterventionList[selectedInterven]}
                username = {username}
                modalWidth = {600}
                closeModalAction = {closeModal}
            />
        </div>
    )
}