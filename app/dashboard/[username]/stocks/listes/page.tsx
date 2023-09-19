'use client'

// import 'animate.css';
import Link from 'next/link';
import Image from "next/image"
import { useRouter } from 'next/navigation'

import AddBtn from "@/components/UIElements/AddBtn"
import InputSearchField from "@/components/UIElements/FormElments/InputSearchField"
import SubsysPieceCard from "@/components/UIElements/SubsysPieceCard"
import Modal from "@/components/UIElements/Modal"

import DropDownField from "@/components/UIElements/FormElments/DropDownField"
import InputField from "@/components/UIElements/FormElments/InputField"
import TextAreaField from "@/components/UIElements/FormElments/TextAreaField"
import StockType from "@/types/stock"
import {apiStockDataList} from "@/data/stockPage"
import {
    apiEquipmentList,
    apiSubSystemList
} from '@/data/interventionData'

import { BsUpload } from "react-icons/bs";
import { useState, useEffect, SetStateAction, Dispatch } from "react"

export default function StockLists ({params}:{params: {username: string }}) {
    const router = useRouter()
    const username = decodeURI(params.username)
    
    const [ apiStockList, setApiStockList ] = useState<Array<StockType>>([])
    const [ displayStockList, setDisplayStockList ] = useState<Array<StockType>>(apiStockList)

    const [ isAddModalVisibile, setAddModalVisibility ] = useState<boolean>(false)
    const [ isDelPieceModalVisibile, setDelPieceModalVisibility ] = useState<boolean>(false)

    // APi Equipment and Sub System Informatio Start
    const [ apiEquipNameList, setApiEquipNameList ] = useState<Array<string>>(apiEquipmentList)
    const [ apiSubSysNameList, setApiSubNameSysList ] = useState<Array<string>>(apiSubSystemList)
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
    const [ localisationPiece, setLocalisationPiece ] = useState<string>("")
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
        setLocalisationPiece("")
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

    const addPieceInStock = () => {
        if(isAddFormValid){
            let tempList = [...apiStockList]
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
            let stockIndex
            let selectedStock = tempList.find((stock)=>{
                return (stock.nomSousSysteme.toLowerCase().trim().includes(subSysName.toLowerCase().trim()))
                && (stock.nomEquipement.toLowerCase().trim().includes(equipName.toLowerCase().trim()))
            })
            if(selectedStock !== undefined){
                stockIndex = tempList.indexOf(selectedStock)
                console.log(stockIndex)
                tempList[stockIndex].listePieces.push(tempPiece)
            }
            else{
                let tempStock = {
                    nomEquipement: equipName,
                    nomSousSysteme: subSysName,
                    listePieces: [tempPiece]
                }
                tempList.push(tempStock)
            }
            setApiStockList(tempList)
            closeModal()
        }
    }
    
    const routeToPiece = (equipmentName: string, subSysName: string, pieceName: string) => {
        router.push(`/dashboard/${username}/equipements/${equipmentName}/${subSysName}/pieces/${pieceName}`)
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

    useEffect(()=>{
        setDisplayStockList(apiStockList)
    },[apiStockList])

    useEffect(() => {
        const generateStockList = async () => {
            const sysreq = await fetch('/api/equipements')
            const json = await sysreq.json()
            
            const { equipements } = json
            if (!equipements) return
            
            if(equipements.length > 0) {
                const equipList: StockType[] = []

                for(let equipement of equipements){
                    console.log(equipement)
                    
                    const subsysreq = await fetch(`/api/equipements/${equipement.id}/sous-systemes`)
                    const subsysjson = await subsysreq.json()

                    const { sousSystemes } = subsysjson

                    if(!sousSystemes) return

                    if(sousSystemes.length > 0) {
                        for (let sousSystem of sousSystemes) {
                            const syst: StockType = {
                                nomEquipement: equipement.nom,
                                nomSousSysteme: sousSystem.nom,
                                listePieces: []
                            }

                            const piecesreq = await fetch(`/api/equipements/sous-systeme/${sousSystem.id}/pieces`)
                            const piecesjson = await piecesreq.json()

                            const { pieces } = piecesjson

                            if(!pieces) return
                            
                            
                            if(pieces.length > 0){
                                syst.listePieces = pieces
                            }

                            equipList.push(syst)
                        }
                    }
                }
                setApiStockList(equipList)
                console.log(equipList)
            }
            return
        }
        generateStockList()
    }, [])

    useEffect(()=> {
        if(equipName!=="" && subSysName!=="" &&
            nomPiece!=="" && marquePiece!=="" &&
            modelePiece!=="" && numSeriePiece!=="" &&
            localisationPiece!=="" && qteStockPiece>0 &&
            qteMinPiece>0 && descriptionPiece!=="" &&
            imagePiece!==""){
                setAddFormValidity(true)
        }
    }, [equipName,subSysName,nomPiece,marquePiece,modelePiece,numSeriePiece,localisationPiece,qteStockPiece,qteMinPiece,descriptionPiece,imagePiece])

    return(
        <div className="w-full h-full bg-white rounded-2xl shadow backdrop-blur-[20px] p-2 flex-col justify-start items-center gap-2 flex">
            <div className="w-full justify-start items-center gap-4 inline-flex">
                <span className="text-zinc-800 text-2xl font-semibold uppercase leading-[52.11px]">Stocks des pièces de rechange</span>
                <span className="w-10 h-10 p-5 bg-sky-500 rounded-[100px] justify-center items-center inline-flex text-white text-base font-semibold">{StockLists.length}</span>
            </div>

            <div className="w-full h-full p-2 bg-white rounded-2xl border border-slate-300 flex-col justify-start items-center gap-2.5 flex">
                <div className="w-full justify-between items-center gap-4 inline-flex">
                    <InputSearchField setNewSearchValue={sortPieceList} placeholder="Rechercher une pièce, un sous système ou équipement"/>
                    <AddBtn width={400} placeholder="Ajouter une Pièce" addFunction={()=>{setAddModalVisibility(true)}}/>
                </div>

                <div className="pb-2 w-full h-full flex flex-col gap-4 overflow-y-auto">
                    {/* Below is the List of Pieces in the Stock */}
                    {
                        displayStockList.map((stock, index) => {
                            const equipmentNameLink = stock.nomEquipement.replace(' ', '-')
                            const subSysNameLink = stock.nomSousSysteme.replace(' ', '-')
                            return <div key={index} className="w-full p-2 bg-white rounded-2xl border border-[#165081] justify-start items-center gap-2 flex flex-col">
                                        <div className="w-full pb-1 border-b border-slate-300 gap-2 flex flex-row justify-start items-center">
                                            <Link href={`/dashboard/${username}/equipements/${equipmentNameLink}`} className="text-[#165081] text-xl font-semibold uppercase leading-[52.11px]">{stock.nomEquipement}</Link>
                                            <Link href={`/dashboard/${username}/equipements/${equipmentNameLink}/${subSysNameLink}`} className="text-[#0B5DA7] text-xl font-semibold uppercase leading-[52.11px]">- {stock.nomSousSysteme}</Link>
                                            <span className="w-8 h-8 p-3 bg-sky-500 rounded-[100px] justify-center items-center inline-flex text-white text-[12px] font-semibold">{stock.listePieces.length}</span>
                                        </div>
                                        <div className="w-full flex flex-wrap gap-2 justify-start items-start">
                                            {
                                                stock.listePieces.map((piece, i) => {
                                                    return <SubsysPieceCard
                                                                key ={i}
                                                                sysPieceInfo = {piece}
                                                                routeToDetails = {()=> routeToPiece(stock.nomEquipement, stock.nomSousSysteme, piece.nom)}
                                                                deleteAction = {()=>{setSelectedPiece({stockIndex:index, pieceIndex:i, pieceName:piece.nom})
                                                                setDelPieceModalVisibility(true)}}
                                                                href=""
                                                            />
                                                })
                                            }
                                        </div>
                                    </div>
                        })
                    }
                    
                </div>

            </div>
                {/* Delete Piece Modal */}
                <Modal
                    modalTitle="Supprimer la Pieèce de Rechange"
                    isVisible={isDelPieceModalVisibile}
                    isDeleteModalVisible = {isDelPieceModalVisibile}
                    deleteText = {<span>
                        Vous êtes sur le point de supprimer la pièce de rechange
                        <span className='font-bold'>{selectedPiece.pieceName}</span>
                        du sous système
                        <span className='font-bold'>{`apiStockList[selectedPiece.stockIndex].nomSousSysteme`}</span>
                        . Voulez-vous poursuivre ?
                        </span>
                    }
                    modalWidth = {600}
                    closeModalAction = {closeModal}
                    deleteAction = {deletePiece}
                />

                {/* Add Piece in Stock Modal */}
                <Modal
                    modalTitle="Nouvelle PIèce de Rechange en Stock"
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
                            <DropDownField label="" optionList={apiEquipNameList.map((name,index)=>{ return name+(index+1)})} placeholder="Selectionner l'équipement" setNewValue={setEquipName} />
                            <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                                Sous Système
                            </span>
                            <DropDownField label="" optionList={apiSubSysNameList.map((name,index)=>{ return name+(index+1)})} placeholder='Selectionner le sous Système' setNewValue={setSubSysName} />
                            <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                                Image de la Pièce de Rechange
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
                            <InputField label="Localisation" setNewValue={setLocalisationPiece} />
                            <InputField label="Quantité en Stock" type="Number" minValue={0} setNewValue={setQteStockPiece} />
                            <InputField label="Quantité Minimale" type="Number" minValue={0} setNewValue={setQteMinPiece} />
                            <TextAreaField label="Description" setNewValue={setDescriptionPiece} />
                        </div>
                    </div>
                </Modal>
            
        </div>
    )
}