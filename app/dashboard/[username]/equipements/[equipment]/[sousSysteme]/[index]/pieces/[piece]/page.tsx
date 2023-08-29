'use client'

import Link from "next/link"
import Image from "next/image"
import { useRouter } from 'next/navigation'

import DeleteBtn from '@/components/UIElements/DeleteBtn'
import UpdateBtn from '@/components/UIElements/UpdateBtn'
import DateInputField from '@/components/UIElements/FormElments/DateInputField'
import InputField from "@/components/UIElements/FormElments/InputField"
import Modal from "@/components/UIElements/Modal"
import TextAreaField from "@/components/UIElements/FormElments/TextAreaField"

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsUpload } from "react-icons/bs";

import PieceType from "@/types/piece"
import { useAppDispatch } from "@/redux/hooks"
import { addAlert } from "@/redux/features/alerts/alertsSlice"
import { DISPLAYTIMEOUT } from "@/constants/time"

export default function Piece ({params}:{params: {username: string, equipment:string, sousSysteme: string, piece: string }}) {
    const dispatch = useAppDispatch()
    const subSysName = decodeURI(params.sousSysteme)
    const equipmentName = decodeURI(params.equipment)
    const username = decodeURI(params.username)
    const router = useRouter()

    const [ apiPieceDetails, setApiPieceDetails ] = useState<PieceType>({
        id: 0,
        nom: "Nom Piece1",
        marque_fabricant: "Marque Fabricant",
        numero_serie: "5G4D5F1D",
        modele: "Equip5G4D5F1D",
        stock: 10,
        minimum_stock: 2,
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
    const [ marquePiece, setMarquePiece ] = useState<string>(apiPieceDetails.marque_fabricant)
    const [ modelePiece, setModelePiece ] = useState<string>(apiPieceDetails.modele)
    const [ numSeriePiece, setNumSeriePiece ] = useState<string>(apiPieceDetails.numero_serie)
    const [ qteStockPiece, setQteStockPiece ] = useState<number>(apiPieceDetails.stock)
    const [ qteMinPiece, setQteMinPiece ] = useState<number>(apiPieceDetails.minimum_stock)
    const [ descriptionPiece, setDescriptionPiece ] = useState<string>(apiPieceDetails.description)
    // Piece Information End

    // Transaction Stock Start
    const [ quantity, setQuantity ] = useState<number>(0)
    const [ dateStock, setDateStock ] = useState<string>()
    // Transaction Stock End

    const initialiseUpdateParams = () => {
        setImagePiece(apiPieceDetails.image)
        setPreviewImagePiece(apiPieceDetails.image)
        setNomPiece(apiPieceDetails.nom)
        setMarquePiece(apiPieceDetails.marque_fabricant)
        setModelePiece(apiPieceDetails.modele)
        setNumSeriePiece(apiPieceDetails.numero_serie)
        setQteStockPiece(apiPieceDetails.stock)
        setQteMinPiece(apiPieceDetails.minimum_stock)
        setDescriptionPiece(apiPieceDetails.description)

        setUpdateValidity(false)
    }

    const initialiseStockParams = () => {
        setQuantity(0)
        setDateStock("")
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

    const deletePiece = async () => {
        try {
            const response = await fetch('/api/equipements/sous-systeme/pieces/retirer/'+params.piece, {
                method: 'DELETE',
                body: JSON.stringify({})
            })
            const json = await response.json()
            const { error } = json
            if (error !== undefined){
                console.log(error)
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: 'suppression echouée'}))
                }, DISPLAYTIMEOUT)
                return
            }
            router.back()
        } catch (error) {
            console.log(error)
        }
        closeModal()
    }

    const updatePiece = async () => {
        let tempPieceName = apiPieceDetails.nom
        if(isUpdateValid){
            const tempPiece = {
                nom: nomPiece,
                marque_fabricant: marquePiece,
                modele: modelePiece,
                numero_serie: numSeriePiece,
                stock: qteStockPiece,
                minimum_stock: qteMinPiece,
                description: descriptionPiece,
                image: imagePiece
            }
            try {
                const response = await fetch('/api/equipements/sous-systeme/pieces/editer/'+params.piece, {
                    method: 'PATCH',
                    body: JSON.stringify(tempPiece)
                })
                const json = await response.json()
                const { piece } = json 
                if (piece){
                    console.log(piece)
                    setApiPieceDetails(piece)
                    setTimeout(() => {
                        dispatch(addAlert({type: 'SUCCESS', message: 'piece mise a jour avec success'}))
                    }, DISPLAYTIMEOUT)
                }
                
            } catch (error: any) {
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: error.message}))
                }, DISPLAYTIMEOUT)
                console.log(error.message)
            } 
            closeModal()
            if(tempPieceName !== tempPiece.nom){
                router.push(`/dashboard/${username}/equipements/${equipmentName}/${subSysName}/pieces/${tempPiece.nom}`)
            }
        }
    }

    const saveAddStock = async () =>{
        if(isStockValid){
            const tempStock = {
                piece: apiPieceDetails.nom,
                subSystem: subSysName,
                quantity: quantity,
                date: dateStock,
                type: "Depôt"
            }
            try {
                const response = await fetch('/api/equipements/sous-systeme/pieces/editer/'+params.piece, {
                    method: 'PATCH',
                    body: JSON.stringify({stock: apiPieceDetails.stock+quantity})
                })
                const json = await response.json()
                const { piece } = json 
                if (piece){
                    setApiPieceDetails(piece)
                    dispatch(addAlert({type: 'SUCCESS', message: 'piece mise a jour avec success'}))
                }
                else{
                    const { error } = json
                    if (error){
                        setTimeout(() => {
                            dispatch(addAlert({type: 'FAILURE', message: error.message}))
                        }, DISPLAYTIMEOUT)
                    }
                    else{
                        setTimeout(() => {
                            dispatch(addAlert({type: 'WARNING', message: 'OUPS!! quelque chose a mal fonctionné'}))
                        }, DISPLAYTIMEOUT)
                    }
                }
            } catch (error: any) {
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: error.message}))
                }, DISPLAYTIMEOUT)
                console.log(error.message)
            }
            //save the transaction
            try {
                const response = await fetch('/api/equipements/sous-systeme/pieces/transactions/creer/', {
                    method: 'POST',
                    body: JSON.stringify({
                        type_transaction: 'TRANSACTION-AJOUT',
                        quantite: quantity,
                        piece_id: apiPieceDetails.id
                    })
                })
                const json = await response.json()
                const { transaction } = json
                if(!transaction) {
                    setQuantity(0)
                    closeModal()
                    setTimeout(() => {
                        dispatch(addAlert({type: 'FAILURE', message: json.error}))
                    }, DISPLAYTIMEOUT)
                    return
                }
                setTimeout(() => {
                    dispatch(addAlert({type: 'SUCCESS', message: 'transaction enregistrée'}))
                }, DISPLAYTIMEOUT)
                console.log('transaction saved')
            } catch (error: any) {
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: error.message}))
                }, DISPLAYTIMEOUT)
                console.log(error)
            }
            setQuantity(0)
            closeModal()
        }
    }

    const saveRemoveStock = async () => {
        if(isStockValid){
            const tempStock = {
                piece: apiPieceDetails.nom,
                subSystem: subSysName,
                quantity: quantity,
                date: dateStock,
                type: "Retrait"
            }
            const canRetail = apiPieceDetails.stock - quantity > apiPieceDetails.minimum_stock
            if(!canRetail) {
                setQuantity(0)
                closeModal()
                setTimeout(() => {
                    dispatch(addAlert({type: 'WARNING', message: 'Can not remove more than minimun stock quantity'}))
                }, DISPLAYTIMEOUT)
                return;
            }
            try {
                const response = await fetch('/api/equipements/sous-systeme/pieces/editer/'+params.piece, {
                    method: 'PATCH',
                    body: JSON.stringify({stock: apiPieceDetails.stock-quantity})
                })
                const json = await response.json()
                const { piece } = json 
                if (piece){
                    setApiPieceDetails(piece)
                    setTimeout(() => {
                        dispatch(addAlert({type: 'SUCCESS', message: 'piece mise a jour'}))
                    }, DISPLAYTIMEOUT)
                }
                else{
                    setTimeout(() => {
                        dispatch(addAlert({type: 'FAILURE', message: json.error.message}))
                    }, DISPLAYTIMEOUT)
                }
            } catch (error: any) {
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: error}))
                }, DISPLAYTIMEOUT)
                console.log(error.message)
            }
            //save the transaction
            try {
                const response = await fetch('/api/equipements/sous-systeme/pieces/transactions/creer/', {
                    method: 'POST',
                    body: JSON.stringify({
                        type_transaction: 'TRANSACTION-RETRAIT',
                        quantite: quantity,
                        piece_id: apiPieceDetails.id
                    })
                })
                const json = await response.json()
                const { transaction } = json
                if(!transaction) {
                    setQuantity(0)
                    closeModal()
                    setTimeout(() => {
                        dispatch(addAlert({type: 'FAILURE', message: json.error.message}))
                    }, DISPLAYTIMEOUT)
                    return
                }
                setTimeout(() => {
                    dispatch(addAlert({type: 'SUCCESS', message: 'transaction enregistrée'}))
                }, DISPLAYTIMEOUT)
                console.log('transaction saved')
            } catch (error: any) {
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: error}))
                }, DISPLAYTIMEOUT)
                console.log(error)
            }
            setQuantity(0)
            closeModal()
        }
    }
    //load curent piece
    useEffect(()=> {
        const loadPiece = async () => {
            const response = await fetch('/api/equipements/sous-systeme/pieces/'+params.piece)
            const json = await response.json();
            const { piece } = json
            if (!piece) return;
            setApiPieceDetails(piece)
            setTimeout(() => {
                dispatch(addAlert({type: 'SUCCESS', message: 'piece chargée avec success'}))
            }, DISPLAYTIMEOUT)
        }
        const loadTransactions = async () => {
            const response = await fetch('/api/equipements/sous-systeme/pieces/transactions/piece/'+params.piece)
            const json = await response.json()
            const { transactions } = json
            if(!transactions) return;
            setTimeout(() => {
                dispatch(addAlert({type: 'SUCCESS', message: 'transactions chargées avec success'}))
            }, DISPLAYTIMEOUT)
        }
        loadPiece()
        loadTransactions()
    }, [dispatch, params.piece])
    useEffect(()=>{
        if(quantity>0 && dateStock!==""){
            setStockValidity(true)
        }
    },[quantity,dateStock])

    useEffect(()=> {
        if(nomPiece!=="" && marquePiece!=="" &&
            modelePiece!=="" && numSeriePiece!=="" &&
            qteMinPiece>0 && descriptionPiece!==""
            && imagePiece!==""){
                setUpdateValidity(true)
        }
    }, [nomPiece,marquePiece,modelePiece,numSeriePiece,qteStockPiece,qteMinPiece,descriptionPiece,imagePiece])

    return(
        <div className="w-full h-full bg-white rounded-2xl shadow backdrop-blur-[20px] p-2 flex-col justify-start items-center gap-2 flex">
            <div className="w-full justify-start items-center inline-flex gap-1">
                <Link href={`/dashboard/${username}/equipements/${equipmentName}`} className="text-[#165081] text-[24px] font-semibold uppercase">{equipmentName}</Link>
                <Link href={`/dashboard/${username}/equipements/${equipmentName}/${subSysName}`} className="text-[#0B5DA7] text-[24px] font-semibold uppercase"> - {subSysName}</Link>
                <span className="text-zinc-800 text-[24px] font-semibold uppercase"> - Pièces de rechange</span>
            </div>

            <div className="w-full h-full p-2 bg-white rounded-2xl border border-slate-300 flex-col justify-start items-center gap-2.5 inline-flex">
                <div className="w-full h-full flex-row justify-start items-start gap-2 inline-flex">
                    <div className='w-full aspect-square bg-[#D0E5F0] rounded-[16px] flex justify-center items-center'>
                        <Image className="w-4/5 aspect-square" width="500" height="500" src={`${apiPieceDetails.image}`} alt={decodeURI(params.piece)}/>
                    </div>
                    <div className="w-full px-4 flex-col justify-start items-start gap-2 inline-flex">
                        <div className="flex-col justify-start items-start inline-flex">
                            <span className="text-black text-[26px] font-semibold uppercase">{apiPieceDetails.nom}</span>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Marque du Fabricant: </span>
                                <span className="text-black text-[20px] font-semibold">{apiPieceDetails.marque_fabricant}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Numéro de Série: </span>
                                <span className="text-black text-[20px] font-semibold">{apiPieceDetails.numero_serie}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Modèle: </span>
                                <span className="text-black text-[20px] font-semibold">{apiPieceDetails.modele}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Localisation: </span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Quantité en Stock: </span>
                                <span className="text-black text-[20px] font-semibold">{apiPieceDetails.stock}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Quantité Minimale: </span>
                                <span className="text-black text-[20px] font-semibold">{apiPieceDetails.minimum_stock}</span>
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

            {/* Delete Piece Modal */}
            <Modal
                modalTitle="Supprimer la Pieèce de Rechange"
                isVisible={isDelModalVisibile}
                isDeleteModalVisible = {isDelModalVisibile}
                deleteText = {<span>Vous êtes sur le point de supprimer la pièce de rechange <span className='font-bold'>{apiPieceDetails.nom}</span> du sous système <span className='font-bold'>{subSysName}</span>. Voulez-vous poursuivre ?</span>}
                modalWidth = {600}
                closeModalAction = {closeModal}
                deleteAction = {async () => await deletePiece()}
            />

            {/* Update Piece Modal */}
            <Modal
                modalTitle="Modifier la Pièce de Rechange"
                isVisible={isUpdateModalVisible}
                isDeleteModalVisible = {false}
                modalWidth = {'80%'}
                closeModalAction = {closeModal}
                addBtnLabel="Modifier"
                addNewAction = {updatePiece}
            >
                <div className="w-full flex flex-row justify-center gap-4">
                    <div className="w-full flex flex-col justify-start gap-4">
                        <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                            Image de la Pièce de Rechange
                        </span>
                        <div className="w-4/5 relative aspect-square rounded-2xl bg-slate-300 border border-slate-500 border-dotted">
                            <div className='w-full aspect-square rounded-2xl flex flex-col bg-[rgba(0,0,0,0.5)] text-white justify-center items-center absolute'>
                                <BsUpload size={32}/>
                                <span className='text-center text-[20px] font-normal leading-normal tracking-wide'>Ajouter l’image</span>
                            </div>
                            <input onChange={(e)=>{addImage(e,setImagePiece, setPreviewImagePiece)}} className='w-full absolute aspect-square rounded-2xl file:text-transparent file:hover:cursor-pointer file:border-0 file:w-full file:aspect-square file:bg-transparent' type="file" accept="image/*" />
                            <Image className="w-full aspect-square rounded-2xl" src={`${previewImagePiece}`} alt="Equipment Preview" width={500} height={500}/>
                        </div>
                    </div>

                    <div className="w-full flex flex-col justify-start gap-4">
                        <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                            Caractéristiques
                        </span>
                        <InputField label="Nom" defaultValue={apiPieceDetails.nom} setNewValue={setNomPiece} />
                        <InputField label="Marque du Fabricant" defaultValue={apiPieceDetails.marque_fabricant} setNewValue={setMarquePiece} />
                        <InputField label="Modèle" defaultValue={apiPieceDetails.modele} setNewValue={setModelePiece} />
                        <InputField label="Numéro de Série" defaultValue={apiPieceDetails.numero_serie} setNewValue={setNumSeriePiece} />
                        <InputField label="Quantité en Stock" defaultValue={apiPieceDetails.stock} type="Number" minValue={0} setNewValue={setQteStockPiece} disabled={true}/>
                        <InputField label="Quantité Minimale" defaultValue={apiPieceDetails.minimum_stock} type="Number" minValue={0} setNewValue={setQteMinPiece} />
                        <TextAreaField label="Description" defaultValue={apiPieceDetails.description} setNewValue={setDescriptionPiece} />
                    </div>
                </div>
            </Modal>

            {/* Add Piece in Stock Modal */}
            <Modal
                modalTitle={`Depôt de la pièce ${apiPieceDetails.nom} en Stock`}
                isVisible={isAddStockModalVisible}
                isDeleteModalVisible = {false}
                modalWidth = {'80%'}
                closeModalAction = {closeModal}
                addBtnLabel="Ajouter"
                addNewAction = {saveAddStock}
            >
                <div className="w-full flex flex-row justify-center gap-4">
                    <div className="w-full flex flex-col justify-start gap-4">
                        <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                            Information sur la Transaction
                        </span>
                        <InputField label="Quantité à Deposer" type="Number" minValue={0} setNewValue={setQuantity} />
                        <DateInputField label="Date du Depôt" setNewValue={setDateStock} />
                    </div>
                </div>
            </Modal>

            {/* Remove Piece from Stock */}
            <Modal
                modalTitle={`Retrait de la pièce ${apiPieceDetails.nom} du Stock`}
                isVisible={isRemoveStockModalVisible}
                isDeleteModalVisible = {false}
                modalWidth = {'80%'}
                closeModalAction = {closeModal}
                addBtnLabel="Retirer"
                addNewAction = {saveRemoveStock}
            >
                <div className="w-full flex flex-row justify-center gap-4">
                    <div className="w-full flex flex-col justify-start gap-4">
                        <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                            Information sur la Transaction
                        </span>
                        <InputField label="Quantité à Retirer" type="Number" minValue={0} setNewValue={setQuantity} />
                        <DateInputField label="Date du Retrait" setNewValue={setDateStock} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}