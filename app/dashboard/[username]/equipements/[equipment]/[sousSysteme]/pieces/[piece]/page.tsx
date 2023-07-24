'use client'

import Link from "next/link"
import Image from "next/image"
import { useRouter } from 'next/navigation'

import DeleteBtn from '@/components/UIElements/DeleteBtn'
import UpdateBtn from '@/components/UIElements/UpdateBtn'
import InputField from "@/components/UIElements/FormElments/InputField"
import Modal from "@/components/UIElements/Modal"
import TextAreaField from "@/components/UIElements/FormElments/TextAreaField"

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import PieceType from "@/types/piece"

export default function Piece ({params}:{params: {username: string, equipment:string, sousSysteme: string, piece: string }}) {
    const subSysName = decodeURI(params.sousSysteme)
    const equipmentName = decodeURI(params.equipment)
    const username = decodeURI(params.username)
    const router = useRouter()

    const [ apiPieceDetails, setApiPieceDetails ] = useState<PieceType>({
        nom: "Nom Piece1",
        marque: "Marque Fabricant",
        numSerie: "5G4D5F1D",
        modele: "Equip5G4D5F1D",
        localisation: "Departement Equip",
        qteStock: 10,
        qteMin: 2,
        description: "Le Meilleur Sous Système au monde",
        image: "/assets/img/dashboard/sousSystemes/fan-groupElectro.png"
    })

    const [ isDelModalVisibile, setDelModalvisibility ] = useState<boolean>(false)
    const [ isUpdateModalVisible, setUpdateModalVisibility ] = useState<boolean>(false)
    const [ isAddStockModalVisible, setAddStockModalVisibility ] = useState<boolean>(false)
    const [ isRemoveStockModalVisible, setRemoveStockModalVisibility ] = useState<boolean>(false)

    const [ isUpdateValid, setUpdateValidity ] = useState<boolean>(false)
    const [ isStockValid, setStockValidity ] = useState<boolean>(false)

    // Piece Information Start
    const [ imagePiece, setImagePiece ] = useState<string | ArrayBuffer | undefined>(apiPieceDetails.image)
    const [ previewImagePiece, setPreviewImagePiece ] = useState<string | ArrayBuffer | undefined>(apiPieceDetails.image)
    const [ nomPiece, setNomPiece ] = useState<string>(apiPieceDetails.nom)
    const [ marquePiece, setMarquePiece ] = useState<string>(apiPieceDetails.marque)
    const [ modelePiece, setModelePiece ] = useState<string>(apiPieceDetails.modele)
    const [ numSeriePiece, setNumSeriePiece ] = useState<string>(apiPieceDetails.numSerie)
    const [ localisationPiece, setLocalisationPiece ] = useState<string>(apiPieceDetails.localisation)
    const [ qteStockPiece, setQteStockPiece ] = useState<number>(apiPieceDetails.qteStock)
    const [ qteMinPiece, setQteMinPiece ] = useState<number>(apiPieceDetails.qteMin)
    const [ descriptionPiece, setDescriptionPiece ] = useState<string>(apiPieceDetails.description)
    // Piece Information End

    // Transaction Stock Start
    const [ quantity, setQuantity ] = useState<number>(0)
    const [ date, setDate ] = useState<string>()
    // Transaction Stock End

    const initialiseUpdateParams = () => {
        setImagePiece(apiPieceDetails.image)
        setPreviewImagePiece(apiPieceDetails.image)
        setNomPiece(apiPieceDetails.nom)
        setMarquePiece(apiPieceDetails.marque)
        setModelePiece(apiPieceDetails.modele)
        setNumSeriePiece(apiPieceDetails.numSerie)
        setLocalisationPiece(apiPieceDetails.localisation)
        setQteStockPiece(apiPieceDetails.qteStock)
        setQteMinPiece(apiPieceDetails.qteMin)
        setDescriptionPiece(apiPieceDetails.description)

        setUpdateValidity(false)
    }

    const initialiseStockParams = () => {
        setQuantity(0)
        setDate("")
        setStockValidity(false)
    }

    const closeModal = () => {
        setDelModalvisibility(false)
        setUpdateModalVisibility(false)
        setAddStockModalVisibility(false)
        setRemoveStockModalVisibility(false)
        initialiseStockParams()
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

    const deletePiece = () => {
        closeModal()
        router.push(`/dashboard/${username}/equipements/${equipmentName}/${subSysName}`)
    }

    const updatePiece =() => {
        let tempPieceName = apiPieceDetails.nom
        if(isUpdateValid){
            const tempPiece = {
                nom: nomPiece,
                marque: marquePiece,
                modele: modelePiece,
                numSerie: numSeriePiece,
                localisation: localisationPiece,
                qteStock: qteStockPiece,
                qteMin: qteMinPiece,
                description: descriptionPiece,
                image: imagePiece
            }
            setApiPieceDetails(tempPiece)
            closeModal()
            if(tempPieceName !== tempPiece.nom){
                router.push(`/dashboard/${username}/equipements/${equipmentName}/${subSysName}/pieces/${tempPiece.nom}`)
            }
        }
    }

    const saveAddStock =() =>{

    }

    const saveRemoveStock =() => {
        
    }

    return(
        <div className="w-full h-full bg-white rounded-2xl shadow backdrop-blur-[20px] p-2 flex-col justify-start items-center gap-2 flex">
            <div className="w-full justify-start items-center inline-flex gap-1">
                <Link href={`/dashboard/${username}/equipements/${equipmentName}`} className="text-[#165081] text-[24px] font-semibold uppercase">{equipmentName}</Link>
                <Link href={`/dashboard/${username}/equipements/${equipmentName}/${subSysName}`} className="text-[#0B5DA7] text-[24px] font-semibold uppercase"> - {subSysName}</Link>
                <span className="text-zinc-800 text-[24px] font-semibold uppercase"> - Pièces de rechange</span>
            </div>

            <div className="w-full h-full p-2 bg-white rounded-2xl border border-slate-300 flex-col justify-start items-center gap-2.5 inline-flex">
                <div className="w-full flex-row justify-start items-start gap-2 inline-flex">
                    <div className='w-full aspect-square bg-[#D0E5F0] rounded-[16px] flex justify-center items-center'>
                        <Image className="w-4/5 aspect-square" width="500" height="500" src={`${apiPieceDetails.image}`} alt={decodeURI(params.piece)}/>
                    </div>
                    <div className="w-full px-4 flex-col justify-start items-start gap-2 inline-flex">
                        <div className="flex-col justify-start items-start inline-flex">
                            <span className="text-black text-[26px] font-semibold uppercase">{apiPieceDetails.nom}</span>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Marque du Fabricant: </span>
                                <span className="text-black text-[20px] font-semibold">{apiPieceDetails.marque}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Numéro de Série: </span>
                                <span className="text-black text-[20px] font-semibold">{apiPieceDetails.numSerie}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Modèle: </span>
                                <span className="text-black text-[20px] font-semibold">{apiPieceDetails.modele}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Localisation: </span>
                                <span className="text-black text-[20px] font-semibold">{apiPieceDetails.localisation}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Quantité en Stock: </span>
                                <span className="text-black text-[20px] font-semibold">{apiPieceDetails.qteStock}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Quantité Minimale: </span>
                                <span className="text-black text-[20px] font-semibold">{apiPieceDetails.qteMin}</span>
                            </div>
                            <div className="justify-start items-baseline gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Description: </span>
                                <span className="text-black text-[20px] font-semibold">{apiPieceDetails.description}</span>
                            </div>
                        </div>
                        <div className="w-full pr-2 flex flex-wrap gap-2 justify-start items-center">
                            <DeleteBtn deleteAction={()=>{setDelModalvisibility(true)}}/>
                            <UpdateBtn updateAction={()=>{initialiseUpdateParams()
                                                            setUpdateModalVisibility(true)}}/>
                            <button onClick={()=>{setAddStockModalVisibility(true)}} className='w-full px-4 py-2 justify-center items-center gap-2 inline-flex rounded-lg bg-white border border-[#34A853] text-[#34A853] hover:bg-[#34A853] hover:border-none hover:text-white'>
                                <AiOutlinePlus size={20}/>
                                <span className='text-[16px] font-semibold'>Ajouter en Stock</span>
                            </button>
                            <button onClick={()=>{setRemoveStockModalVisibility(true)}} className='w-full px-4 py-2 justify-center items-center gap-2 inline-flex rounded-lg bg-white border border-[#EDA92A] text-[#EDA92A] hover:bg-[#EDA92A] hover:border-none hover:text-white'>
                                <AiOutlineMinus size={20}/>
                                <span className='text-[16px] font-semibold'>Retirer du Stock</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}