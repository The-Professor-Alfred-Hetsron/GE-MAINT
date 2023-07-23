'use client'

import Link from "next/link"
import { useRouter } from 'next/navigation'

import AddBtn from "@/components/UIElements/AddBtn"
import DeleteBtn from '@/components/UIElements/DeleteBtn'
import UpdateBtn from '@/components/UIElements/UpdateBtn'
import InputSearchField from "@/components/UIElements/FormElments/InputSearchField"
import InputField from "@/components/UIElements/FormElments/InputField"
import Modal from "@/components/UIElements/Modal"
import TextAreaField from "@/components/UIElements/FormElments/TextAreaField"

import { useState, useEffect } from "react"
import { RiDeleteBin6Line } from "react-icons/ri"
import { FaRegEdit } from "react-icons/fa"
import PanneType from "@/types/panne"

export default function Panne ({params}:{params: {username: string, equipment:string, sousSysteme: string, panne: string }}) {
    const subSysName = decodeURI(params.sousSysteme)
    const equipmentName = decodeURI(params.equipment)
    const username = decodeURI(params.username)
    const router = useRouter()

    const [ apiPanneDetails, setApiPanneDetails ] = useState<PanneType>({
        nom: "Nom Panne1",
        description: "La description de la panne 1, voici ce qu’il faut faire",
        gravite: 2
    })

    const [ apiProtocolList, setApiProtocolList ] = useState<Array<{description:string}>>([
        {
            description: "la description, voici ce qu’il faut faire"
        },
        {
            description: "la description, voici ce qu’il faut faire"
        },
        {
            description: "la description, voici ce qu’il faut faire"
        },
        {
            description: "la description, voici ce qu’il faut faire"
        },
        {
            description: "la description, voici ce qu’il faut faire"
        }
    ])
    const [ displayProtocolList, setDisplayProtocolList ] = useState<Array<{description:string}>>(apiProtocolList)
    
    // Panne Information Start
    const [ nomPanne, setNomPanne ] = useState<string>("")
    const [ descriptionPanne, setDescriptionPanne ] = useState<string>("")
    const [ gravitePanne, setGravitePanne ] = useState<number>(0)
    // Panne Information End

    // Protocol Information Start
    const [ descriptionProtocol, setDescriptionProtocol ] = useState<string>("")
    // Protocol Information End

    const [ isDelPanneModal, setDelPanneModalVisibility ] = useState<boolean>(false)
    const [ isUpdatePanneModal, setUpdatePanneModalVisibility ] = useState<boolean>(false)
    const [ isAddProtocolModal, setAddProtocolModalVisibility ] = useState<boolean>(false)
    const [ isUpdateProtoModal, setUpdateProtModalVisibility] = useState<boolean>(false)
    const [ isDelProtoModal, setDelProtoModalVisibility] = useState<boolean>(false)

    const [ isUpdatePanneValid, setUpdatePanneValidity ] = useState<boolean>(false)
    const [ isProtoFormValid, setProtoFormValidity ] = useState<boolean>(false)
    const [ selectedProtocol, setSelectedProtocol ] = useState<number>(0)

    const initialiseUpdateParams = () => {
        setNomPanne(apiPanneDetails.nom)
        setDescriptionPanne(apiPanneDetails.description)
        setGravitePanne(apiPanneDetails.gravite)
    }

    const initialisePanneParams = () => {
        setNomPanne("")
        setDescriptionPanne("")
        setGravitePanne(0)
    }

    const initialiseProtoParams = () => {
        setDescriptionProtocol("")
        setProtoFormValidity(false)
    }

    const initialiseUpdateProtoParams = (index:number) => {
        setDescriptionProtocol(apiProtocolList[index].description)
    }

    const closeModal = () => {
        setDelPanneModalVisibility(false)
        setUpdatePanneModalVisibility(false)
        setUpdatePanneValidity(false)
        initialisePanneParams()

        setAddProtocolModalVisibility(false)
        setUpdateProtModalVisibility(false)
        setDelProtoModalVisibility(false)
        setProtoFormValidity(false)

        initialiseProtoParams()
        setSelectedProtocol(0)
    }

    const deletePanne = () => {
        closeModal()
        router.push(`/dashboard/${username}/equipements/${equipmentName}/${subSysName}`)
    }

    const updatePanne = () => {
        let tempPanneName = apiPanneDetails.nom
        if(isUpdatePanneValid){
            const tempPanne = {
                nom: nomPanne,
                gravite: gravitePanne,
                description: descriptionPanne,
            }
            setApiPanneDetails(tempPanne)
            if(tempPanneName !== tempPanne.nom){
                router.push(`/dashboard/${username}/equipements/${equipmentName}/${subSysName}/pannes/${tempPanne.nom}`)
            }
            closeModal()
        }
    }

    const sortProtocolList = (value: string) => {
        if(value !== ""){
            let tempList = [...apiProtocolList]
            tempList = apiProtocolList.filter((protocole)=>{
                return protocole.description.toLowerCase().trim().includes(value.toLowerCase().trim())
            })
            if(tempList.length > 0) {
                setDisplayProtocolList(tempList)
            }
        }
        else{
            setDisplayProtocolList(apiProtocolList)
        }
    }

    const addProtocol = () => {
        if(isProtoFormValid){
            const tempProto = {
                description: descriptionProtocol
            }
            setApiProtocolList([...apiProtocolList, tempProto])
            closeModal()
        }
    }

    const updateProtocol = () => {
        if(isProtoFormValid){
            const tempProto = {
                description: descriptionProtocol
            }
            let tempProtoList = [...apiProtocolList]
            tempProtoList[selectedProtocol]["description"] = tempProto.description
            setApiProtocolList(tempProtoList)
            closeModal()
        }
    }
    
    const deleteProtocol = () => {
        let tempList = [...apiProtocolList]
        tempList.splice(selectedProtocol,1)
        setApiProtocolList(tempList)
        closeModal()
    }

    
    useEffect(()=>{
        if(nomPanne!=="" && gravitePanne>0 &&
            gravitePanne<5 && descriptionPanne!== ""){
            setUpdatePanneValidity(true)
        }
    },[nomPanne, gravitePanne, descriptionPanne])

    useEffect(()=> {
        if(descriptionProtocol !== ""){
            setProtoFormValidity(true)
        }
    },[descriptionProtocol])

    

    return(
        <div className="w-full h-full bg-white rounded-2xl shadow backdrop-blur-[20px] p-2 flex-col justify-start items-center gap-2 flex">
            <div className="w-full justify-start items-center inline-flex gap-1">
                <Link href={`/dashboard/${username}/equipements/${equipmentName}`} className="text-[#165081] text-[24px] font-semibold uppercase">{equipmentName}</Link>
                <Link href={`/dashboard/${username}/equipements/${equipmentName}/${subSysName}`} className="text-[#0B5DA7] text-[24px] font-semibold uppercase"> - {subSysName}</Link>
                <span className="text-zinc-800 text-[24px] font-semibold uppercase"> - Pannes</span>
            </div>

            <div className="w-full h-full p-2 bg-white rounded-2xl border border-slate-300 flex-col justify-start items-center gap-2.5 inline-flex">
                <div className="w-full flex-col justify-start items-start gap-2 inline-flex">
                    <div className="flex-col justify-start items-start inline-flex">
                        <span className="text-black text-[26px] font-semibold uppercase">{(decodeURI(params.panne))}</span>
                        <div className="justify-start items-baseline gap-[4px] inline-flex">
                            <span className="text-black text-[18px] font-normal leading-loose">Gravité: </span>
                            <span className="text-black text-[20px] font-semibold">{apiPanneDetails.gravite}</span>
                        </div>
                        <div className="justify-start items-baseline gap-[4px] inline-flex">
                            <span className="text-black text-[18px] font-normal leading-loose">Description: </span>
                            <span className="text-black text-[20px] font-semibold">{apiPanneDetails.description}</span>
                        </div>
                    </div>
                    <div className="w-full pr-2 flex flex-row gap-3 justify-start">
                        <DeleteBtn deleteAction={()=>{setDelPanneModalVisibility(true)}}/>
                        <UpdateBtn updateAction={()=>{initialiseUpdateParams()
                                                        setUpdatePanneModalVisibility(true)}}/>
                    </div>
                </div>

                {/* Liste des protocoles preventifs ci-dessous */}
                <div className="w-full flex flex-col">
                    <div className="w-full pb-2 border-b border-slate-300 justify-start items-center gap-2.5 inline-flex">
                        <div className="w-[410px] gap-2 flex flex-row justify-start items-center">
                            <span className="text-black text-[24px] font-normal">Protocols Préventif </span>
                            <span className="w-8 h-8 p-5 bg-sky-500 rounded-[100px] justify-center items-center inline-flex text-white text-base font-semibold">{apiProtocolList.length}</span>
                        </div>
                        <div className="w-full justify-end items-center gap-4 flex">
                            <InputSearchField placeholder="Rechercher un Protocol" setNewSearchValue={sortProtocolList}/>
                            <AddBtn width={450} placeholder="Nouveau Protocol" addFunction={()=>{setAddProtocolModalVisibility(true)}}/>
                        </div>
                    </div>

                    <div className="inline-flex gap-4 py-2 justify-start items-start flex-wrap overflow-auto">
                        <table className="w-full p-2 rounded-2xl border border-slate-400 flex-col justify-start items-start inline-flex">
                            <thead className="w-full bg-white border-b border-slate-400">
                                <tr className="w-full p-2 flex gap-1 text-black text-lg font-bold leading-7 tracking-tight">
                                    <td className="w-[150px]">N°</td>
                                    <td className="w-full">Protocols</td>
                                    <td className="w-full text-right">Action</td>
                                </tr>
                            </thead>
                            <tbody className="w-full h-[400px] overflow-auto">
                            {
                                displayProtocolList.map((protocole, index) => {
                                    return <tr key={index} className="w-full p-2 flex gap-1 text-black text-lg font-medium leading-7 tracking-tight odd:bg-white even:bg-indigo-50">
                                        <td className="w-[150px]">{index+1}</td>
                                        <td className="w-full">{protocole.description}</td>
                                        <td className="w-full flex gap-1 justify-end items-start flex-wrap">
                                            <button onClick={()=>{initialiseUpdateProtoParams(index)
                                                                    setSelectedProtocol(index)
                                                                    setUpdateProtModalVisibility(true)}} className="py-1 px-2 bg-white rounded-[100px] text-[#149FDA] border border-sky-500 justify-center items-center gap-1 inline-flex hover:bg-[#149FDA] hover:text-white">
                                                <FaRegEdit size={20}/>
                                                <span>Modifier</span>
                                            </button>
                                            <button onClick={()=>{setSelectedProtocol(index)
                                                                    setDelProtoModalVisibility(true)}} className="py-1 px-2 bg-white rounded-[100px] text-[#EA4335] border border-red-500 justify-center items-center gap-1 inline-flex hover:bg-[#EA4335] hover:text-white">
                                                <RiDeleteBin6Line size={20}/>
                                                <span>Supprimer</span>
                                            </button>
                                        </td>
                                    </tr>
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Delete Panne Modal */}
            <Modal
                modalTitle="Supprimer la Panne"
                isVisible={isDelPanneModal}
                isDeleteModalVisible = {isDelPanneModal}
                deleteText = {<span>Vous êtes sur le point de supprimer la panne <span className='font-bold'>{apiPanneDetails.nom}</span> du sous système <span className='font-bold'>{}</span> et tout les protocols préventif associés à cette panne. Voulez-vous poursuivre ?</span>}
                modalWidth = {600}
                closeModalAction = {closeModal}
                deleteAction = {deletePanne}
            />

            {/* Update Panne Modal */}
            <Modal
                modalTitle="Modifier la Panne"
                isVisible={isUpdatePanneModal}
                isDeleteModalVisible = {false}
                modalWidth = {'80%'}
                closeModalAction = {closeModal}
                addBtnLabel="Modifier"
                addNewAction = {updatePanne}
            >
                <div className="w-full flex flex-row justify-center gap-4">
                    <div className="w-full flex flex-col justify-start gap-4">
                        <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                            Caractéristiques
                        </span>
                        <InputField label="Nom" defaultValue={nomPanne} setNewValue={setNomPanne} />
                        <InputField label="Gravité" defaultValue={gravitePanne} type="Number" minValue={1} maxValue={4} setNewValue={setGravitePanne} />
                        <TextAreaField label="Description" defaultValue={descriptionPanne} setNewValue={setDescriptionPanne} />
                    </div>
                </div>
            </Modal>

            {/* Add Protocol Modal */}
            <Modal
                modalTitle="Nouveau Protocol"
                isVisible={isAddProtocolModal}
                isDeleteModalVisible = {false}
                modalWidth = {'80%'}
                closeModalAction = {closeModal}
                addBtnLabel="Ajouter"
                addNewAction = {addProtocol}
            >
                <div className="w-full flex flex-row justify-center gap-4">
                    <div className="w-full flex flex-col justify-start gap-4">
                        <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                            Caractéristiques
                        </span>
                        <TextAreaField label="Description du Protocol" setNewValue={setDescriptionProtocol} />
                    </div>
                </div>
            </Modal>

            {/* Update Protocol Modal */}
            <Modal
                modalTitle="Modifier le Protocol"
                isVisible={isUpdateProtoModal}
                isDeleteModalVisible = {false}
                modalWidth = {'80%'}
                closeModalAction = {closeModal}
                addBtnLabel="Modifier"
                addNewAction = {updateProtocol}
            >
                <div className="w-full flex flex-row justify-center gap-4">
                    <div className="w-full flex flex-col justify-start gap-4">
                        <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                            Caractéristiques
                        </span>
                        <TextAreaField label="Description du Protocol" defaultValue={apiProtocolList[selectedProtocol].description} setNewValue={setDescriptionProtocol} />
                    </div>
                </div>
            </Modal>

            {/* Delete Protocol Modal */}
            <Modal
                modalTitle="Supprimer le Protocol"
                isVisible={isDelProtoModal}
                isDeleteModalVisible = {isDelProtoModal}
                deleteText = {<span>Vous êtes sur le point de supprimer le protocole préventif numéro <span className='font-bold'>{selectedProtocol+1}</span> associé à la panne <span className='font-bold'>{apiPanneDetails.nom}</span>. Voulez-vous poursuivre ?</span>}
                modalWidth = {600}
                closeModalAction = {closeModal}
                deleteAction = {deleteProtocol}
            />
        </div>
    )
}