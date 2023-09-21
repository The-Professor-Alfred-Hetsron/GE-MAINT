'use client'

// import 'animate.css';
import Link from 'next/link';
import Image from "next/image"

import AddBtn from "@/components/UIElements/AddBtn"
import InputSearchField from "@/components/UIElements/FormElments/InputSearchField"
import SubsysPieceCard from "@/components/UIElements/SubsysPieceCard"
import Modal from "@/components/UIElements/Modal"

import { useAppDispatch } from "@/redux/hooks"
import { addAlert } from "@/redux/features/alerts/alertsSlice"
import { DISPLAYTIMEOUT } from "@/constants/time"

import DropDownField from "@/components/UIElements/FormElments/DropDownField"
import InputField from "@/components/UIElements/FormElments/InputField"
import TextAreaField from "@/components/UIElements/FormElments/TextAreaField"
import StockType from "@/types/stock"
import EquipmentType from "@/types/equipment"
import SubSystemType from "@/types/subSystem"
// import {apiStockDataList} from "@/data/stockPage"
// import {
//     apiEquipmentList,
//     apiSubSystemList
// } from '@/data/interventionData'

import { BsUpload } from "react-icons/bs";
import { useState, useEffect, SetStateAction, Dispatch } from "react"

export default function StockLists ({params}:{params: {username: string }}) {
    const username = decodeURI(params.username)
    const dispatch = useAppDispatch()
    const [ apiStockList, setApiStockList ] = useState<Array<StockType>>([])
    const [ displayStockList, setDisplayStockList ] = useState<Array<StockType>>(apiStockList)

    const [ isAddModalVisibile, setAddModalVisibility ] = useState<boolean>(false)
    const [ isDelPieceModalVisibile, setDelPieceModalVisibility ] = useState<boolean>(false)

    // APi Equipment and Sub System Informatio Start
    const [ apiEquipIdList, setApiEquipIdList ] = useState<Array<number>>([])
    const [ apiEquipNames, setApiEquipNames ] = useState<Array<string>>([])

    const [ apiSubsysIdList, setApiSubsysIdList ] = useState<Array<number>>([])
    const [ apiSubSysNames, setApiSubSysNames ] = useState<Array<string>>([])
    // APi Equipment and Sub System Informatio End

    // Piece Information Start
    const [ equipName, setEquipName ] = useState<string>("")
    const [ subSysName, setSubSysName ] = useState<string>("")
    const [ imagePiece, setImagePiece ] = useState<string | ArrayBuffer | undefined>("")
    const [ previewImagePiece, setPreviewImagePiece ] = useState<string | ArrayBuffer | undefined>("")
    const [ nomPiece, setNomPiece ] = useState<string>("")
    const [ marquePiece, setMarquePiece ] = useState<string>("")
    const [ modelePiece, setModelePiece ] = useState<string>("")
    const [ numSeriePiece, setNumSeriePiece ] = useState<string>("")
    const [ qteStockPiece, setQteStockPiece ] = useState<number>(0)
    const [ qteMinPiece, setQteMinPiece ] = useState<number>(0)
    const [ descriptionPiece, setDescriptionPiece ] = useState<string>("")
    // Piece Information End

    const [ isAddFormValid, setAddFormValidity ] = useState<boolean>(false)
    const [ selectedPiece, setSelectedPiece ] = useState<{stockIndex:number, pieceIndex:number, pieceName:string}>({stockIndex:0, pieceIndex:0, pieceName:""})

    const initialiseParams = () => {
        setEquipName("")
        setSubSysName("")
        setImagePiece("")
        setPreviewImagePiece("")
        setNomPiece("")
        setMarquePiece("")
        setModelePiece("")
        setNumSeriePiece("")
        setQteStockPiece(0)
        setQteMinPiece(0)
        setDescriptionPiece("")
        setAddFormValidity(false)
    }

    const closeModal = () => {
        setAddModalVisibility(false)
        setDelPieceModalVisibility(false)

        setSelectedPiece({stockIndex:0, pieceIndex:0, pieceName:""})
        initialiseParams()
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

    const sortPieceList = (value : string) =>{
        if(value !== ""){
            let tempList = [...apiStockList]
            tempList = apiStockList.filter((stock)=>{
                return ((stock.nomEquipement.toLowerCase().trim().includes(value.toLowerCase().trim())) ||
                        (stock.nomSousSysteme.toLowerCase().trim().includes(value.toLowerCase().trim())) ||
                        (stock.listePieces.find((piece)=>{
                            return piece.nom.toLowerCase().trim().includes(value.toLowerCase().trim())
                        })?.nom.toLowerCase().trim().includes(value.toLowerCase().trim()))
                        )
            })
            if(tempList.length > 0) {
                setDisplayStockList(tempList)
            }
        }
        else{
            setDisplayStockList(apiStockList)
        }
    }

    const addPieceInStock = async () => {
        if(isAddFormValid){
            let tempList = [...apiStockList]
            const eqId = apiEquipIdList[apiEquipNames.indexOf(equipName)]
            const subId = apiSubsysIdList[apiSubSysNames.indexOf(subSysName)]
            const tempPiece = {
                nom: nomPiece,
                numero_serie: numSeriePiece,
                marque_fabricant: marquePiece,
                image: imagePiece,
                description: descriptionPiece,
                modele: modelePiece,
                stock: qteStockPiece,
                minimum_stock: qteMinPiece,
                soussysteme_id:subId
            }
            try {
                const response = await fetch(`/api/equipements/sous-systeme/pieces/ajouter`, {
                    method: 'POST',
                    body: JSON.stringify(tempPiece)
                });
                const json = await response.json()
                const { piece } = json
                if (!piece) return;
            } catch (error) {
                console.log(error)
                closeModal()
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message:"La Pièce n'a pas été Ajouté"}))
                }, DISPLAYTIMEOUT)
                return
            }
            dispatch(addAlert({type: 'SUCCESS', message: 'Pièces ajouté avec Succès'}))
            let stockIndex
            let selectedStock = tempList.find((stock)=>{
                return (stock.nomSousSysteme.toLowerCase().trim().includes(subSysName.toLowerCase().trim()))
                && (stock.nomEquipement.toLowerCase().trim().includes(equipName.toLowerCase().trim()))
            })
            if(selectedStock != undefined){
                stockIndex = tempList.indexOf(selectedStock)
                console.log(stockIndex)
                tempList[stockIndex].listePieces.push(tempPiece)
            }
            else{
                let tempStock = {
                    equipId:eqId,
                    nomEquipement: equipName,
                    nomSousSysteme: subSysName,
                    subSysId:subId,
                    listePieces: [tempPiece]
                }
                tempList.push(tempStock)
            }
            setApiStockList(tempList)
            closeModal()
        }
    }

    const deletePiece = () => {
        let tempList = [...apiStockList]
        tempList[selectedPiece.stockIndex].listePieces.splice(selectedPiece.pieceIndex,1)
        if(tempList[selectedPiece.stockIndex].listePieces.length===0){
            tempList.splice(selectedPiece.stockIndex,1)
        }
        setApiStockList(tempList)
        closeModal()
    }

    const initialiseEquipList = (equipements:Array<EquipmentType>) => {
        console.log(equipements)
        const tempIds = equipements.map((equip:EquipmentType) => {
            return equip.id
        });
        console.log(tempIds)
        setApiEquipIdList(tempIds)
        const tempNames = equipements.map((equip:EquipmentType) => {
            return equip.nom
        });
        console.log(tempNames)
        setApiEquipNames(tempNames)
    }

    const initialiseSubsysList = async (equip:string) =>{
        if(equip!=""){
            setEquipName(equip)
            const tempId = apiEquipIdList[apiEquipNames.indexOf(equip)]
            console.log(tempId)
            if(tempId != undefined){
                const subsysreq = await fetch(`/api/equipements/${tempId}/sous-systemes`)
                const subsysjson = await subsysreq.json()
                const { sousSystemes } = subsysjson
                if(!sousSystemes) return
                if(sousSystemes.length>0){
                    const tempIds =  sousSystemes.map((sub:SubSystemType) => {
                        return sub.id
                    });
                    console.log(tempIds)
                    setApiSubsysIdList(tempIds)
                    const tempNames = sousSystemes.map((sub:SubSystemType) => {
                        return sub.nom
                    });
                    setApiSubSysNames(tempNames)
                    console.log(tempNames)
                }
            }
        }
    }

    useEffect(()=>{
        setDisplayStockList(apiStockList)
    },[apiStockList])

    useEffect(() => {
        const generateStockList = async () => {
            const sysreq = await fetch('/api/equipements')
            const json = await sysreq.json()
            
            const { equipements } = json
            if (!equipements){
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: 'Echec du chargement des Stocks'}))
                }, DISPLAYTIMEOUT)
                return
            }
            
            if(equipements.length > 0) {
                const stockList: StockType[] = []
                initialiseEquipList(equipements)

                for(let equipement of equipements){
                    console.log(equipement)
                    const subsysreq = await fetch(`/api/equipements/${equipement.id}/sous-systemes`)
                    const subsysjson = await subsysreq.json()

                    const { sousSystemes } = subsysjson

                    if(!sousSystemes){
                        setTimeout(() => {
                            dispatch(addAlert({type: 'FAILURE', message: 'Echec du chargement des Stocks'}))
                        }, DISPLAYTIMEOUT)
                        return
                    }

                    if(sousSystemes.length > 0) {
                        for (let sousSystem of sousSystemes) {
                            const syst: StockType = {
                                equipId:equipement.id,
                                nomEquipement: equipement.nom,
                                nomSousSysteme: sousSystem.nom,
                                subSysId:sousSystem.id,
                                listePieces: []
                            }

                            const piecesreq = await fetch(`/api/equipements/sous-systeme/${sousSystem.id}/pieces`)
                            const piecesjson = await piecesreq.json()

                            const { pieces } = piecesjson

                            if(!pieces) return
                            
                            if(pieces.length > 0){
                                syst.listePieces = pieces
                                stockList.push(syst)
                            }
                        }
                    }
                }
                setTimeout(() => {
                    dispatch(addAlert({type: 'SUCCESS', message: 'Stocks chargées avec succes'}))
                }, DISPLAYTIMEOUT)
                setApiStockList(stockList)
                console.log(stockList)
            }
            return
        }
        generateStockList()
    }, [])

    useEffect(()=> {
        if(equipName!=="" && subSysName!=="" &&
            nomPiece!=="" && marquePiece!=="" &&
            modelePiece!=="" && numSeriePiece!=="" &&
            qteStockPiece>0 && qteMinPiece>0 &&
            descriptionPiece!=="" && imagePiece!==""){
                setAddFormValidity(true)
        }
    }, [equipName,subSysName,nomPiece,marquePiece,modelePiece,numSeriePiece,qteStockPiece,qteMinPiece,descriptionPiece,imagePiece])

    return(
        <div className="w-full h-full bg-white rounded-2xl shadow drop-shadow-md p-2 flex-col justify-start items-center gap-2 flex">
            <div className="w-full justify-start items-center gap-4 inline-flex">
                <span className="text-zinc-800 text-2xl font-semibold uppercase leading-[52.11px]">Stocks des pièces</span>
                <span className="w-10 h-10 p-5 bg-sky-500 rounded-[100px] justify-center items-center inline-flex text-white text-base font-semibold">{apiStockList.length}</span>
            </div>

            <div className="w-full h-full overflow-y-auto p-2 bg-white rounded-2xl border border-slate-300 flex-col justify-start items-center gap-2.5 flex">
                <div className="w-full justify-between items-center gap-4 inline-flex">
                    <InputSearchField setNewSearchValue={sortPieceList} placeholder="Rechercher une pièce, un sous système ou équipement"/>
                    <AddBtn width={400} placeholder="Ajouter une Pièce" addFunction={()=>{setAddModalVisibility(true)}}/>
                </div>
                {/* Below is the List of Pieces in the Stock */}
                {
                    displayStockList.length==0
                    ?<>
                        <div role="status"  className="w-full p-2 rounded-2xl border border-gray-200 dark:border-gray-700 justify-start items-center gap-2 flex flex-col">
                            <div className="w-full pb-1 border-b border-gray-200 gap-2 flex flex-row justify-start items-center">
                                <div className="animate-pulse w-[100px] h-5 p-2 rounded-[32px] bg-gray-200 dark:bg-gray-700"></div>
                                <div className="animate-pulse w-[100px] h-5 p-2 rounded-[32px] bg-gray-200 dark:bg-gray-400"></div>
                                <div className="animate-pulse w-8 aspect-square p-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                            </div>
                            <div className="w-full flex flex-wrap gap-2 justify-start items-start">
                                
                                <div className="w-[180px] aspect-square rounded-[16px] border border-gray-200 flex-col justify-start items-start inline-flex">
                                    <div className="w-full h-3/4 py-4 bg-gray-300 rounded-t-2xl flex justify-center items-center dark:bg-gray-700">
                                        <svg className="animate-pulse w-3/5 aspect-square text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                        </svg>
                                    </div>
                                    <div className="w-full p-2 flex-row justify-center items-center inline-flex">
                                        <div className="py-2 w-full flex-col justify-start items-start gap-[3px] inline-flex">
                                            <div className="animate-pulse w-[100px] h-1 p-2 rounded-[32px] bg-gray-200 dark:bg-gray-700"></div>
                                            <div className="animate-pulse w-[100px] h-1 p-2 rounded-[32px] bg-gray-200 dark:bg-gray-700"></div>
                                        </div>
                                        <div className="animate-pulse w-6 aspect-square p-2 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                                    </div>
                                </div>
                                <div className="w-[180px] aspect-square rounded-[16px] border border-gray-200 flex-col justify-start items-start inline-flex">
                                    <div className="w-full h-3/4 py-4 bg-gray-300 rounded-t-2xl flex justify-center items-center dark:bg-gray-700">
                                        <svg className="animate-pulse w-3/5 aspect-square text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                        </svg>
                                    </div>
                                    <div className="w-full p-2 flex-row justify-center items-center inline-flex">
                                        <div className="py-2 w-full flex-col justify-start items-start gap-[3px] inline-flex">
                                            <div className="animate-pulse w-[100px] h-1 p-2 rounded-[32px] bg-gray-200 dark:bg-gray-700"></div>
                                            <div className="animate-pulse w-[100px] h-1 p-2 rounded-[32px] bg-gray-200 dark:bg-gray-700"></div>
                                        </div>
                                        <div className="animate-pulse w-6 aspect-square p-2 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </>
                    : displayStockList.map((stock, index) => {
                        const subSysNameLink = stock.nomSousSysteme.replace(' ', '-')
                        return <div key={index} className="w-full p-2 bg-white rounded-2xl border border-[#165081] justify-start items-center gap-2 flex flex-col">
                                    <div className="w-full pb-1 border-b border-slate-300 gap-2 flex flex-row justify-start items-center">
                                        <Link href={`/dashboard/${username}/equipements/${stock.equipId}`} className="text-[#165081] text-xl font-semibold uppercase leading-[52.11px]">{stock.nomEquipement}</Link>
                                        <Link href={`/dashboard/${username}/equipements/${stock.equipId}/${subSysNameLink}/${stock.subSysId}`} className="text-[#0B5DA7] text-xl font-semibold uppercase leading-[52.11px]">- {stock.nomSousSysteme}</Link>
                                        <span className="w-8 h-8 p-3 bg-sky-500 rounded-full justify-center items-center inline-flex text-white text-[12px] font-semibold">{stock.listePieces.length}</span>
                                    </div>
                                    <div className="w-full flex flex-wrap gap-2 justify-start items-start">
                                        {
                                            stock.listePieces.map((piece, i) => {
                                                return <SubsysPieceCard
                                                            key ={i}
                                                            sysPieceInfo = {piece}
                                                            deleteAction = {()=>{setSelectedPiece({stockIndex:index, pieceIndex:i, pieceName:piece.nom})
                                                            setDelPieceModalVisibility(true)}}
                                                            href={`/dashboard/${username}/equipements/${stock.equipId}/${subSysNameLink}/${stock.subSysId}/pieces/${piece.id}`}
                                                        />
                                            })
                                        }
                                    </div>
                                </div>
                    })
                }

            </div>
                {/* Delete Piece Modal */}
                <Modal
                    modalTitle="Supprimer la Pieèce"
                    isVisible={isDelPieceModalVisibile}
                    isDeleteModalVisible = {isDelPieceModalVisibile}
                    deleteText = {<span>
                        Vous êtes sur le point de supprimer la pièce
                        <span className='font-bold'>{` ${selectedPiece.pieceName} `}</span>
                        du sous système
                        <span className='font-bold'>{` ${apiStockList[selectedPiece.stockIndex]?.nomSousSysteme} `}</span>
                        . Voulez-vous poursuivre ?
                        </span>
                    }
                    modalWidth = {600}
                    closeModalAction = {closeModal}
                    deleteAction = {deletePiece}
                />

                {/* Add Piece in Stock Modal */}
                <Modal
                    modalTitle="Nouvelle PIèce en Stock"
                    isVisible={isAddModalVisibile}
                    isDeleteModalVisible = {false}
                    modalWidth = {'80%'}
                    closeModalAction = {closeModal}
                    addBtnLabel="Ajouter"
                    addNewAction = {addPieceInStock}
                >
                    <div className="w-full flex flex-row justify-center gap-4">
                        <div className="w-full flex flex-col justify-start gap-4">
                        <span className="border-b border-slate-300 capitalize justify-center items-center text-black text-[20px] font-normal">
                                équipement
                            </span>
                            <DropDownField label="" optionList={apiEquipNames} placeholder="Selectionner l'équipement" setNewValue={initialiseSubsysList} />
                            <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                                Sous Système
                            </span>
                            <DropDownField label="" optionList={apiSubSysNames} placeholder='Selectionner le sous Système' setNewValue={setSubSysName} />
                            <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                                Image de la Pièce
                            </span>
                            <div className="w-4/5 relative aspect-square rounded-2xl bg-slate-300 border border-slate-500 border-dotted">
                                <div className='w-full aspect-square rounded-2xl flex flex-col bg-[rgba(0,0,0,0.5)] text-white justify-center items-center absolute'>
                                    <BsUpload size={32}/>
                                    <span className='text-center text-[20px] font-normal leading-normal tracking-wide'>Ajouter l’image</span>
                                </div>
                                <input onChange={(e)=>{addImage(e,setImagePiece, setPreviewImagePiece)}} className='w-full absolute aspect-square rounded-2xl file:text-transparent file:hover:cursor-pointer file:border-0 file:w-full file:aspect-square file:bg-transparent' type="file" accept="image/*" />
                                {previewImagePiece && <Image className="w-full aspect-square rounded-2xl" src={`${previewImagePiece}`} alt="Apercu de la pièce" width={500} height={500}/>}
                            </div>
                        </div>

                        <div className="w-full flex flex-col justify-start gap-4">
                            <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                                Caractéristiques
                            </span>
                            <InputField label="Nom" setNewValue={setNomPiece} />
                            <InputField label="Marque du Fabricant" setNewValue={setMarquePiece} />
                            <InputField label="Modèle"  setNewValue={setModelePiece} />
                            <InputField label="Numéro de Série" setNewValue={setNumSeriePiece} />
                            <InputField label="Quantité en Stock" type="Number" minValue={0} setNewValue={setQteStockPiece} />
                            <InputField label="Quantité Minimale" type="Number" minValue={0} setNewValue={setQteMinPiece} />
                            <TextAreaField label="Description" setNewValue={setDescriptionPiece} />
                        </div>
                    </div>
                </Modal>
            
        </div>
    )
}