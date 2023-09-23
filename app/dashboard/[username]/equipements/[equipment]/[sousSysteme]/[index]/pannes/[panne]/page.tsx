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
import ProtocolType from "@/types/protocol"

import {
    tempApiPannedetails,
    tempApiProtocolList
} from "@/data/panneDetailPage"
import { addAlert } from "@/redux/features/alerts/alertsSlice"
import { DISPLAYTIMEOUT } from "@/constants/time"
import { useAppDispatch } from "@/redux/hooks"

export default function Panne ({params}:{params: {username: string, equipment:string, sousSysteme: string, index:number, panne: number }}) {
    const subSysName = decodeURI(params.sousSysteme)
    const subSysIndex = params.index
    const panneId = params.panne
    const equipmentName = decodeURI(params.equipment)
    const username = decodeURI(params.username)
    const router = useRouter()
    const dispatch = useAppDispatch()

    const [ apiPanneDetails, setApiPanneDetails ] = useState<PanneType>({
        description: '',
        garvite: 0,
        id: 0,
        nom: ''
    })

    const [ apiProtocolList, setApiProtocolList ] = useState<Array<ProtocolType>>(tempApiProtocolList)
    const [ displayProtocolList, setDisplayProtocolList ] = useState<Array<ProtocolType>>(apiProtocolList)
    
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
        setGravitePanne(apiPanneDetails.garvite)
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

    const deletePanne = async () => {
        try {
            const response = await fetch('/api/equipements/sous-systeme/panne/supprimer/'+params.panne, {
                method: 'DELETE',
                body: JSON.stringify({})
            })
            const json = await response.json()
            const { message } = json
            if(!message){
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: json.error}))
                }, DISPLAYTIMEOUT)
                closeModal()
                return
            }
            closeModal()
            router.back()
        } catch (error: any) {
            setTimeout(() => {
                dispatch(addAlert({type: 'FAILURE', message: error}))
            }, DISPLAYTIMEOUT)
        }
        closeModal()
    }

    const updatePanne = async () => {
        let tempPanneName = apiPanneDetails.nom
        if(isUpdatePanneValid){
            const tempPanne = {
                nom: nomPanne,
                garvite: gravitePanne,
                description: descriptionPanne,
            }
            try {
                const response = await fetch('/api/equipements/sous-systeme/panne/editer/'+params.panne, {
                    method: 'PATCH',
                    body: JSON.stringify(tempPanne)
                })
                const json = await response.json()
                const { panne } = json
                if (!panne){
                    setTimeout(() => {
                        dispatch(addAlert({type: 'FAILURE', message: json.error}))
                    }, DISPLAYTIMEOUT)
                    closeModal()
                    return
                }
                setApiPanneDetails(panne)
                setTimeout(() => {
                    dispatch(addAlert({type: 'SUCCESS', message: 'Panne mise à jour reussi'}))
                }, DISPLAYTIMEOUT)
                if(tempPanneName !== tempPanne.nom){
                    router.back()
                }
            } catch (error: any) {
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: error}))
                }, DISPLAYTIMEOUT)
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

    const addProtocol = async () => {
        if(isProtoFormValid){
            const tempProto = {
                description: descriptionProtocol,
                panne_id:panneId,
            }
            try {
                const response = await fetch('/api/equipements/sous-systeme/panne/protocol/ajouter', {
                    method: 'POST',
                    body: JSON.stringify(tempProto)
                });
                const json = await response.json()
                const { protocol } = json
                if(!protocol){
                    closeModal()
                    return
                }
                closeModal()
                setApiProtocolList([...apiProtocolList, protocol])
                setTimeout(() => {
                    dispatch(addAlert({type: 'SUCCESS', message: 'Protocol ajouté avec succes'}))
                }, DISPLAYTIMEOUT)
            } catch (error) {
                console.log(error)
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: 'Echec de la Création du Protocol'}))
                }, DISPLAYTIMEOUT)
            }
        }
    }

    const updateProtocol = async () => {
        if(isProtoFormValid){
            try {
                let tempProtoList = [...apiProtocolList]

                const response = await fetch('/api/equipements/sous-systeme/panne/protocol/editer/'+tempProtoList[selectedProtocol].id, {
                    method: 'PATCH',
                    body: JSON.stringify({description: descriptionProtocol})
                });
                const json = await response.json()
                const { protocol } = json
                if(!protocol){
                    closeModal()
                    return
                }

                closeModal()
                tempProtoList = tempProtoList.map(proto => (
                    (proto.id === protocol.id) ? { ...proto, ...protocol } : proto));
                setApiProtocolList(tempProtoList)
                setTimeout(() => {
                    dispatch(addAlert({type: 'SUCCESS', message: 'Mise à jour du Protocol avec succes'}))
                }, DISPLAYTIMEOUT)
            } catch (error) {
                console.log(error)
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: 'Echec de la Mise à jour du Protocol'}))
                }, DISPLAYTIMEOUT)
            }
            closeModal()
        }
    }
    
    const deleteProtocol = async () => {
        try {
            let tempProtoList = [...apiProtocolList]

            const response = await fetch('/api/equipements/sous-systeme/panne/protocol/supprimer/'+tempProtoList[selectedProtocol].id, {
                method: 'DELETE',
                body: JSON.stringify({})
            });
            const json = await response.json()
            const { message } = json
            if(!message){
                closeModal()
                return
            }
            tempProtoList.splice(selectedProtocol,1)
            closeModal()
            setApiProtocolList(tempProtoList)
            setTimeout(() => {
                dispatch(addAlert({type: 'SUCCESS', message: 'Protocol Supprimé avec succes'}))
            }, DISPLAYTIMEOUT)
        } catch (error) {
            console.log(error)
            setTimeout(() => {
                dispatch(addAlert({type: 'FAILURE', message: 'Echec de la Suppression du Protocol'}))
            }, DISPLAYTIMEOUT)
        }
        closeModal()
    }

    useEffect(()=>{
        const loadPanne = async () => {
            try {
                const response = await fetch('/api/equipements/sous-systeme/panne/'+params.panne)
                const json = await response.json()
                const { panne } = json
                if(!panne){
                    setTimeout(() => {
                        dispatch(addAlert({type: 'FAILURE', message: json.error}))
                    }, DISPLAYTIMEOUT)
                    return
                }
                setApiPanneDetails(panne)
                setTimeout(() => {
                    dispatch(addAlert({type: 'SUCCESS', message: 'Panne chargée avec Succès'}))
                }, DISPLAYTIMEOUT)
            } catch (error: any) {
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: "Erreur de Chargement de la Panne"}))
                }, DISPLAYTIMEOUT)
                return
            }
        }
        const loadProtocols = async ()=>{
            try {
                const response = await fetch(`/api/equipements/sous-systeme/panne/${panneId}/protocols`)
                const json = await response.json();
                const { protocols } = json
                if (!protocols){
                    setTimeout(() => {
                        dispatch(addAlert({type: 'FAILURE', message: json.error}))
                    }, DISPLAYTIMEOUT)
                    return
                };
                console.log(protocols)
                setApiProtocolList(protocols)
                setTimeout(() => {
                    dispatch(addAlert({type: 'SUCCESS', message: 'Protocols chargées avec Succès'}))
                }, DISPLAYTIMEOUT)
            } catch (error) {
                console.log(error)
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: "Erreur de Chargement des Protocols"}))
                }, DISPLAYTIMEOUT)
                return
            }
        }
        loadPanne()
        loadProtocols()
    },[dispatch, params.panne, panneId])

    useEffect(()=>{
        setDisplayProtocolList(apiProtocolList)
    },[apiProtocolList])

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
        <div className="w-full h-full overflow-y-auto bg-white rounded-2xl shadow drop-shadow-md p-2 flex-col justify-start items-center gap-2 flex">
            <div className="w-full justify-start items-center inline-flex gap-1">
                <Link href={`/dashboard/${username}/equipements/${equipmentName}`} className="text-[#165081] text-[24px] font-semibold uppercase">Équipement</Link>
                <Link href={`/dashboard/${username}/equipements/${equipmentName}/${subSysName}/${subSysIndex}`} className="text-[#0B5DA7] text-[24px] font-semibold uppercase"> - {subSysName}</Link>
                <span className="text-zinc-800 text-[24px] font-semibold uppercase"> - Pannes</span>
            </div>

            <div className="w-full h-full p-2 bg-white rounded-2xl border border-slate-300 flex-col justify-start items-center gap-2.5 inline-flex">
                <div className="w-full flex-col justify-start items-start gap-2 inline-flex">
                    <div className="flex-col justify-start items-start inline-flex">
                        <span className="text-black text-[26px] font-semibold uppercase">{apiPanneDetails.nom}</span>
                        <div className="justify-start items-baseline gap-[4px] inline-flex">
                            <span className="text-black text-[18px] font-normal leading-loose">Gravité: </span>
                            <span className="text-black text-[20px] font-semibold">{apiPanneDetails.garvite}</span>
                        </div>
                        <div className="justify-start items-baseline gap-[4px] inline-flex">
                            <span className="text-black text-[18px] font-normal leading-loose">Description: </span>
                            <span className="text-black text-[20px] font-semibold">{apiPanneDetails.description}</span>
                        </div>
                    </div>
                    {apiPanneDetails.nom !== "" && <div className="w-full pr-2 flex flex-row gap-3 justify-start">
                        <DeleteBtn deleteAction={()=>{setDelPanneModalVisibility(true)}}/>
                        <UpdateBtn updateAction={()=>{initialiseUpdateParams()
                                                        setUpdatePanneModalVisibility(true)}}/>
                    </div>}
                </div>

                {/* Liste des protocoles preventifs ci-dessous */}
                <div className="w-full h-full flex flex-col">
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

                    <div className="w-full h-full inline-flex gap-4 pt-2 justify-start items-start flex-wrap overflow-auto">
                        <table className="w-full h-full p-2 rounded-2xl border border-slate-400 flex-col justify-start items-start inline-flex">
                            <thead className="w-full bg-white border-b border-slate-400">
                                <tr className="w-full p-2 flex gap-1 text-black text-lg font-bold leading-7 tracking-tight">
                                    <td className="w-[150px]">N°</td>
                                    <td className="w-full">Protocols</td>
                                    <td className="w-full text-right">Action</td>
                                </tr>
                            </thead>
                            <tbody className="w-full overflow-auto">
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
                deleteText = {<span>Vous êtes sur le point de supprimer la panne <span className='font-bold'>{apiPanneDetails.nom}</span> du sous système <span className='font-bold'>{subSysName}</span> et tout les <span className='font-bold'>{apiProtocolList.length}</span> protocols préventif associés à cette panne. Voulez-vous poursuivre ?</span>}
                modalWidth = {600}
                closeModalAction = {closeModal}
                deleteAction = {deletePanne}
            />

            {/* Update Panne Modal */}
            <Modal
                modalTitle="Modifier la Panne"
                isVisible={isUpdatePanneModal}
                isDeleteModalVisible = {false}
                isAddStock={true}
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
                isAddStock={true}
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
                modalTitle={`Modifier le Protocol N° ${selectedProtocol+1}`}
                isVisible={isUpdateProtoModal}
                isDeleteModalVisible = {false}
                isAddStock={true}
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
                        <TextAreaField label="Description du Protocol" defaultValue={apiProtocolList[selectedProtocol]?.description} setNewValue={setDescriptionProtocol} />
                    </div>
                </div>
            </Modal>

            {/* Delete Protocol Modal */}
            <Modal
                modalTitle={`Supprimer le Protocol N° ${selectedProtocol+1}`}
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