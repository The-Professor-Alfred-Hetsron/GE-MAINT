'use client'

import Image from "next/image"
import Link from "next/link"
import { useRouter, usePathname } from 'next/navigation'

import DeleteBtn from '@/components/UIElements/DeleteBtn'
import UpdateBtn from '@/components/UIElements/UpdateBtn'
import AddBtn from "@/components/UIElements/AddBtn"
import SubsysPieceCard from '@/components/UIElements/SubsysPieceCard'
import InputSearchField from "@/components/UIElements/FormElments/InputSearchField"
import InputField from "@/components/UIElements/FormElments/InputField"
import TextAreaField from "@/components/UIElements/FormElments/TextAreaField"
import Modal from "@/components/UIElements/Modal"

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillEye } from "react-icons/ai";
import { BsUpload } from "react-icons/bs";

import PieceType from "@/types/piece"
import SubSystemType from "@/types/subSystem"
import PanneType from "@/types/panne"

import upload from "@/helpers/upload"
import { useAppDispatch } from "@/redux/hooks"
import { DISPLAYTIMEOUT } from "@/constants/time"
import { addAlert } from "@/redux/features/alerts/alertsSlice"
import RoundBar from "@/components/spiners/RoundBar"

export default function Equipment ({params}:{params: {username: string, equipment:string, sousSysteme: string, index: number }}) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const pathname = usePathname()
    const equipmentName = decodeURI(params.equipment)
    const username = decodeURI(params.username)
    //loaders
    const [isLoadingSubSystem, setIsLoadingSubSystem] = useState<boolean>(true)
    const [isLoadingSubSystemPieces, setIsLoadingSubSystemPieces] = useState<boolean>(true)
    const [isLoadingSubSystemPannes, setIsLoadingSubSystemPannes] = useState<boolean>(true)

    const [ apiSubSystemDetails, setApiSubSystemDetails ] = useState<SubSystemType>({
        id: 0,
        nom: "",
        marque_fabricant: "",
        numero_serie: "",
        modele: "string",
        description: "",
        image: "",
    })
    const [ apiPieceList, setApiPieceList ] = useState<Array<PieceType>>([])
    const [ displayPieceList, setDisplayPieceList ] = useState<Array<PieceType>>(apiPieceList)

    const [ apiPanneList, setApiPanneList ] = useState<Array<PanneType>>([])
    const [ displayPanneList, setDisplayPanneList ] = useState<Array<PanneType>>(apiPanneList)

    const [ isDelSubSysModal, setDelSubSysModalVisibility ] = useState<boolean>(false)
    const [ isUpdateSubSysModal, setUpdateSubSysModalVisibility ] = useState<boolean>(false)
    const [ isAddPieceModal, setAddPieceModalVisibility ] = useState<boolean>(false)
    const [ isDelPieceModal, setDelPieceModalVisibility ] = useState<boolean>(false)
    const [ isAddPanneModal, setAddPanneModalVisibility ] = useState<boolean>(false)
    const [ isDelPanneModal, setDelPanneModalVisibility ] = useState<boolean>(false)

    const [ selectedPiece, setSelectedPiece ] = useState<number>(0)
    const [ selectedPanne, setSelectedPanne ] = useState<number>(0)

    
    // Sub System Information Start
    const [ imageSubSys, setImageSubSys ] = useState<string | ArrayBuffer | undefined>(apiSubSystemDetails.image)
    const [ previewImageSubSys, setPreviewImageSubSys ] = useState<string | ArrayBuffer | undefined>(apiSubSystemDetails.image)
    const [ nomSubSys, setNomSubSys ] = useState<string>(apiSubSystemDetails.nom)
    const [ marqueSubSys, setMarqueSubSys ] = useState<string>(apiSubSystemDetails.marque_fabricant)
    const [ modeleSubSys, setModeleSubSys ] = useState<string>(apiSubSystemDetails.modele)
    const [ numSerieSubSys, setNumSerieSubSys ] = useState<string>(apiSubSystemDetails.numero_serie)
    const [ localisationSubSys, setLocalisationSubSys ] = useState<string>("")
    const [ descriptionSubSys, setDescriptionSubSys ] = useState<string>(apiSubSystemDetails.description)
    const [file, setFile] = useState<File | null>(null);
    // Sub System Information End
    const [ qteStockPiece, setQteStockPiece ] = useState<number>(0)
    const [ qteMinPiece, setQteMinPiece ] = useState<number>(0)

    // Panne Information Start
    const [ nomPanne, setNomPanne ] = useState<string>("")
    const [ descriptionPanne, setDescriptionPanne ] = useState<string>("")
    const [ gravitePanne, setGravitePanne ] = useState<number>(0)
    // Panne Information End

    const [ isUpdateFormValid, setUpdateFormValidity ] = useState<boolean>(false)
    const [ isAddPieceValid, setAddPieceValidity ] = useState<boolean>(false)
    const [ isAddPanneValid, setAddPanneValidity ] = useState<boolean>(false)

    const initialiseUpdateParams = () => {
        setImageSubSys(apiSubSystemDetails.image)
        setPreviewImageSubSys(apiSubSystemDetails.image)
        setNomSubSys(apiSubSystemDetails.nom)
        setMarqueSubSys(apiSubSystemDetails.marque_fabricant)
        setModeleSubSys(apiSubSystemDetails.modele)
        setNumSerieSubSys(apiSubSystemDetails.numero_serie)
        setLocalisationSubSys("")
        setDescriptionSubSys(apiSubSystemDetails.description)
    }
    const initialiseAddPieceParams = () => {
        setImageSubSys("")
        setPreviewImageSubSys("")
        setNomSubSys("")
        setMarqueSubSys("")
        setModeleSubSys("")
        setNumSerieSubSys("")
        setLocalisationSubSys("")
        setDescriptionSubSys("")

        setQteStockPiece(0)
        setQteMinPiece(0)
    }
    const initialiseAddPanneParams = () => {
        setNomPanne("")
        setDescriptionPanne("")
        setGravitePanne(0)
    }
    
    const closeModal = () => {
        setDelSubSysModalVisibility(false)
        setUpdateSubSysModalVisibility(false)

        setAddPieceModalVisibility(false)
        setDelPieceModalVisibility(false)
        setSelectedPiece(0)

        setAddPanneModalVisibility(false)
        setDelPanneModalVisibility(false)
        setSelectedPanne(0)
        initialiseAddPanneParams()

        setUpdateFormValidity(false)
        setAddPieceValidity(false)
        setAddPanneValidity(false)
    }

    const addImage = (event: React.ChangeEvent<HTMLInputElement>, setImage:Dispatch<SetStateAction<string | ArrayBuffer | undefined>>, setPreviewImage:Dispatch<SetStateAction<string | ArrayBuffer | undefined>>) => {
        const selectedFiles = event.target.files as FileList;
        const data = new FileReader()
        data.addEventListener("load", () =>{
            setImage(data.result? data.result: undefined)
        })
        data.readAsDataURL(selectedFiles?.[0])
        setFile(selectedFiles?.[0])
        setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
    }
    
    const deleteSubSys = async (index: number) => {
        console.log(index)
        const response = await fetch('/api/equipements/sous-systeme/retirer/'+index, {
            method: 'DELETE',
            body: JSON.stringify({})
        })
        const json = await response.json()
        const { message } = json
        if (!message) return
        console.log("Deleting Sub System From the Database through API calls")
        closeModal()
        router.push(`/dashboard/${username}/equipements/${equipmentName}`)
    }

    const updateSubSys = async (index: number) => {
        let tempSubSysName = apiSubSystemDetails.nom
        if(isUpdateFormValid){
            try {
                const tempSubSys = {
                    nom: nomSubSys,
                    marque_fabricant: marqueSubSys,
                    numero_serie: numSerieSubSys,
                    modele: modeleSubSys,
                    description: descriptionSubSys,
                }
                const response = await fetch('/api/equipements/sous-systeme/editer/'+params.index, {
                    method: 'PATCH',
                    body: JSON.stringify(tempSubSys)
                })
                const json = await response.json()
                const { sousSysteme } = json
                if (!sousSysteme) return
                setApiSubSystemDetails(sousSysteme)
                closeModal()
                if(tempSubSysName !== tempSubSys.nom){
                    router.push(`/dashboard/${username}/equipements/${equipmentName}/${sousSysteme.nom.replace(" ", '-')}/${sousSysteme.id}`)
                }
            } catch (error: any) {
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: error}))
                }, DISPLAYTIMEOUT)
            }
        }
    }

    const addNewPiece = async () => {
        if (!file) return
        if (!params.equipment) return;
        if(isAddPieceValid){
            let uploadedFilename: string = ''
            try {
                const data = {image: file as File}
                uploadedFilename = await upload(data)
                setTimeout(() => {
                    dispatch(addAlert({type: 'SUCCESS', message: 'Fichier téléchargé avec succes'}))
                }, DISPLAYTIMEOUT)
            } catch (error: any) {
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: error}))
                }, DISPLAYTIMEOUT)
            }
            if (!uploadedFilename) return;
            const tempPiece = {
                nom: nomSubSys,
                marque_fabricant: marqueSubSys,
                numero_serie: numSerieSubSys,
                modele: modeleSubSys,
                stock: qteStockPiece,
                minimum_stock: qteMinPiece,
                description: descriptionSubSys,
                image: uploadedFilename,
                soussysteme_id: params.index
            }
            try {
                const response = await fetch('/api/equipements/sous-systeme/pieces/ajouter', {
                    method: 'POST',
                    body: JSON.stringify(tempPiece)
                });
                const json = await response.json()
                const { piece } = json
                if (!piece) {
                    setTimeout(() => {
                        dispatch(addAlert({type: 'FAILURE', message: json.error}))
                    }, DISPLAYTIMEOUT)
                }
                setApiPieceList([...displayPieceList, piece])
                setTimeout(() => {
                    dispatch(addAlert({type: 'SUCCESS', message: 'Piece ajoutée'}))
                }, DISPLAYTIMEOUT)
            } catch (error: any) {
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: error}))
                }, DISPLAYTIMEOUT)
            }
            closeModal() 
        }
    }

    const sortPieceList = (value: string) => {
        if(value !== ""){
            let tempList = [...apiPieceList]
            tempList = apiPieceList.filter((piece)=>{
                return piece.nom.toLowerCase().trim().includes(value.toLowerCase().trim())
            })
            if(tempList.length > 0) {
                setDisplayPieceList(tempList)
            }
        }
        else{
            setDisplayPieceList(apiPieceList)
        }
    }

    const deletePiece = (index: number) => {
        let tempList = [...apiPieceList]
        tempList.splice(selectedPiece,1)
        setApiPieceList(tempList)
        closeModal()
    }

    const addNewPanne = async () => {
        if(isAddPanneValid){
            const tempPanne = {
                nom: nomPanne,
                garvite: gravitePanne,
                description: descriptionPanne,
            }
            try {
                const response = await fetch(`/api/equipements/sous-systeme/${params.index}/pannes`, {
                    method: 'POST',
                    body: JSON.stringify(tempPanne)
                })
                const json = await response.json()
                const { panne} = json
                if (!panne){
                    setTimeout(() => {
                        dispatch(addAlert({type: 'FAILURE', message: json.error}))
                    }, DISPLAYTIMEOUT)
                    closeModal()
                    return
                }
                console.log(panne)
                setApiPanneList([...displayPanneList, panne])
                setTimeout(() => {
                    dispatch(addAlert({type: 'SUCCESS', message: 'panne enregistrée'}))
                }, DISPLAYTIMEOUT)
            } catch (error: any) {
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: error}))
                }, DISPLAYTIMEOUT)
            }
            
            closeModal()
        }
    }

    const sortPanneList = (value: string) => {
        if(value !== ""){
            let tempList = [...apiPanneList]
            tempList = apiPanneList.filter((panne)=>{
                return panne.nom.toLowerCase().trim().includes(value.toLowerCase().trim())
            })
            if(tempList.length > 0) {
                setDisplayPanneList(tempList)
            }
        }
        else{
            setDisplayPanneList(apiPanneList)
        }
    }

    const deletePanne = async () => {
        let tempList = [...apiPanneList]
        try {
            const response = await fetch('/api/equipements/sous-systeme/panne/supprimer/'+tempList[selectedPiece].id, {
                method: 'DELETE',
                body: JSON.stringify({})
            })
            const json = await response.json()
            const { message } = json
            if (!message){
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: json.error}))
                }, DISPLAYTIMEOUT)
            }
            setTimeout(() => {
                dispatch(addAlert({type: 'SUCCESS', message: 'panne suprimée avec succes'}))
            }, DISPLAYTIMEOUT)
        } catch (error: any) {
            setTimeout(() => {
                dispatch(addAlert({type: 'FAILURE', message: error}))
            }, DISPLAYTIMEOUT)
        }
        tempList.splice(selectedPiece,1)
        setApiPanneList(tempList)
        closeModal()
    }

    useEffect(() => {
        const loadSubSystem = async () => {
            try {
                const response = await fetch("/api/equipements/sous-systeme/"+params.index)
                const json = await response.json()
                const { sousSysteme } = json
                setApiSubSystemDetails(sousSysteme)
                if(!sousSysteme){
                    setTimeout(() => {
                        dispatch(addAlert({type: 'FAILURE', message: json.error}))
                    }, DISPLAYTIMEOUT)
                    return
                }
                setTimeout(() => {
                    dispatch(addAlert({type: 'SUCCESS', message: 'sous systeme chargé'}))
                }, DISPLAYTIMEOUT)
                setIsLoadingSubSystem(false)
                return
            } catch (error: any) {
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: error}))
                }, DISPLAYTIMEOUT)
                return;
            }
        }
        const loadPieces = async () => {
            try {
                const response = await fetch("/api/equipements/sous-systeme/"+params.index+'/pieces')
                const json = await response.json()
                const { pieces } = json
                if(!pieces){
                    setTimeout(() => {
                        dispatch(addAlert({type: 'FAILURE', message: json.error}))
                    }, DISPLAYTIMEOUT)
                    return
                }
                setApiPieceList(pieces.reverse())
                setTimeout(() => {
                    dispatch(addAlert({type: 'SUCCESS', message: 'pieces du sous systeme chargées'}))
                }, DISPLAYTIMEOUT)
                setIsLoadingSubSystemPieces(false)
                return
            } catch (error: any) {
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: error}))
                }, DISPLAYTIMEOUT)
                return;
            }
        }
        const loadPannes = async () => {
            try {
                const response = await fetch(`/api/equipements/sous-systeme/${params.index}/pannes`)
                const json = await response.json()
                const { pannes } = json
                if(!pannes){
                    setTimeout(() => {
                        dispatch(addAlert({type: 'FAILURE', message: json.error}))
                    }, DISPLAYTIMEOUT)
                    return
                }
                setApiPanneList(pannes.reverse())
                setTimeout(() => {
                    dispatch(addAlert({type: 'SUCCESS', message: 'pannes du sous systeme chargées'}))
                }, DISPLAYTIMEOUT)
                setIsLoadingSubSystemPannes(false)
                return
            } catch (error: any) {
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: error}))
                }, DISPLAYTIMEOUT)
                return;
            }
        }
        loadSubSystem()
        loadPieces()
        loadPannes()
    }, [dispatch, params.index])

    useEffect(()=>{
        setDisplayPieceList(apiPieceList)
    },[apiPieceList])

    useEffect(()=>{
        setDisplayPanneList(apiPanneList)
    },[apiPanneList])

    useEffect(()=> {
        if(nomPanne !== "" && gravitePanne>0
            && gravitePanne <5 && descriptionPanne!==""){
            setAddPanneValidity(true)
        }
    },[nomPanne, gravitePanne, descriptionPanne])

    useEffect(()=>{
        if(nomSubSys!=="" && marqueSubSys!=="" && modeleSubSys!=="" && numSerieSubSys!=="" && descriptionSubSys!=="" && previewImageSubSys!=="") {
            if(isUpdateSubSysModal){
                setUpdateFormValidity(true)
            }
            if(isAddPieceModal && qteStockPiece>0 &&
                qteMinPiece>0){
                setAddPieceValidity(true)
            }
        }
    }, [isUpdateSubSysModal, isAddPieceModal, nomSubSys, marqueSubSys, modeleSubSys, numSerieSubSys, localisationSubSys, descriptionSubSys, previewImageSubSys,qteStockPiece,qteMinPiece])
    
    return(
        <div className="w-full bg-white rounded-2xl shadow drop-shadow-md p-2 flex-col justify-start items-center gap-2 flex">
            <div className="w-full justify-start items-center inline-flex gap-1">
                <Link href={`/dashboard/${username}/equipements/${equipmentName}`} className="text-[#165081] text-2xl font-semibold leading-[52.11px]">{equipmentName.replace("-"," ")+ '-'} {apiSubSystemDetails.nom}</Link>
                <span className="text-zinc-800 text-2xl font-semibold leading-[52.11px]"> - Sous Systèmes</span>
            </div>
            <div className="w-full p-2 bg-white rounded-2xl border border-slate-300 flex-col justify-start items-center gap-2.5 inline-flex">
                {isLoadingSubSystem ?
                    <RoundBar />
                : (<div className="w-full flex-row justify-start items-start gap-2 inline-flex">
                    <div className='w-full aspect-square bg-[#D0E5F0] rounded-[16px] flex justify-center items-center'>
                        <Image className="w-4/5 aspect-square" width="500" height="500" src={`${apiSubSystemDetails.image}`} alt={params.sousSysteme.replace("-", " ")}/>
                    </div>
                    <div className="w-full px-4 flex-col justify-start items-start gap-2 inline-flex">
                        <div className="flex-col justify-start items-start inline-flex">
                            <span className="text-black text-[26px] font-semibold uppercase">{decodeURI(apiSubSystemDetails.nom)}</span>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Marque du Fabricant: </span>
                                <span className="text-black text-[20px] font-semibold">{apiSubSystemDetails.marque_fabricant}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Numéro de Série: </span>
                                <span className="text-black text-[20px] font-semibold">{apiSubSystemDetails.numero_serie}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Modèle: </span>
                                <span className="text-black text-[20px] font-semibold">{apiSubSystemDetails.modele}</span>
                            </div>
                            <div className="justify-start items-baseline gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Description: </span>
                                <span className="text-black text-[20px] font-semibold">{apiSubSystemDetails.description}</span>
                            </div>
                        </div>
                        <div className="w-full flex flex-row gap-3 justify-start items-start">
                            <DeleteBtn deleteAction={()=>{setDelSubSysModalVisibility(true)}}/>
                            <UpdateBtn updateAction={()=>{setUpdateSubSysModalVisibility(true)
                                                            initialiseUpdateParams()}}/>
                        </div>
                    </div>
                </div>)}

                {/* Liste des pièces de rechange ci-dessous */}
                <div className="w-full flex flex-col">
                    <div className="w-full pb-2 border-b border-slate-300 justify-start items-center gap-2.5 inline-flex">
                        <div className="w-[400px] gap-2 flex flex-row justify-start items-center">
                            <span className="text-black text-[24px] font-normal">Pièces de rechange </span>
                            <span className="w-8 h-8 p-5 bg-sky-500 rounded-[100px] justify-center items-center inline-flex text-white text-base font-semibold">{apiPieceList.length}</span>
                        </div>
                        <div className="w-full justify-between items-center gap-4 inline-flex">
                            <InputSearchField placeholder="Rechercher une pièce de rechange" setNewSearchValue={sortPieceList}/>
                            <AddBtn width={350} placeholder="Nouvelle Pièce" addFunction={()=>{setAddPieceModalVisibility(true)
                                                                                                initialiseAddPieceParams()}} />
                        </div>
                        
                    </div>

                    <div className="flex w-full h-[210px] gap-4 py-2 justify-start items-start flex-wrap overflow-y-auto">
                        { isLoadingSubSystemPieces ?
                            <RoundBar />
                        :
                            displayPieceList.map((system, index) => {
                                return <SubsysPieceCard
                                    key={index}
                                    sysPieceInfo = {system}
                                    href ={`${pathname}/pieces/${displayPieceList[index].id}`}
                                    deleteAction = {()=>{
                                        setDelPieceModalVisibility(true)
                                        setSelectedPiece(index)
                                }}/>
                            })
                        }
                    </div>
                </div>
                
                {/* Liste des pannes ci-dessous */}
                <div className="w-full flex flex-col">
                    <div className="w-full pb-2 border-b border-slate-300 justify-start items-center gap-2.5 inline-flex">
                        <div className="w-[150px] gap-2 flex flex-row justify-start items-center">
                            <span className="text-black text-[24px] font-normal">Pannes </span>
                            <span className="w-8 h-8 p-5 bg-sky-500 rounded-[100px] justify-center items-center inline-flex text-white text-base font-semibold">{displayPanneList.length}</span>
                        </div>
                        <div className="w-full justify-between items-center gap-4 inline-flex">
                            <InputSearchField placeholder="Rechercher une panne" setNewSearchValue={sortPanneList}/>
                            <AddBtn width={350} placeholder="Nouvelle panne" addFunction={()=>{setAddPanneModalVisibility(true)}}/>
                        </div>
                    </div>

                    <div className="flex w-full gap-4 sticky py-2 justify-start items-start flex-wrap">
                        <table className="w-full p-2 rounded-2xl border border-slate-400 flex-col justify-start items-start inline-flex">
                            <thead className="w-full bg-white border-b border-slate-400">
                                <tr className="w-full p-2 flex gap-1 text-black text-lg font-bold leading-7 tracking-tight">
                                    <td className="w-[150px]">N°</td>
                                    <div className="w-full flex">
                                        <td className="w-2/5">Nom</td>
                                        <td className="w-3/5">Description</td>
                                    </div>
                                    <td className="w-[250px] text-center">Gravité</td>
                                    <td className="w-full text-right">Action</td>
                                </tr>
                            </thead>
                            <tbody className="w-full h-[400px] overflow-auto">
                            {isLoadingSubSystemPannes ?
                                <RoundBar />
                            :
                                displayPanneList.map((panne, index) => {
                                    return <tr key={index} className="w-full p-2 flex gap-1 text-black text-lg font-medium leading-7 tracking-tight odd:bg-white even:bg-indigo-50">
                                        <td className="w-[150px]">{index+1}</td>
                                        <div className="w-full flex">
                                            <td className="w-2/5">{panne.nom}</td>
                                            <td className="w-3/5">{panne.description}</td>
                                        </div>
                                        <td className="w-[250px] text-center">{panne.garvite}</td>
                                        <td className="w-full flex gap-1 justify-end items-start flex-wrap">
                                            <button onClick={()=>{router.push(`${pathname}/pannes/${displayPanneList[index].id}`)}} className="py-1 px-2 bg-white rounded-[100px] text-[#149FDA] border border-sky-500 justify-center items-center gap-1 inline-flex hover:bg-[#149FDA] hover:text-white">
                                                <AiFillEye size={20}/>
                                                <span>Détails</span>
                                            </button>
                                            <button onClick={()=>{setDelPanneModalVisibility(true)
                                                                    setSelectedPanne(index)}} className="py-1 px-2 bg-white rounded-[100px] text-[#EA4335] border border-red-500 justify-center items-center gap-1 inline-flex hover:bg-[#EA4335] hover:text-white">
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
            
            {/* Delete Sub System Modal */}
            <Modal
                modalTitle="Supprimer le sous Système"
                isVisible={isDelSubSysModal}
                isDeleteModalVisible = {isDelSubSysModal}
                deleteText = {<span>Vous êtes sur le point de supprimer le sous système <span className='font-bold'>{apiSubSystemDetails.nom}</span> ainsi que toutes les <span className='font-bold'>{apiPieceList.length}</span> pièces de rechange et les <span className='font-bold'>{apiPanneList.length}</span> pannes associés à ce sous système. Voulez-vous poursuivre ?</span>}
                modalWidth = {600}
                closeModalAction = {closeModal}
                deleteAction = {() => deleteSubSys(params.index)}
            />

            {/* Update Sub System Modal */}
            <Modal
                modalTitle="Modifier le Sous Système"
                isVisible={isUpdateSubSysModal}
                isDeleteModalVisible = {false}
                modalWidth = {'80%'}
                closeModalAction = {closeModal}
                addBtnLabel="Modifier"
                addNewAction = {() => updateSubSys(params.index)}
            >
                <div className="w-full flex flex-row justify-center gap-4">
                    <div className="w-full flex flex-col justify-start gap-4">
                        <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                            Image du Sous Système
                        </span>
                        <div className="w-4/5 relative aspect-square rounded-2xl bg-slate-300 border border-slate-500 border-dotted">
                            <div className='w-full aspect-square rounded-2xl flex flex-col bg-[rgba(0,0,0,0.5)] text-white justify-center items-center absolute'>
                                <BsUpload size={32}/>
                                <span className='text-center text-[20px] font-normal leading-normal tracking-wide'>Ajouter l’image</span>
                            </div>
                            <input onChange={(e)=>{addImage(e,setImageSubSys, setPreviewImageSubSys)}} className='w-full absolute aspect-square rounded-2xl file:text-transparent file:hover:cursor-pointer file:border-0 file:w-full file:aspect-square file:bg-transparent' type="file" accept="image/*" />
                            <Image className="w-full aspect-square rounded-2xl" src={`${previewImageSubSys}`} alt="Equipment Preview" width={500} height={500}/>
                        </div>
                    </div>

                    <div className="w-full flex flex-col justify-start gap-4">
                        <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                            Caractéristiques
                        </span>
                        <InputField label="Nom" defaultValue={apiSubSystemDetails.nom} setNewValue={setNomSubSys} />
                        <InputField label="Marque du Fabricant" defaultValue={apiSubSystemDetails.marque_fabricant} setNewValue={setMarqueSubSys} />
                        <InputField label="Modèle" defaultValue={apiSubSystemDetails.modele} setNewValue={setModeleSubSys} />
                        <InputField label="Numéro de Série" defaultValue={apiSubSystemDetails.numero_serie} setNewValue={setNumSerieSubSys} />
                        <TextAreaField label="Description" defaultValue={apiSubSystemDetails.description} setNewValue={setDescriptionSubSys} />
                    </div>
                </div>
            </Modal>

            {/* Add Piece Modal */}
            <Modal 
                modalTitle="Nouvelle Pièce de Rechange"
                isVisible={isAddPieceModal}
                isDeleteModalVisible = {false}
                modalWidth = {'80%'}
                closeModalAction = {closeModal}
                addBtnLabel="Ajouter"
                addNewAction = {addNewPiece}
            >
                <div className="w-full flex flex-row justify-center gap-4">
                    <div className="w-full flex flex-col justify-start gap-4">
                        <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                            Image de la pièece
                        </span>
                        <div className="w-4/5 relative aspect-square rounded-2xl bg-slate-300 border border-slate-500 border-dotted">
                            <div className='w-full aspect-square rounded-2xl flex flex-col bg-[rgba(0,0,0,0.5)] text-white justify-center items-center absolute'>
                                <BsUpload size={32}/>
                                <span className='text-center text-[20px] font-normal leading-normal tracking-wide'>Ajouter l’image</span>
                            </div>
                            <input onChange={(e)=>{addImage(e,setImageSubSys, setPreviewImageSubSys)}} required className='w-full absolute aspect-square rounded-2xl file:text-transparent file:hover:cursor-pointer file:border-0 file:w-full file:aspect-square file:bg-transparent' type="file" accept="image/*" />
                            {previewImageSubSys && (
                                <Image className="w-full aspect-square rounded-2xl" src={`${previewImageSubSys}`} alt="Apercu Pièce de rechange" width={500} height={500}/>
                            )}
                        </div>
                    </div>

                    <div className="w-full flex flex-col justify-start gap-4">
                        <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                            Caractéristiques
                        </span>
                        <InputField label="Nom" setNewValue={setNomSubSys} />
                        <InputField label="Marque du Fabricant" setNewValue={setMarqueSubSys} />
                        <InputField label="Modèle" setNewValue={setModeleSubSys} />
                        <InputField label="Numéro de Série" setNewValue={setNumSerieSubSys} />
                        <InputField label="Quantité en Stock" type="Number" minValue={0} setNewValue={setQteStockPiece} />
                        <InputField label="Quantité Minimale" type="Number" minValue={0} setNewValue={setQteMinPiece} />
                        <TextAreaField label="Description" setNewValue={setDescriptionSubSys} />
                    </div>
                </div>
            </Modal>

            {/* Delete Piece Modal */}
            <Modal
                modalTitle="Supprimer la Pièece de Rechange"
                isVisible={isDelPieceModal}
                isDeleteModalVisible = {isDelPieceModal}
                deleteText = {<span>Vous êtes sur le point de supprimer la pièece <span className='font-bold'>{displayPieceList[selectedPiece]?.nom}</span> du sous système <span className='font-bold'>{apiSubSystemDetails.nom}</span>. Voulez-vous poursuivre ?</span>}
                modalWidth = {600}
                closeModalAction = {closeModal}
                deleteAction = {() => deletePiece(apiPieceList[selectedPiece].id)}
            />

            {/* Add Panne Modal */}
            <Modal 
                modalTitle="Nouvelle Panne"
                isVisible={isAddPanneModal}
                isDeleteModalVisible = {false}
                modalWidth = {'70%'}
                closeModalAction = {closeModal}
                addBtnLabel="Ajouter"
                addNewAction = {addNewPanne}
            >
                <div className="w-full flex flex-row justify-center gap-4">
                    <div className="w-full flex flex-col justify-start gap-4">
                        <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                            Caractéristiques
                        </span>
                        <InputField label="Nom" setNewValue={setNomPanne} />
                        <InputField label="Gravité" type="Number" minValue={1} maxValue={4} setNewValue={setGravitePanne} />
                        <TextAreaField label="Description" setNewValue={setDescriptionPanne} />
                    </div>
                </div>
            </Modal>

            {/* Delete Panne Modal */}
            <Modal
                modalTitle="Supprimer la Panne"
                isVisible={isDelPanneModal}
                isDeleteModalVisible = {isDelPanneModal}
                deleteText = {<span>Vous êtes sur le point de supprimer la panne <span className='font-bold'>{displayPanneList[selectedPanne]?.nom}</span> du sous système <span className='font-bold'>{apiSubSystemDetails.nom}</span> et tout les protocols préventif associés à cette panne. Voulez-vous poursuivre ?</span>}
                modalWidth = {600}
                closeModalAction = {closeModal}
                deleteAction = {deletePanne}
            />
        </div>
    )
}