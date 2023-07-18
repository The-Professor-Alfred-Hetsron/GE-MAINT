'use client'

import Image from "next/image"
import { useRouter, usePathname } from 'next/navigation'
import DeleteBtn from '../../../../../components/UIElements/DeleteBtn'
import AddBtn from "../../../../../components/UIElements/AddBtn"
import SubsysPieceCard from '../../../../../components/UIElements/SubsysPieceCard'

export default function Equipment ({params}:{params: { equipment: string }}) {
    const equipmentDetail = {
        nom: "Nom Equipement1",
        code: "5G4D5F1D",
        marque: "Marque Fabricant",
        numSerie: "5G4D5F1D",
        modele: "Equip5G4D5F1D",
        localisation: "Departement Equip",
        etat: "Fonctionnel",
        description: "Le Meilleur Equipement au monde",
        image: "/assets/img/index-generator.png",
        sousSystem: [
            {
                nom: "Nom SousSystème1",
                marque: "Marque Fabricant",
                numSerie: "5G4D5F1D",
                modele: "Equip5G4D5F1D",
                localisation: "Departement Equip",
                description: "Le Meilleur Equipement au monde",
                image: "/assets/img/dashboard/sousSystemes/fan-groupElectro.png"
            },
            {
                nom: "Nom SousSystème2",
                marque: "Marque Fabricant",
                numSerie: "5G4D5F1D",
                modele: "Equip5G4D5F1D",
                localisation: "Departement Equip",
                description: "Le Meilleur Equipement au monde",
                image: "/assets/img/dashboard/sousSystemes/moteur-groupElectro1.png"
            },
            {
                nom: "Nom SousSystème3",
                marque: "Marque Fabricant",
                numSerie: "5G4D5F1D",
                modele: "Equip5G4D5F1D",
                localisation: "Departement Equip",
                description: "Le Meilleur Equipement au monde",
                image: "/assets/img/dashboard/sousSystemes/moteur-groupElectro2.png"
            }
        ]
    }
    
    const deleteEquipment = () => {
        console.log("Deleting Equipment")
    }
    const openAddModal = () => {
        console.log("Open modal")
    }

    const router = useRouter()
    const pathname = usePathname()

    const routeToDetails = (index:number) => {
        const subSys = equipmentDetail.sousSystem[index]
        router.push(`${pathname}/${subSys.nom.replace(" ", "-")}`)
    }

    
    return(
        <div className="w-full bg-white rounded-2xl shadow backdrop-blur-[20px] p-2 flex-col justify-start items-center gap-2 inline-flex">
            <div className="w-full justify-start items-center inline-flex">
                <span className="text-zinc-800 text-2xl font-semibold uppercase leading-[52.11px]">Catalogue d’équipements</span>
            </div>
            <div className="w-full p-2 bg-white rounded-2xl border border-slate-300 flex-col justify-start items-center gap-2.5 inline-flex">
                <div className="w-full flex-row justify-start items-start gap-2 inline-flex">
                    <div className='w-full aspect-square bg-[#D0E5F0] rounded-[16px] flex justify-center items-center'>
                        <Image className="w-4/5 aspect-square" width="500" height="500" src={equipmentDetail.image} alt={params.equipment.replace("-", " ")}/>
                    </div>
                    <div className="w-full px-4 flex-col justify-start items-start gap-2 inline-flex">
                        <div className="flex-col justify-start items-start inline-flex">
                            <span className="text-black text-[26px] font-semibold uppercase">{equipmentDetail.nom}</span>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Code: </span>
                                <span className="text-black text-[20px] font-semibold uppercase">{equipmentDetail.code}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Marque du Fabricant: </span>
                                <span className="text-black text-[20px] font-semibold uppercase">{equipmentDetail.marque}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Numéro de Série: </span>
                                <span className="text-black text-[20px] font-semibold uppercase">{equipmentDetail.numSerie}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Modèle: </span>
                                <span className="text-black text-[20px] font-semibold uppercase">{equipmentDetail.modele}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Localisation: </span>
                                <span className="text-black text-[20px] font-semibold uppercase">{equipmentDetail.localisation}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Etat: </span>
                                <span className="text-[20px] text-[#149FDA] font-semibold uppercase">{equipmentDetail.etat}</span>
                            </div>
                            <div className="justify-start items-baseline gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Description: </span>
                                <span className="text-black text-[20px] font-semibold uppercase">{equipmentDetail.description}</span>
                            </div>
                        </div>
                        <div className="w-full flex justify-start items-start">
                            <DeleteBtn deleteAction={deleteEquipment}/>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col">
                    <div className="w-full pb-2 border-b border-slate-300 justify-start items-center gap-2.5 inline-flex">
                        <div className="w-full gap-2 flex flex-row justify-start items-baseline">
                            <span className="text-black text-[24px] font-normal">Sous Systèmes</span>
                            <span className="w-8 h-8 p-5 bg-sky-500 rounded-[100px] justify-center items-center inline-flex text-white text-base font-semibold">{equipmentDetail.sousSystem.length}</span>
                        </div>
                        <AddBtn width={550} placeholder="Nouveau Sous Système" addFunction={openAddModal}/>
                    </div>

                    <div className="inline-flex gap-4 py-2 justify-start items-start flex-wrap overflow-auto">
                        {
                            equipmentDetail.sousSystem.map((system, index) => {
                                return <SubsysPieceCard
                                    key={index}
                                    sysPieceInfo = {system}
                                    routeToDetails = {() => routeToDetails(index)}
                                />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}