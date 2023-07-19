'use client'

import Link from "next/link"
import Image from "next/image"
import { usePathname } from 'next/navigation'
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import DeleteBtn from '../../../../../../../../components/UIElements/DeleteBtn'

export default function Piece ({params}:{params: { piece: string }}) {
    const pathname = usePathname()
    const subSysName = pathname.split('/')[pathname.split('/').length-3]
    const equipmentName = pathname.split('/')[pathname.split('/').length-4]
    const username = pathname.split('/')[pathname.split('/').length-6]

    const piece = {
        nom: "Nom Piece1",
        marque: "Marque Fabricant",
        numSerie: "5G4D5F1D",
        modele: "Equip5G4D5F1D",
        localisation: "Departement Equip",
        description: "Le Meilleur Sous Système au monde",
        image: "/assets/img/dashboard/sousSystemes/fan-groupElectro.png"
    }  

    const deletePiece = () => {
        console.log("Deleting Piece")
    }

    return(
        <div className="w-full bg-white rounded-2xl shadow backdrop-blur-[20px] p-2 flex-col justify-start items-center gap-2 flex">
            <div className="w-full justify-start items-center inline-flex gap-1">
                <Link href={`/dashboard/${username}/equipements/${equipmentName}`} className="text-[#165081] text-2xl font-semibold uppercase leading-[52.11px]">{equipmentName.replace("-"," ")}</Link>
                <Link href={`/dashboard/${username}/equipements/${equipmentName}/${subSysName}`} className="text-[#0B5DA7] text-2xl font-semibold uppercase leading-[52.11px]"> - {subSysName.replace("-"," ")}</Link>
                <span className="text-zinc-800 text-2xl font-semibold uppercase leading-[52.11px]"> - Pièces de rechange</span>
            </div>

            <div className="w-full p-2 bg-white rounded-2xl border border-slate-300 flex-col justify-start items-center gap-2.5 inline-flex">
                <div className="w-full flex-row justify-start items-start gap-2 inline-flex">
                    <div className='w-full aspect-square bg-[#D0E5F0] rounded-[16px] flex justify-center items-center'>
                        <Image className="w-4/5 aspect-square" width="500" height="500" src={piece.image} alt={params.piece.replace("-", " ")}/>
                    </div>
                    <div className="w-full px-4 flex-col justify-start items-start gap-2 inline-flex">
                        <div className="flex-col justify-start items-start inline-flex">
                            <span className="text-black text-[26px] font-semibold uppercase">{piece.nom}</span>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Marque du Fabricant: </span>
                                <span className="text-black text-[20px] font-semibold uppercase">{piece.marque}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Numéro de Série: </span>
                                <span className="text-black text-[20px] font-semibold uppercase">{piece.numSerie}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Modèle: </span>
                                <span className="text-black text-[20px] font-semibold uppercase">{piece.modele}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Localisation: </span>
                                <span className="text-black text-[20px] font-semibold uppercase">{piece.localisation}</span>
                            </div>
                            <div className="justify-start items-baseline gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Description: </span>
                                <span className="text-black text-[20px] font-semibold uppercase">{piece.description}</span>
                            </div>
                        </div>
                        <div className="w-full pr-2 flex justify-between items-start">
                            <DeleteBtn deleteAction={deletePiece}/>
                            <button onClick={()=>deletePiece()} className='px-4 py-2 justify-center items-center gap-2 inline-flex rounded-lg bg-white border border-[#EDA92A] text-[#EDA92A] hover:bg-[#EDA92A] hover:border-none hover:text-white'>
                                <AiOutlineMinus size={20}/>
                                <span className='text-[16px] font-semibold'>Retirer du Stock</span>
                            </button>
                            <button onClick={()=>deletePiece()} className='px-4 py-2 justify-center items-center gap-2 inline-flex rounded-lg bg-white border border-[#34A853] text-[#34A853] hover:bg-[#34A853] hover:border-none hover:text-white'>
                                <AiOutlinePlus size={20}/>
                                <span className='text-[16px] font-semibold'>Ajouter en Stock</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}