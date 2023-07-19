'use client'

'use client'

import Image from "next/image"
import Link from "next/link"
import DeleteBtn from '../../../../../../components/UIElements/DeleteBtn'
import AddBtn from "../../../../../../components/UIElements/AddBtn"
import SubsysPieceCard from '../../../../../../components/UIElements/SubsysPieceCard'
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillEye } from "react-icons/ai";
import { useRouter, usePathname } from 'next/navigation'

export default function Equipment ({params}:{params: { sousSysteme: string }}) {
    const router = useRouter()
    const pathname = usePathname()

    const equipmentName = pathname.split('/')[pathname.split('/').length-2]
    const username = pathname.split('/')[pathname.split('/').length-4]

    const sousSysteme = {
        nom: "Nom Sous Système1",
        marque: "Marque Fabricant",
        numSerie: "5G4D5F1D",
        modele: "Equip5G4D5F1D",
        localisation: "Departement Equip",
        description: "Le Meilleur Sous Système au monde",
        image: "/assets/img/dashboard/sousSystemes/fan-groupElectro.png"
    }   

    const pieceList = [
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
        }
    ]

    const panneList = [
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
    ]
    
    const deleteSubsystem = () => {
        console.log("Deleting Subsystem")
    }

    const openAddPieceModal = () => {
        console.log("Open pièce modal")
    }

    const openAddPanneModal = () => {
        console.log("Open panne modal")
    }

    const routeToPiece = (index: number) => {
        const selectedPiece = pieceList[index]
        router.push(`${pathname}/pieces/${selectedPiece.nom.replace(" ","-")}`)
    }
    // 656 36 29 73 

    const deletePiece = (index: number) => {
        console.log("deletePiece "+index)
    }

    const routeToPanne = (index: number) => {
        const selectedPanne = panneList[index]
        router.push(`${pathname}/pannes/${selectedPanne.nom.replace(" ","-")}`)
    }

    const deletePanne = (index:number) => {
        console.log("Delete panne "+index)
    }
    
    return(
        <div className="w-full bg-white rounded-2xl shadow backdrop-blur-[20px] p-2 flex-col justify-start items-center gap-2 flex">
            <div className="w-full justify-start items-center inline-flex gap-1">
                <Link href={`/dashboard/${username}/equipements/${equipmentName}`} className="text-[#165081] text-2xl font-semibold uppercase leading-[52.11px]">{equipmentName.replace("-"," ")}</Link>
                <span className="text-zinc-800 text-2xl font-semibold uppercase leading-[52.11px]"> - Sous Systèmes</span>
            </div>
            <div className="w-full p-2 bg-white rounded-2xl border border-slate-300 flex-col justify-start items-center gap-2.5 inline-flex">
                <div className="w-full flex-row justify-start items-start gap-2 inline-flex">
                    <div className='w-full aspect-square bg-[#D0E5F0] rounded-[16px] flex justify-center items-center'>
                        <Image className="w-4/5 aspect-square" width="500" height="500" src={sousSysteme.image} alt={params.sousSysteme.replace("-", " ")}/>
                    </div>
                    <div className="w-full px-4 flex-col justify-start items-start gap-2 inline-flex">
                        <div className="flex-col justify-start items-start inline-flex">
                            <span className="text-black text-[26px] font-semibold uppercase">{sousSysteme.nom}</span>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Marque du Fabricant: </span>
                                <span className="text-black text-[20px] font-semibold uppercase">{sousSysteme.marque}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Numéro de Série: </span>
                                <span className="text-black text-[20px] font-semibold uppercase">{sousSysteme.numSerie}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Modèle: </span>
                                <span className="text-black text-[20px] font-semibold uppercase">{sousSysteme.modele}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Localisation: </span>
                                <span className="text-black text-[20px] font-semibold uppercase">{sousSysteme.localisation}</span>
                            </div>
                            <div className="justify-start items-baseline gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Description: </span>
                                <span className="text-black text-[20px] font-semibold uppercase">{sousSysteme.description}</span>
                            </div>
                        </div>
                        <div className="w-full flex justify-start items-start">
                            <DeleteBtn deleteAction={deleteSubsystem}/>
                        </div>
                    </div>
                </div>

                {/* Liste des pièces de rechange ci-dessous */}
                <div className="w-full flex flex-col">
                    <div className="w-full pb-2 border-b border-slate-300 justify-start items-center gap-2.5 inline-flex">
                        <div className="w-full gap-2 flex flex-row justify-start items-baseline">
                            <span className="text-black text-[24px] font-normal">Pièces de rechange </span>
                            <span className="w-8 h-8 p-5 bg-sky-500 rounded-[100px] justify-center items-center inline-flex text-white text-base font-semibold">{pieceList.length}</span>
                        </div>
                        <AddBtn width={350} placeholder="Nouvelle Pièce" addFunction={openAddPieceModal}/>
                    </div>

                    <div className="inline-flex gap-4 py-2 justify-start items-start flex-wrap overflow-auto">
                        {
                            pieceList.map((system, index) => {
                                return <SubsysPieceCard
                                    key={index}
                                    sysPieceInfo = {system}
                                    routeToDetails = {()=>routeToPiece(index)}
                                    deleteAction = {()=>deletePiece(index)}
                                />
                            })
                        }
                    </div>
                </div>
                
                {/* Liste des pannes ci-dessous */}
                <div className="w-full flex flex-col">
                    <div className="w-full pb-2 border-b border-slate-300 justify-start items-center gap-2.5 inline-flex">
                        <div className="w-full gap-2 flex flex-row justify-start items-baseline">
                            <span className="text-black text-[24px] font-normal">Pannes </span>
                            <span className="w-8 h-8 p-5 bg-sky-500 rounded-[100px] justify-center items-center inline-flex text-white text-base font-semibold">{panneList.length}</span>
                        </div>
                        <AddBtn width={350} placeholder="Nouvelle panne" addFunction={openAddPanneModal}/>
                    </div>

                    <div className="inline-flex gap-4 py-2 justify-start items-start flex-wrap overflow-auto">
                        <table className="w-full p-2 rounded-2xl border border-slate-400 flex-col justify-start items-start inline-flex">
                            <thead className="w-full bg-white border-b border-slate-400">
                                <tr className="w-full p-2 flex gap-1 text-black text-lg font-bold leading-7 tracking-tight">
                                    <td className="w-[150px]">N°</td>
                                    <div className="w-full flex">
                                        <td className="w-2/5">Nom</td>
                                        <td className="w-3/5">Description</td>
                                    </div>
                                    <td className="w-[250px] text-center">Gravité</td>
                                    <td className="w-full text-center">Action</td>
                                </tr>
                            </thead>
                            <tbody className="w-full">
                            {
                                panneList.map((panne, index) => {
                                    return <tr key={index} className="w-full p-2 flex gap-1 text-black text-lg font-medium leading-7 tracking-tight odd:bg-white even:bg-indigo-50">
                                        <td className="w-[150px]">{index+1}</td>
                                        <div className="w-full flex">
                                            <td className="w-2/5">{panne.nom}</td>
                                            <td className="w-3/5">{panne.description}</td>
                                        </div>
                                        <td className="w-[250px] text-center">{panne.gravite}</td>
                                        <td className="w-full flex gap-1 justify-end items-start flex-wrap">
                                            <button onClick={()=>routeToPanne(index)} className="py-1 px-2 bg-white rounded-[100px] text-[#149FDA] border border-sky-500 justify-center items-center gap-1 inline-flex hover:bg-[#149FDA] hover:text-white">
                                                <AiFillEye size={20}/>
                                                <span>Details</span>
                                            </button>
                                            <button onClick={()=>deletePanne(index)} className="py-1 px-2 bg-white rounded-[100px] text-[#EA4335] border border-red-500 justify-center items-center gap-1 inline-flex hover:bg-[#EA4335] hover:text-white">
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
        </div>
    )
}