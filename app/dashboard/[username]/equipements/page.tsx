"use client"

import InputSearchField from '@/components/UIElements/FormElments/InputSearchField'
import EquipmentCard from '@/components/UIElements/EquipmentCard'
import AddBtn from '@/components/UIElements/AddBtn'
import Modal from '@/components/UIElements/Modal'

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
    const [ isModalVisible, setModalVisibility ] = useState<boolean>(false)
    const [ isDeleteModalVisible, setDeleteModalVisibility ] = useState<boolean>(false)
    const [ selectedEquipment, setSelectedEquipment ] = useState<String>("Default Name")


    const sortEquipList = (value: string) => {
        if(value !== ""){
            setDisplayEquipList(apiEquipmentList.filter((equip)=>{
                return equip.nom.toLowerCase().trim().includes(value.toLowerCase().trim())
            }))
        }
        else{
            setDisplayEquipList(apiEquipmentList)
        }
    }

    const closeModal = () => {
        setModalVisibility(false)
        setDeleteModalVisibility(false)
    }

    const openDeleteModal = (index: number) => {
        setModalVisibility(true)
        setDeleteModalVisibility(true)
        setSelectedEquipment(displayEquipList[index].nom)
    }

    const deleteEquipment = () => {
        setDeleteModalVisibility(false)
        setModalVisibility(false)
    }
    return(
        <div className="w-full h-full bg-white rounded-2xl shadow backdrop-blur-[20px] p-2 flex-col justify-start items-center gap-2 flex">
            <div className="w-full justify-start items-center gap-4 inline-flex">
                <span className="text-zinc-800 text-2xl font-semibold uppercase leading-[52.11px]">Catalogue d’équipements</span>
                <span className="w-10 h-10 p-5 bg-sky-500 rounded-[100px] justify-center items-center inline-flex text-white text-base font-semibold">{displayEquipList.length}</span>
            </div>

            <div className="w-full h-full p-2 bg-white rounded-2xl border border-slate-300 flex-col justify-start items-center gap-2.5 inline-flex">
                <div className="w-full justify-between items-center gap-4 inline-flex">
                    <InputSearchField setNewSearchValue={sortEquipList} placeholder="Rechercher un équipement"/>
                    <AddBtn placeholder="Nouveau" addFunction={()=>{setModalVisibility(true)}}/>
                </div>

                <div className="w-full h-full p-2 bg-white justify-start items-start overflow-auto">
                    <div className="w-full gap-4 flex flex-wrap">
                        {
                            displayEquipList.map((equipement, index)=> {
                                return <EquipmentCard
                                    key={index}
                                    equipmentInfo = {equipement}
                                    deleteEquip = {()=>openDeleteModal(index)}
                                />
                            })
                        }
                    </div>
                </div>
            </div>

            {/* Delete Equipment Modal */}
            <Modal 
                modalTitle="Supprimer l'équipement"
                isVisible={isModalVisible}
                isDeleteModalVisible = {isDeleteModalVisible}
                deleteText = {<span>Vous êtes sur le point de supprimer l’équipement <span className='font-bold'>{selectedEquipment}</span> et tout les sous systèmes associés à cette équipement. Voulez-vous poursuivre ?</span>}
                modalWidth = {550}
                closeModalAction = {closeModal}
                deleteAction = {deleteEquipment}
            >
            </Modal>
        </div>
    )
}