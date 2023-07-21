"use client"

import InputSearchField from '@/components/UIElements/FormElments/InputSearchField'
import EquipmentCard from '@/components/UIElements/EquipmentCard'
import InputField from '@/components/UIElements/FormElments/InputField'
import TextAreaField from '@/components/UIElements/FormElments/TextAreaField'
import AddBtn from '@/components/UIElements/AddBtn'
import Modal from '@/components/UIElements/Modal'
import Image from 'next/image'
import { BsUpload } from "react-icons/bs";

import { useState } from "react";
import IFile from '@/types/ImageFile'

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
    const [ selectedEquipment, setSelectedEquipment ] = useState<String>("")
    
    const [ equipImage, setEquipImage ] = useState<File>()
    const [ previewImage, setPreviewImage ] = useState<string>("");
    const [ progress, setProgress ] = useState<number>(0);
    const [ message, setMessage ] = useState<string>("");
    const [imageInfos, setImageInfos] = useState<Array<IFile>>([]);

    const [ code, setCode ] = useState<string>("")
    const [ nom, setNom ] = useState<string>("")
    const [ marque, setMarque ] = useState<string>("")
    const [ modele, setModele ] = useState<string>("")
    const [ numSerie, setNumSerie ] = useState<string>("")
    const [ localisation, setLocalisation ] = useState<string>("")
    const [ etat, setEtat ] = useState<string>("")
    const [ description, setDescription ] = useState<string>("")

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
    
    const openDeleteModal = (index: number) => {
        setModalVisibility(true)
        setDeleteModalVisibility(true)
        setSelectedEquipment(displayEquipList[index].nom)
    }

    const addImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files as FileList;
        setEquipImage(selectedFiles?.[0]);
        setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
        setProgress(0);
    }

    const closeModal = () => {
        setModalVisibility(false)
        setDeleteModalVisibility(false)
        setSelectedEquipment("")
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
            {isDeleteModalVisible? <Modal 
                modalTitle="Supprimer l'équipement"
                isVisible={isModalVisible && isDeleteModalVisible}
                isDeleteModalVisible = {isDeleteModalVisible}
                deleteText = {<span>Vous êtes sur le point de supprimer l’équipement <span className='font-bold'>{selectedEquipment}</span> et tout les sous systèmes associés à cette équipement. Voulez-vous poursuivre ?</span>}
                modalWidth = {600}
                closeModalAction = {closeModal}
                deleteAction = {deleteEquipment}
            /> : 
            <>
                {/* Add New Equipment Modal */}
                <Modal 
                    modalTitle="Nouveau équipement"
                    isVisible={isModalVisible}
                    isDeleteModalVisible = {false}
                    modalWidth = {'80%'}
                    closeModalAction = {closeModal}
                    addBtnLabel="Ajouter"
                >
                    <div className="w-full flex flex-row justify-center gap-8">
                        <div className="w-full flex flex-col justify-start gap-4">
                            <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                                Image de l’équipement
                            </span>
                            <div className="w-3/5 relative aspect-square rounded-2xl bg-slate-300 border border-slate-500 border-dotted">
                                <div className='w-full aspect-square rounded-2xl flex flex-col bg-[rgba(0,0,0,0.5)] text-white justify-center items-center absolute'>
                                    <BsUpload size={32}/>
                                    <span className='text-center text-[20px] font-normal leading-normal tracking-wide'>Ajouter l’image</span>
                                </div>
                                <input id='imageInput' required className='w-full absolute aspect-square rounded-2xl file:text-transparent file:hover:cursor-pointer file:border-0 file:w-full file:aspect-square file:bg-transparent' type="file" accept="image/*" onChange={addImage} />
                                {previewImage && (
                                    <Image className="w-full aspect-square rounded-2xl" src={previewImage} alt="Equipment Preview" width={500} height={500}/>
                                )}
                            </div>
                        </div>

                        <div className="w-full flex flex-col justify-start gap-4">
                            <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                                Caractéristiques
                            </span>
                            <InputField label="Code" setNewValue={setCode} />
                            <InputField label="Nom" setNewValue={setNom} />
                            <InputField label="Marque du Fabricant" setNewValue={setMarque} />
                            <InputField label="Modèle" setNewValue={setModele} />
                            <InputField label="Numéro de Série" setNewValue={setNumSerie} />
                            <InputField label="Localisation" setNewValue={setLocalisation} />
                            <InputField label="Etat" setNewValue={setEtat} />
                            <TextAreaField label="Description" setNewValue={setDescription}/>
                        </div>
                    </div>
                </Modal>
            </>}

        </div>
    )
}