"use client"

import InputSearchField from '@/components/UIElements/FormElments/InputSearchField'
import EquipmentCard from '@/components/UIElements/EquipmentCard'
import InputField from '@/components/UIElements/FormElments/InputField'
import TextAreaField from '@/components/UIElements/FormElments/TextAreaField'
import AddBtn from '@/components/UIElements/AddBtn'
import Modal from '@/components/UIElements/Modal'
import Image from 'next/image'
import { BsUpload } from "react-icons/bs";

import { useState, useEffect } from "react";
import EquipmentType from '@/types/equipment'
import { tempEquipList } from '@/data/equipmentPage'
import upload from '@/helpers/upload'

// import IFile from '@/types/ImageFile'

interface tempEquipmentType {
    id: number;
    nom: string,
    code: string,
    sousSystem: number,
    image: string | ArrayBuffer | undefined
}

export default function Equipments () {

    const [ apiEquipList, setApiEquipList ] = useState<Array<tempEquipmentType>>(tempEquipList)
    const [ displayEquipList, setDisplayEquipList ] = useState<Array<tempEquipmentType>>(apiEquipList)

    const [ isModalVisible, setModalVisibility ] = useState<boolean>(false)
    const [ isDeleteModalVisible, setDeleteModalVisibility ] = useState<boolean>(false)
    const [ selectedEquipment, setSelectedEquipment ] = useState<number>(0)
    
    const [ equipImage, setEquipImage ] = useState<string | ArrayBuffer | undefined>()
    const [ previewImage, setPreviewImage ] = useState<string>("");

    const [ code, setCode ] = useState<string>("")
    const [ nom, setNom ] = useState<string>("")
    const [ marque, setMarque ] = useState<string>("")
    const [ modele, setModele ] = useState<string>("")
    const [ numSerie, setNumSerie ] = useState<string>("")
    const [ localisation, setLocalisation ] = useState<string>("")
    const [ etat, setEtat ] = useState<string>("")
    const [ description, setDescription ] = useState<string>("")
    const [file, setFile] = useState<File | null>(null);

    const [ newEquip, setNewEquip ] = useState<EquipmentType | undefined>()
    const [ isFormValid, setFormValidity ] = useState<boolean>(false)
    
    const initialiseParams = () => {
        setCode("")
        setNom("")
        setMarque("")
        setModele("")
        setNumSerie("")
        setLocalisation("")
        setEtat("")
        setDescription("")
        setPreviewImage("")
        setEquipImage("")
        setFormValidity(false)
    }
    
    const addImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files as FileList;
        const data = new FileReader()
        data.addEventListener("load", () =>{
            setEquipImage(data.result? data.result: undefined)
        })
        data.readAsDataURL(selectedFiles?.[0])
        setFile(selectedFiles?.[0])
        setPreviewImage(URL.createObjectURL(selectedFiles?.[0]));
    }
    
    const closeModal = () => {
        setModalVisibility(false)
        setDeleteModalVisibility(false)
        setSelectedEquipment(0)
        initialiseParams()
    }

    const openDeleteModal = (index: number) => {
        setModalVisibility(true)
        setDeleteModalVisibility(true)
        setSelectedEquipment(index)
    }

    const deleteEquipment = async (index: number) => {
        const response = await fetch('/api/equipements/supprimer/'+index, {
            method: 'DELETE',
            body: JSON.stringify({})
        });
        const json = await response.json()
        const { message } = json
        if (!message) return;

        let tempApiEquipList = [...apiEquipList]
        tempApiEquipList.splice(selectedEquipment,1)
        setApiEquipList(tempApiEquipList)
        closeModal()
    }

    const sortEquipList = (value: string) => {
        if(value !== ""){
            let tempDisplayEquip = [...apiEquipList]
            tempDisplayEquip = apiEquipList.filter((equip)=>{
                return equip.nom.toLowerCase().trim().includes(value.toLowerCase().trim())
            })
            if(tempDisplayEquip.length > 0) {
                setDisplayEquipList(tempDisplayEquip)
            }
        }
        else{
            setDisplayEquipList(apiEquipList)
        }
    }
    
    const [ equipComponentList, setEquipComponentList ] = useState<Array<React.JSX.Element>>(displayEquipList.map((equipement, index)=> {
        return <EquipmentCard
            key={index}
            equipmentInfo = {equipement}
            deleteEquip = {()=>openDeleteModal(index)}
        />
    }))

    const addNewEquipment = async () => {
        if (!file) return
        if(isFormValid){
            //upload image file file
            let uploadedFilename: string = ''
            try {
                const data = {image: file as File}
                uploadedFilename = await upload(data)
            } catch (error) {
                console.log(error)
            }
            if (!uploadedFilename) return;
            setEquipComponentList([])
            const newEquipment = {
                code: code,
                nom: nom,
                marque_fabricant: marque,
                modele: modele,
                numero_serie: numSerie,
                localistation: localisation,
                etat: etat,
                description: description,
                image: uploadedFilename
            }
            const response = await fetch('/api/equipements/nouveau', {
                method: 'POST',
                body: JSON.stringify(newEquipment)
            });
            const json = await response.json()
            const { equipement } = json
            if (!equipement) return;
            setApiEquipList([...displayEquipList, equipement])
            setNewEquip(equipement)
            closeModal()
        }
    }

    useEffect(() => {
        //recuperer les equipements
        const loadEquipements = async () => {
            const response = await fetch('/api/equipements')
            const json = await response.json()
            const { equipements } = json
            if (!equipements) return;
            setApiEquipList(equipements)
        }
        loadEquipements()
    }, [])
    useEffect(()=> {
        setDisplayEquipList(apiEquipList)
    }, [apiEquipList])

    useEffect(()=> {
        setEquipComponentList(displayEquipList.map((equipement, index)=> {
            return <EquipmentCard
                key={index}
                equipmentInfo = {equipement}
                deleteEquip = {()=>openDeleteModal(index)}
            />
        }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [displayEquipList])

    useEffect(()=>{
        if(code!=="" && nom!=="" && marque!=="" && modele!=="" && numSerie!=="" && localisation!=="" && etat!=="" && description!=="" && previewImage!=="") {
            setFormValidity(true)
        }
    }, [code, nom, marque, modele, numSerie, localisation, etat, description, previewImage])

    return(
        <div className="w-full h-full sticky bg-white rounded-2xl shadow backdrop-blur-[20px] p-2 flex-col justify-start items-center gap-2 flex">
            <div className="w-full justify-start items-center gap-4 inline-flex">
                <span className="text-zinc-800 text-2xl font-semibold uppercase leading-[52.11px]">Catalogue d’équipements</span>
                <span className="w-10 h-10 p-5 bg-sky-500 rounded-[100px] justify-center items-center inline-flex text-white text-base font-semibold">{displayEquipList.length}</span>
            </div>

            <div className="w-full h-full overflow-y-auto p-2 bg-white rounded-2xl border border-slate-300 flex-col justify-start items-center gap-2.5 inline-flex">
                <div className="w-full justify-between items-center gap-4 inline-flex">
                    <InputSearchField setNewSearchValue={sortEquipList} placeholder="Rechercher un équipement" />
                    <AddBtn placeholder="Nouveau" addFunction={()=>{setModalVisibility(true)}}/>
                </div>

                <div className="w-full h-full p-2 bg-white justify-start items-start overflow-auto">
                    <div className="w-full gap-4 flex flex-wrap">
                        {equipComponentList}
                    </div>
                </div>
            </div>

            {/* Delete Equipment Modal */}
            {isDeleteModalVisible? <Modal 
                modalTitle="Supprimer l'équipement"
                isVisible={isModalVisible && isDeleteModalVisible}
                isDeleteModalVisible = {isDeleteModalVisible}
                deleteText = {<span>Vous êtes sur le point de supprimer l’équipement <span className='font-bold'>{displayEquipList[selectedEquipment].nom}</span> et tout les sous systèmes associés à cet équipement. Voulez-vous poursuivre ?</span>}
                modalWidth = {600}
                closeModalAction = {closeModal}
                deleteAction = {() => deleteEquipment(displayEquipList[selectedEquipment].id)}
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
                    addNewAction = {addNewEquipment}
                >
                    <div className="w-full flex flex-row justify-center gap-4">
                        <div className="w-full flex flex-col justify-start gap-4">
                            <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                                Image de l’équipement
                            </span>
                            <div className="w-4/5 relative aspect-square rounded-2xl bg-slate-300 border border-slate-500 border-dotted">
                                <div className='w-full aspect-square rounded-2xl flex flex-col bg-[rgba(0,0,0,0.5)] text-white justify-center items-center absolute'>
                                    <BsUpload size={32}/>
                                    <span className='text-center text-[20px] font-normal leading-normal tracking-wide'>Ajouter l’image</span>
                                </div>
                                <input required className='w-full absolute aspect-square rounded-2xl file:text-transparent file:hover:cursor-pointer file:border-0 file:w-full file:aspect-square file:bg-transparent' type="file" accept="image/*" onChange={addImage} />
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