"use client"

import InputSearchField from '../../../../components/UIElements/FormElments/InputSearchField'
import EquipmentCard from '../../../../components/UIElements/EquipmentCard'
import AddBtn from '../../../../components/UIElements/AddBtn'
import { useState } from "react";

export default function Equipments () {
    const apiEquipmentList: {
        nom: String,
        code: String,
        sousSystem: Number,
        image: String
    }[] = [
        {
            nom: "Nom Equipement1",
            code: "5G4D5F1D",
            sousSystem: 10,
            image: "/assets/img/index-generator.png"
        },
        {
            nom: "Nom Equipement2",
            code: "5G4D5F1D",
            sousSystem: 10,
            image: "/assets/img/index-generator.png"
        },
        {
            nom: "Nom Equipement3",
            code: "5G4D5F1D",
            sousSystem: 10,
            image: "/assets/img/index-generator.png"
        }
    ]

    const [ displayEquipList, setDisplayEquipList ] = useState(apiEquipmentList)

    const updateEquipList = (value: string) => {
        if(value !== ""){
            setDisplayEquipList(apiEquipmentList.filter((equip)=>{
                return equip.nom.toLowerCase().trim().includes(value.toLowerCase().trim())
            }))
        }
        else{
            setDisplayEquipList(apiEquipmentList)
        }
    }

    const openAddModal = () => {
        console.log("Open modal")
    }
    return(
        <div className="w-full bg-white rounded-2xl shadow backdrop-blur-[20px] p-2 flex-col justify-start items-center gap-2 inline-flex">
            <div className="w-full justify-start items-center gap-4 inline-flex">
                <span className="text-zinc-800 text-2xl font-semibold uppercase leading-[52.11px]">Catalogue d’équipements</span>
                <span className="w-10 h-10 p-5 bg-sky-500 rounded-[100px] justify-center items-center inline-flex text-white text-base font-semibold">{displayEquipList.length}</span>
            </div>

            <div className="w-full h-full p-2 bg-white rounded-2xl border border-slate-300 flex-col justify-start items-center gap-2.5 inline-flex">
                <div className="w-full justify-between items-center gap-4 inline-flex">
                    <InputSearchField setNewSearchValue={updateEquipList} placeholder="Rechercher un équipement"/>
                    <AddBtn placeholder="Nouveau" addFunction={openAddModal}/>
                </div>

                <div className="w-full h-full p-2 bg-white justify-start items-start overflow-auto">
                    <div className="w-full gap-4 flex flex-wrap">
                        {
                            displayEquipList.map((equipement, index)=> {
                                return <EquipmentCard
                                            key={index}
                                            equipmentInfo = {equipement}
                                        />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}