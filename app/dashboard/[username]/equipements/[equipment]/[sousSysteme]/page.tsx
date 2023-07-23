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
import Modal from "@/components/UIElements/Modal"
import TextAreaField from "@/components/UIElements/FormElments/TextAreaField"

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillEye } from "react-icons/ai";
import { BsUpload } from "react-icons/bs";
import SubSystemType from "@/types/subSystem"
import PanneType from "@/types/panne"

export default function Equipment ({params}:{params: {username: string, equipment:string, sousSysteme: string }}) {
    const router = useRouter()
    const pathname = usePathname()
    const equipmentName = params.equipment
    const username = params.username

    const [ apiSubSystemDetails, setApiSubSystemDetails ] = useState<SubSystemType>({
        nom: "Nom Sous Système1",
        marque: "Marque Fabricant",
        numSerie: "5G4D5F1D",
        modele: "Equip5G4D5F1D",
        localisation: "Departement Equip",
        description: "Le Meilleur Sous Système au monde",
        image: "/assets/img/dashboard/sousSystemes/fan-groupElectro.png"
    })
    const [ apiPieceList, setApiPieceList ] = useState<Array<SubSystemType>>([
        {
            nom: "Nom Pièce1",
            marque: "Marque Fabricant",
            numSerie: "5G4D5F1D",
            modele: "Equip5G4D5F1D",
            localisation: "Departement Equip",
            description: "La Meilleure Pièce au monde",
            image: "/assets/img/dashboard/sousSystemes/fan-groupElectro.png"
        },
        {
            nom: "Nom Pièce2",
            marque: "Marque Fabricant",
            numSerie: "5G4D5F1D",
            modele: "Equip5G4D5F1D",
            localisation: "Departement Equip",
            description: "La Meilleure Pièce au monde",
            image: "/assets/img/dashboard/sousSystemes/fan-groupElectro.png"
        },
        {
            nom: "Nom Pièce2",
            marque: "Marque Fabricant",
            numSerie: "5G4D5F1D",
            modele: "Equip5G4D5F1D",
            localisation: "Departement Equip",
            description: "La Meilleure Pièce au monde",
            image: "/assets/img/dashboard/sousSystemes/fan-groupElectro.png"
        },
        {
            nom: "Nom Pièce2",
            marque: "Marque Fabricant",
            numSerie: "5G4D5F1D",
            modele: "Equip5G4D5F1D",
            localisation: "Departement Equip",
            description: "La Meilleure Pièce au monde",
            image: "/assets/img/dashboard/sousSystemes/fan-groupElectro.png"
        },
        {
            nom: "Nom Pièce2",
            marque: "Marque Fabricant",
            numSerie: "5G4D5F1D",
            modele: "Equip5G4D5F1D",
            localisation: "Departement Equip",
            description: "La Meilleure Pièce au monde",
            image: "/assets/img/dashboard/sousSystemes/fan-groupElectro.png"
        },
        {
            nom: "Nom Pièce2",
            marque: "Marque Fabricant",
            numSerie: "5G4D5F1D",
            modele: "Equip5G4D5F1D",
            localisation: "Departement Equip",
            description: "La Meilleure Pièce au monde",
            image: "/assets/img/dashboard/sousSystemes/fan-groupElectro.png"
        },
        {
            nom: "Nom Pièce2",
            marque: "Marque Fabricant",
            numSerie: "5G4D5F1D",
            modele: "Equip5G4D5F1D",
            localisation: "Departement Equip",
            description: "La Meilleure Pièce au monde",
            image: "/assets/img/dashboard/sousSystemes/fan-groupElectro.png"
        },
        {
            nom: "Nom Pièce2",
            marque: "Marque Fabricant",
            numSerie: "5G4D5F1D",
            modele: "Equip5G4D5F1D",
            localisation: "Departement Equip",
            description: "La Meilleure Pièce au monde",
            image: "/assets/img/dashboard/sousSystemes/fan-groupElectro.png"
        },
        {
            nom: "Nom Pièce2",
            marque: "Marque Fabricant",
            numSerie: "5G4D5F1D",
            modele: "Equip5G4D5F1D",
            localisation: "Departement Equip",
            description: "La Meilleure Pièce au monde",
            image: "/assets/img/dashboard/sousSystemes/fan-groupElectro.png"
        },
        {
            nom: "Nom Pièce2",
            marque: "Marque Fabricant",
            numSerie: "5G4D5F1D",
            modele: "Equip5G4D5F1D",
            localisation: "Departement Equip",
            description: "La Meilleure Pièce au monde",
            image: "/assets/img/dashboard/sousSystemes/fan-groupElectro.png"
        }
    ])
    const [ displayPieceList, setDisplayPieceList ] = useState<Array<SubSystemType>>(apiPieceList)

    const [ apiPanneList, setApiPanneList ] = useState<Array<PanneType>>([
        {
            nom: "Panne 1",
            description: "la description de la panne 1, voici ce qu’il faut faire",
            gravite: 1
        },
        {
            nom: "Panne 2",
            description: "la description de la panne 2, voici ce qu’il faut faire",
            gravite: 4
        },
        {
            nom: "Panne 3",
            description: "la description de la panne 3, voici ce qu’il faut faire",
            gravite: 2
        },
        {
            nom: "Panne 4",
            description: "la description de la panne 4, voici ce qu’il faut faire",
            gravite: 1
        },
        {
            nom: "Panne 5",
            description: "la description de la panne 5, voici ce qu’il faut faire",
            gravite: 2
        },
        {
            nom: "Panne 1",
            description: "la description de la panne 1, voici ce qu’il faut faire",
            gravite: 1
        },
        {
            nom: "Panne 2",
            description: "la description de la panne 2, voici ce qu’il faut faire",
            gravite: 4
        },
        {
            nom: "Panne 3",
            description: "la description de la panne 3, voici ce qu’il faut faire",
            gravite: 2
        },
        {
            nom: "Panne 4",
            description: "la description de la panne 4, voici ce qu’il faut faire",
            gravite: 1
        },
        {
            nom: "Panne 5",
            description: "la description de la panne 5, voici ce qu’il faut faire",
            gravite: 2
        }
    ])
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
    const [ marqueSubSys, setMarqueSubSys ] = useState<string>(apiSubSystemDetails.marque)
    const [ modeleSubSys, setModeleSubSys ] = useState<string>(apiSubSystemDetails.modele)
    const [ numSerieSubSys, setNumSerieSubSys ] = useState<string>(apiSubSystemDetails.numSerie)
    const [ localisationSubSys, setLocalisationSubSys ] = useState<string>(apiSubSystemDetails.localisation)
    const [ descriptionSubSys, setDescriptionSubSys ] = useState<string>(apiSubSystemDetails.description)
    // Sub System Information End

    // Piece Information Start
    const [ nomPanne, setNomPanne ] = useState<string>("")
    const [ descriptionPanne, setDescriptionPanne ] = useState<string>("")
    const [ gravitePanne, setGravitePanne ] = useState<number>(0)
    // Piece Information End

    const [ isUpdateFormValid, setUpdateFormValidity ] = useState<boolean>(false)
    const [ isAddPieceValid, setAddPieceValidity ] = useState<boolean>(false)
    const [ isAddPanneValid, setAddPanneValidity ] = useState<boolean>(false)

    const initialiseUpdateParams = () => {
        setImageSubSys(apiSubSystemDetails.image)
        setPreviewImageSubSys(apiSubSystemDetails.image)
        setNomSubSys(apiSubSystemDetails.nom)
        setMarqueSubSys(apiSubSystemDetails.marque)
        setModeleSubSys(apiSubSystemDetails.modele)
        setNumSerieSubSys(apiSubSystemDetails.numSerie)
        setLocalisationSubSys(apiSubSystemDetails.localisation)
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
        setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
    }
    
    const deleteSubSys = () => {
        console.log("Deleting Sub System From the Database through API calls")
        closeModal()
        router.push(`/dashboard/${params.username}/equipements/${equipmentName}`)
    }

    const updateSubSys = () => {
        let tempSubSysName = apiSubSystemDetails.nom
        if(isUpdateFormValid){
            const tempSubSys = {
                nom: nomSubSys,
                marque: marqueSubSys,
                numSerie: numSerieSubSys,
                modele: modeleSubSys,
                localisation: localisationSubSys,
                description: descriptionSubSys,
                image: imageSubSys? imageSubSys : ""
            }
            setApiSubSystemDetails(tempSubSys)
            if(tempSubSysName !== apiSubSystemDetails.nom){
                router.push(`/dashboard/${params.username}/equipements/${params.equipment}/${apiSubSystemDetails.nom}`)
            }
            closeModal()
        }
    }

    const addNewPiece = () => {
        if(isAddPieceValid){
            const tempPiece = {
                nom: nomSubSys,
                marque: marqueSubSys,
                numSerie: numSerieSubSys,
                modele: modeleSubSys,
                localisation: localisationSubSys,
                description: descriptionSubSys,
                image: imageSubSys? imageSubSys : ""
            }
            setApiPieceList([...displayPieceList, tempPiece])
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

    const deletePiece = () => {
        let tempList = [...apiPieceList]
        tempList.splice(selectedPiece,1)
        setApiPieceList(tempList)
        closeModal()
    }

    const addNewPanne = () => {
        if(isAddPanneValid){
            const tempPanne = {
                nom: nomPanne,
                gravite: gravitePanne,
                description: descriptionPanne,
            }
            setApiPanneList([...displayPanneList, tempPanne])
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

    const deletePanne = () => {
        let tempList = [...apiPanneList]
        tempList.splice(selectedPiece,1)
        setApiPanneList(tempList)
        closeModal()
    }

    useEffect(()=> {
        if(nomPanne !== "" && gravitePanne>0
            && gravitePanne <5 && descriptionPanne!==""){
            setAddPanneValidity(true)
        }
    },[nomPanne, gravitePanne, descriptionPanne])

    useEffect(()=>{
        if(nomSubSys!=="" && marqueSubSys!=="" && modeleSubSys!=="" && numSerieSubSys!=="" && localisationSubSys!=="" && descriptionSubSys!=="" && previewImageSubSys!=="") {
            if(isUpdateSubSysModal){
                setUpdateFormValidity(true)
            }
            if(isAddPieceModal){
                setAddPieceValidity(true)
            }
        }
    }, [isUpdateSubSysModal, isAddPieceModal, nomSubSys, marqueSubSys, modeleSubSys, numSerieSubSys, localisationSubSys, descriptionSubSys, previewImageSubSys])
    
    return(
        <div className="w-full bg-white rounded-2xl shadow backdrop-blur-[20px] p-2 flex-col justify-start items-center gap-2 flex">
            <div className="w-full justify-start items-center inline-flex gap-1">
                <Link href={`/dashboard/${username}/equipements/${equipmentName}`} className="text-[#165081] text-2xl font-semibold leading-[52.11px]">{equipmentName.replace("-"," ")}</Link>
                <span className="text-zinc-800 text-2xl font-semibold leading-[52.11px]"> - Sous Systèmes</span>
            </div>
            <div className="w-full p-2 bg-white rounded-2xl border border-slate-300 flex-col justify-start items-center gap-2.5 inline-flex">
                <div className="w-full flex-row justify-start items-start gap-2 inline-flex">
                    <div className='w-full aspect-square bg-[#D0E5F0] rounded-[16px] flex justify-center items-center'>
                        <Image className="w-4/5 aspect-square" width="500" height="500" src={`${apiSubSystemDetails.image}`} alt={params.sousSysteme.replace("-", " ")}/>
                    </div>
                    <div className="w-full px-4 flex-col justify-start items-start gap-2 inline-flex">
                        <div className="flex-col justify-start items-start inline-flex">
                            <span className="text-black text-[26px] font-semibold uppercase">{decodeURI(params.sousSysteme)}</span>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Marque du Fabricant: </span>
                                <span className="text-black text-[20px] font-semibold">{apiSubSystemDetails.marque}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Numéro de Série: </span>
                                <span className="text-black text-[20px] font-semibold">{apiSubSystemDetails.numSerie}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Modèle: </span>
                                <span className="text-black text-[20px] font-semibold">{apiSubSystemDetails.modele}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Localisation: </span>
                                <span className="text-black text-[20px] font-semibold">{apiSubSystemDetails.localisation}</span>
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
                </div>

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
                        {
                            displayPieceList.map((system, index) => {
                                return <SubsysPieceCard
                                    key={index}
                                    sysPieceInfo = {system}
                                    href ={`${pathname}/pieces/${displayPieceList[index].nom}`}
                                    deleteAction = {()=>{setDelPieceModalVisibility(true)
                                                            setSelectedPiece(index)}}
                                />
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

                    <div className="flex w-full h-[400px] gap-4 sticky py-2 justify-start items-start flex-wrap overflow-auto">
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
                            <tbody className="w-full">
                            {
                                displayPanneList.map((panne, index) => {
                                    return <tr key={index} className="w-full p-2 flex gap-1 text-black text-lg font-medium leading-7 tracking-tight odd:bg-white even:bg-indigo-50">
                                        <td className="w-[150px]">{index+1}</td>
                                        <div className="w-full flex">
                                            <td className="w-2/5">{panne.nom}</td>
                                            <td className="w-3/5">{panne.description}</td>
                                        </div>
                                        <td className="w-[250px] text-center">{panne.gravite}</td>
                                        <td className="w-full flex gap-1 justify-end items-start flex-wrap">
                                            <button onClick={()=>{router.push(`${pathname}/pannes/${displayPanneList[index].nom}`)}} className="py-1 px-2 bg-white rounded-[100px] text-[#149FDA] border border-sky-500 justify-center items-center gap-1 inline-flex hover:bg-[#149FDA] hover:text-white">
                                                <AiFillEye size={20}/>
                                                <span>Details</span>
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
                deleteText = {<span>Vous êtes sur le point de supprimer le sous système <span className='font-bold'>{apiSubSystemDetails.nom}</span> ainsi que toutes les pièces de rechange et les pannes associés à ce sous système. Voulez-vous poursuivre ?</span>}
                modalWidth = {600}
                closeModalAction = {closeModal}
                deleteAction = {deleteSubSys}
            />

            {/* Update Sub System Modal */}
            <Modal
                modalTitle="Modifier le Sous Système"
                isVisible={isUpdateSubSysModal}
                isDeleteModalVisible = {false}
                modalWidth = {'80%'}
                closeModalAction = {closeModal}
                addBtnLabel="Modifier"
                addNewAction = {updateSubSys}
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
                        <InputField label="Marque du Fabricant" defaultValue={apiSubSystemDetails.marque} setNewValue={setMarqueSubSys} />
                        <InputField label="Modèle" defaultValue={apiSubSystemDetails.modele} setNewValue={setModeleSubSys} />
                        <InputField label="Numéro de Série" defaultValue={apiSubSystemDetails.numSerie} setNewValue={setNumSerieSubSys} />
                        <InputField label="Localisation" defaultValue={apiSubSystemDetails.localisation} setNewValue={setLocalisationSubSys} />
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
                        <InputField label="Localisation" setNewValue={setLocalisationSubSys} />
                        <TextAreaField label="Description" setNewValue={setDescriptionSubSys} />
                    </div>
                </div>
            </Modal>

            {/* Delete Piece Modal */}
            <Modal
                modalTitle="Supprimer la Pièece de Rechange"
                isVisible={isDelPieceModal}
                isDeleteModalVisible = {isDelPieceModal}
                deleteText = {<span>Vous êtes sur le point de supprimer la pièece <span className='font-bold'>{displayPieceList[selectedPiece].nom}</span> du sous système <span className='font-bold'>{apiSubSystemDetails.nom}</span>. Voulez-vous poursuivre ?</span>}
                modalWidth = {600}
                closeModalAction = {closeModal}
                deleteAction = {deletePiece}
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
                deleteText = {<span>Vous êtes sur le point de supprimer la panne <span className='font-bold'>{displayPanneList[selectedPanne].nom}</span> du sous système <span className='font-bold'>{apiSubSystemDetails.nom}</span> et tout les protocoles préventif associés à cette panne. Voulez-vous poursuivre ?</span>}
                modalWidth = {600}
                closeModalAction = {closeModal}
                deleteAction = {deletePanne}
            />
        </div>
    )
}