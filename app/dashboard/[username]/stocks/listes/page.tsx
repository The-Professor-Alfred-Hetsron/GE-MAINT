'use client'

import 'animate.css';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation'
import AddBtn from "@/components/UIElements/AddBtn"
import InputSearchField from "@/components/UIElements/FormElments/InputSearchField"
import SubsysPieceCard from "@/components/UIElements/SubsysPieceCard"

export default function StockLists () {
    const router = useRouter()
    const pathname = usePathname()
    const username = pathname.split('/')[pathname.split('/').indexOf("dashboard")+1]

    const StockLists = [
        {
            nomEquipement: "Nom Equipement1",
            nomSousSysteme: "Nom Sous système1",
            listePieces: [
                {
                    nom: "Nom Piece1",
                    marque: "Marque Fabricant",
                    numSerie: "5G4D5F1D",
                    modele: "Equip5G4D5F1D",
                    localisation: "Departement Equip",
                    qteStock: 10,
                    qteMin: 2,
                    description: "Le Meilleur Sous Système au monde",
                    image: "/assets/img/dashboard/sousSystemes/fan-groupElectro.png"
                },
                {
                    nom: "Nom Piece2",
                    marque: "Marque Fabricant",
                    numSerie: "5G4D5F1D",
                    modele: "Equip5G4D5F1D",
                    localisation: "Departement Equip",
                    qteStock: 10,
                    qteMin: 2,
                    description: "Le Meilleur Sous Système au monde",
                    image: "/assets/img/dashboard/sousSystemes/fan-groupElectro.png"
                }
            ]
        },
        {
            nomEquipement: "Nom Equipement1",
            nomSousSysteme: "Nom Sous système2",
            listePieces: [
                {
                    nom: "Nom Piece1",
                    marque: "Marque Fabricant",
                    numSerie: "5G4D5F1D",
                    modele: "Equip5G4D5F1D",
                    localisation: "Departement Equip",
                    qteStock: 10,
                    qteMin: 2,
                    description: "Le Meilleur Sous Système au monde",
                    image: "/assets/img/dashboard/sousSystemes/moteur-groupElectro1.png"
                },
                {
                    nom: "Nom Piece2",
                    marque: "Marque Fabricant",
                    numSerie: "5G4D5F1D",
                    modele: "Equip5G4D5F1D",
                    localisation: "Departement Equip",
                    qteStock: 10,
                    qteMin: 2,
                    description: "Le Meilleur Sous Système au monde",
                    image: "/assets/img/dashboard/sousSystemes/moteur-groupElectro2.png"
                },
                {
                    nom: "Nom Piece2",
                    marque: "Marque Fabricant",
                    numSerie: "5G4D5F1D",
                    modele: "Equip5G4D5F1D",
                    localisation: "Departement Equip",
                    qteStock: 10,
                    qteMin: 2,
                    description: "Le Meilleur Sous Système au monde",
                    image: "/assets/img/dashboard/sousSystemes/moteur-groupElectro1.png"
                }
            ]
        }
    ]
    const sortPieceList = (value : string) =>{

    }

    const openAddPieceModal = () => {

    }
    
    const routeToPiece = (equipmentName: string, subSysName: string, pieceName: string) => {
        router.push(`/dashboard/${username}/equipements/${equipmentName.replace(" ","-")}/${subSysName.replace(" ","-")}/pieces/${pieceName.replace(" ","-")}`)
    }

    const deletePiece = (equipmentName: string, subSysName: string, pieceName: string) => {
        console.log('delete piece '+pieceName)
    }
    return(
        <div className="animate__animated animate__fadeInRight w-full bg-white rounded-2xl shadow backdrop-blur-[20px] p-2 flex-col justify-start items-center gap-2 flex">
            <div className="w-full justify-start items-center gap-4 inline-flex">
                <span className="text-zinc-800 text-2xl font-semibold uppercase leading-[52.11px]">Stocks des pièces de rechange</span>
                <span className="w-10 h-10 p-5 bg-sky-500 rounded-[100px] justify-center items-center inline-flex text-white text-base font-semibold">{StockLists.length}</span>
            </div>

            <div className="w-full h-full p-2 bg-white rounded-2xl border border-slate-300 flex-col justify-start items-center gap-2.5 flex">
                <div className="w-full justify-between items-center gap-4 inline-flex">
                    <InputSearchField setNewSearchValue={sortPieceList} placeholder="Rechercher une pièce ou un sous système"/>
                    <AddBtn width={400} placeholder="Ajouter une Pièce" addFunction={openAddPieceModal}/>
                </div>

                <div className="pb-2 w-full flex flex-col gap-2">
                    {/* Below is the List of Pieces in the Stock */}
                    {
                        StockLists.map((stock, index) => {
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
                                                stock.listePieces.map((piece, index) => {
                                                    return <SubsysPieceCard
                                                                key ={index}
                                                                sysPieceInfo = {piece}
                                                                routeToDetails = {()=> routeToPiece(stock.nomEquipement, stock.nomSousSysteme, piece.nom)}
                                                                deleteAction = {()=> deletePiece(stock.nomEquipement, stock.nomSousSysteme, piece.nom)}
                                                            />
                                                })
                                            }
                                        </div>
                                    </div>
                        })
                    }
                    
                </div>

            </div>
        </div>
    )
}