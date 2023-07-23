'use client'

import Image from "next/image"
import { useRouter, usePathname } from 'next/navigation'
import DeleteBtn from '@/components/UIElements/DeleteBtn'
import UpdateBtn from '@/components/UIElements/UpdateBtn'
import AddBtn from "@/components/UIElements/AddBtn"
import SubsysPieceCard from '@/components/UIElements/SubsysPieceCard'
import { BsUpload } from "react-icons/bs";

import { useState, useEffect, SetStateAction, Dispatch } from "react";
import Modal from "@/components/UIElements/Modal"
import InputField from "@/components/UIElements/FormElments/InputField"
import TextAreaField from "@/components/UIElements/FormElments/TextAreaField"
import SubSystemType from "@/types/subSystem"
import EquipmentType from "@/types/equipment"
import InputSearchField from "@/components/UIElements/FormElments/InputSearchField"

export default function Equipment ({params}:{params: {username:string,  equipment: string }}) {
    const router = useRouter()
    const pathname = usePathname()
    
    const [ apiSubSysList, setApiSubSysList ] = useState<Array<SubSystemType>>([
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
    ])
    const [ displaySubSysList, setDisplaySubSysList ] = useState<Array<SubSystemType>>(apiSubSysList)
    const [ apiEquipmentDetails, setApiEquipmentDetails ] = useState<EquipmentType>({
        nom: "Nom Equipement1",
        code: "5G4D5F1D",
        marque: "Marque Fabricant",
        numSerie: "5G4D5F1D",
        modele: "Equip5G4D5F1D",
        localisation: "Departement Equip",
        etat: "Fonctionnel",
        description: "Le Meilleur Equipement au monde",
        image: "/assets/img/index-generator.png",
    })

    const [ isDelEquipModal, setDelEquipModalVisibility ] = useState<boolean>(false)
    const [ isUpdateEquipModal, setUpdateEquipModalVisibility ] = useState<boolean>(false)
    const [ isAddSubSysModal, setAddSubSysModalVisibility ] = useState<boolean>(false)
    const [ isDelSubSysModal, setDelSubSysModalVisibility ] = useState<boolean>(false)
    const [ selectedSubSys, setSelectedSubSys ] = useState<number>(0)
    
    // Equipment Information Start
    const [ imageEquip, setImageEquip ] = useState<string | ArrayBuffer | undefined>(apiEquipmentDetails.image)
    const [ previewImageEquip, setPreviewImageEquip ] = useState<string | ArrayBuffer | undefined>(apiEquipmentDetails.image)
    const [ codeEquip, setCodeEquip ] = useState<string>(apiEquipmentDetails.code)
    const [ nomEquip, setNomEquip ] = useState<string>(apiEquipmentDetails.nom)
    const [ marqueEquip, setMarqueEquip ] = useState<string>(apiEquipmentDetails.marque)
    const [ modeleEquip, setModeleEquip ] = useState<string>(apiEquipmentDetails.modele)
    const [ numSerieEquip, setNumSerieEquip ] = useState<string>(apiEquipmentDetails.numSerie)
    const [ localisationEquip, setLocalisationEquip ] = useState<string>(apiEquipmentDetails.localisation)
    const [ etatEquip, setEtatEquip ] = useState<string>(apiEquipmentDetails.etat)
    const [ descriptionEquip, setDescriptionEquip ] = useState<string>(apiEquipmentDetails.description)
    // Equipment Information End

    // Sub System Information Start
    const [ imageSubSys, setImageSubSys ] = useState<string | ArrayBuffer | undefined>()
    const [ previewImageSubSys, setPreviewImageSubSys ] = useState<string | ArrayBuffer | undefined>()
    const [ nomSubSys, setNomSubSys ] = useState<string>("")
    const [ marqueSubSys, setMarqueSubSys ] = useState<string>("")
    const [ modeleSubSys, setModeleSubSys ] = useState<string>("")
    const [ numSerieSubSys, setNumSerieSubSys ] = useState<string>("")
    const [ localisationSubSys, setLocalisationSubSys ] = useState<string>("")
    const [ descriptionSubSys, setDescriptionSubSys ] = useState<string>("")
    const [ newSubSys, setNewSubSys ] = useState<SubSystemType | undefined>()
    // Sub System Information End
    
    const [ isFormValid, setFormValidity ] = useState<boolean>(false)
    const [ isUpdateFormValid, setUpdateFormValidity ] = useState<boolean>(false)
    
    const initialiseParams = () => {
        setImageSubSys("")
        setPreviewImageSubSys("")
        setNomSubSys("")
        setMarqueSubSys("")
        setModeleSubSys("")
        setNumSerieSubSys("")
        setLocalisationSubSys("")
        setDescriptionSubSys("")

        setFormValidity(false)
        setUpdateFormValidity(false)
    }

    const initialiseUpdateParams = () => {
        setImageSubSys(apiEquipmentDetails.image)
        setPreviewImageEquip(apiEquipmentDetails.image)
        setNomEquip(apiEquipmentDetails.nom)
        setMarqueEquip(apiEquipmentDetails.marque)
        setModeleEquip(apiEquipmentDetails.modele)
        setNumSerieEquip(apiEquipmentDetails.numSerie)
        setLocalisationEquip(apiEquipmentDetails.localisation)
        setEtatEquip(apiEquipmentDetails.etat)
        setDescriptionEquip(apiEquipmentDetails.description)
    }

    const closeModal = () => {
        setDelEquipModalVisibility(false)
        setUpdateEquipModalVisibility(false)

        setAddSubSysModalVisibility(false)
        setDelSubSysModalVisibility(false)

        setSelectedSubSys(0)
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

    const deleteEquipment = () => {
        console.log("Deleting Equipment From the Database through API calls")
        closeModal()
        router.push(`/dashboard/${params.username}/equipements`)
    }

    const updateEquipment = () => {
        let tempEquipName = apiEquipmentDetails.nom
        if(isUpdateFormValid){
            const tempEquip = {
                nom: nomEquip,
                code: codeEquip,
                marque: marqueEquip,
                numSerie: numSerieEquip,
                modele: modeleEquip,
                localisation: localisationEquip,
                etat: etatEquip,
                description: descriptionEquip,
                image: imageEquip? imageEquip : ""
            }
            setApiEquipmentDetails(tempEquip)
            if(tempEquipName !== apiEquipmentDetails.nom){
                router.push(`/dashboard/${params.username}/equipements/${apiEquipmentDetails.nom.replace(' ','-')}`)
            }
            closeModal()
        }
        
    }

    // const addImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const selectedFiles = event.target.files as FileList;
    //     const data = new FileReader()
    //     data.addEventListener("load", () =>{
    //         setImageSubSys(data.result? data.result: undefined)
    //     })
    //     data.readAsDataURL(selectedFiles?.[0])
    //     setPreviewImageSubSys(URL.createObjectURL(selectedFiles?.[0]));
    // }

    const deleteSubSys = () => {
        let tempApiSubSysList = [...apiSubSysList]
        tempApiSubSysList.splice(selectedSubSys,1)
        setApiSubSysList(tempApiSubSysList)
        closeModal()
    }

    const sortSubSysList = (value: string) => {
        if(value !== ""){
            let tempList = [...apiSubSysList]
            tempList = apiSubSysList.filter((subsys)=>{
                return subsys.nom.toLowerCase().trim().includes(value.toLowerCase().trim())
            })
            if(tempList.length > 0) {
                setDisplaySubSysList(tempList)
            }
        }
        else{
            setDisplaySubSysList(apiSubSysList)
        }
    }

    const addNewSubSys = () => {
        if(isFormValid){
            const tempNewSubSys = {
                nom: nomSubSys,
                marque: marqueSubSys,
                numSerie: numSerieSubSys,
                modele: modeleSubSys,
                localisation: localisationSubSys,
                description: descriptionSubSys,
                image: imageSubSys? imageSubSys : ""
            }
            setApiSubSysList([...displaySubSysList, tempNewSubSys])
            setNewSubSys(tempNewSubSys)
            closeModal()
        }
    }

    const routeToDetails = (index:number) => {
        const subSys = displaySubSysList[index]
        router.push(`${pathname}/${subSys.nom.replace(" ", "-")}`)
    }

    useEffect(()=>{
        if(codeEquip!=="" && nomEquip!=="" && marqueEquip!=="" && modeleEquip!=="" && numSerieEquip!=="" && localisationEquip!=="" && etatEquip!=="" && descriptionEquip!=="" && previewImageEquip!=="") {
            setUpdateFormValidity(true)
        }
    }, [codeEquip, nomEquip, marqueEquip, modeleEquip, numSerieEquip, localisationEquip, etatEquip, descriptionEquip, previewImageEquip])

    useEffect(()=>{
        if(nomSubSys!=="" && marqueSubSys!=="" && modeleSubSys!=="" && numSerieSubSys!=="" && localisationSubSys!=="" && descriptionSubSys!=="" && previewImageSubSys!=="") {
            setFormValidity(true)
        }
    }, [nomSubSys, marqueSubSys, modeleSubSys, numSerieSubSys, localisationSubSys, descriptionSubSys, previewImageSubSys])

    return(
        <div className="w-full h-full sticky bg-white rounded-2xl shadow backdrop-blur-[20px] p-2 flex-col justify-start items-center gap-2 flex">
            <div className="w-full  justify-start items-center inline-flex">
                <span className="text-zinc-800 text-2xl font-semibold uppercase leading-[52.11px]">Catalogue d’équipements</span>
            </div>
            <div className="w-full h-full overflow-y-auto p-2 bg-white rounded-2xl border border-slate-300 flex-col justify-start items-center gap-2.5 inline-flex">
                <div className="w-full flex-row justify-start items-start gap-2 inline-flex">
                    <div className='w-full aspect-square bg-[#D0E5F0] rounded-[16px] flex justify-center items-center'>
                        <Image className="w-4/5 aspect-square" width="500" height="500" src={`${apiEquipmentDetails.image}`} alt={params.equipment.replace("-", " ")}/>
                    </div>
                    <div className="w-full px-4 flex-col justify-start items-start gap-2 inline-flex">
                        <div className="flex-col justify-start items-start inline-flex">
                            <span className="text-black text-[26px] font-semibold uppercase">{params.equipment.replace("-"," ")}</span>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Code: </span>
                                <span className="text-black text-[20px] font-semibold">{apiEquipmentDetails.code}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Marque du Fabricant: </span>
                                <span className="text-black text-[20px] font-semibold">{apiEquipmentDetails.marque}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Numéro de Série: </span>
                                <span className="text-black text-[20px] font-semibold">{apiEquipmentDetails.numSerie}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Modèle: </span>
                                <span className="text-black text-[20px] font-semibold">{apiEquipmentDetails.modele}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Localisation: </span>
                                <span className="text-black text-[20px] font-semibold">{apiEquipmentDetails.localisation}</span>
                            </div>
                            <div className="justify-start items-center gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Etat: </span>
                                <span className="text-[20px] text-[#149FDA] font-semibold">{apiEquipmentDetails.etat}</span>
                            </div>
                            <div className="justify-start items-baseline gap-[4px] inline-flex">
                                <span className="text-black text-[18px] font-normal leading-loose">Description: </span>
                                <span className="text-black text-[20px] font-semibold">{apiEquipmentDetails.description}</span>
                            </div>
                        </div>
                        <div className="w-full flex flex-row gap-3 justify-start items-start">
                            <DeleteBtn deleteAction={()=>{setDelEquipModalVisibility(true)}}/>
                            <UpdateBtn updateAction={()=>{setUpdateEquipModalVisibility(true)
                                                            initialiseUpdateParams()}}/>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col">
                    <div className="w-full pb-2 border-b border-slate-300 justify-start items-center gap-2.5 inline-flex">
                        <div className="w-[300px] gap-2 flex flex-row justify-start items-baseline">
                            <span className="text-black text-[24px] font-normal">Sous Systèmes</span>
                            <span className="w-8 h-8 p-5 bg-sky-500 rounded-[100px] justify-center items-center inline-flex text-white text-base font-semibold">{apiSubSysList.length}</span>
                        </div>
                        <div className="w-full justify-between items-center gap-4 inline-flex">
                            <InputSearchField setNewSearchValue={sortSubSysList} placeholder="Rechercher un sous système" />
                            <AddBtn width={550} placeholder="Nouveau Sous Système" addFunction={()=>{setAddSubSysModalVisibility(true)}}/>
                        </div>
                    </div>

                    <div className="inline-flex h-full gap-4 py-2 justify-start items-start flex-wrap overflow-y-auto">
                        {
                            displaySubSysList.map((system, index) => {
                                return <SubsysPieceCard
                                    key={index}
                                    sysPieceInfo = {system}
                                    routeToDetails = {() => routeToDetails(index)}
                                    deleteAction = {() => {setSelectedSubSys(index)
                                                            setDelSubSysModalVisibility(true)}}
                                />
                            })
                        }
                    </div>
                </div>
            </div>

            {/* Delete Equipment Modal */}
            <Modal 
                modalTitle="Supprimer l'équipement"
                isVisible={isDelEquipModal}
                isDeleteModalVisible = {isDelEquipModal}
                deleteText = {<span>Vous êtes sur le point de supprimer l’équipement <span className='font-bold'>{apiEquipmentDetails.nom}</span> et tout les sous systèmes associés à cette équipement. Voulez-vous poursuivre ?</span>}
                modalWidth = {600}
                closeModalAction = {closeModal}
                deleteAction = {deleteEquipment}
            />

            {/* Update Equipment Modal */}
            <Modal
                modalTitle="Modifier l'équipement"
                isVisible={isUpdateEquipModal}
                isDeleteModalVisible = {false}
                modalWidth = {'80%'}
                closeModalAction = {closeModal}
                addBtnLabel="Modifier"
                addNewAction = {updateEquipment}
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
                            <input onChange={(e)=>{addImage(e,setImageEquip, setPreviewImageEquip)}} className='w-full absolute aspect-square rounded-2xl file:text-transparent file:hover:cursor-pointer file:border-0 file:w-full file:aspect-square file:bg-transparent' type="file" accept="image/*" />
                            <Image className="w-full aspect-square rounded-2xl" src={`${previewImageEquip}`} alt="Equipment Preview" width={500} height={500}/>
                        </div>
                    </div>

                    <div className="w-full flex flex-col justify-start gap-4">
                        <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                            Caractéristiques
                        </span>
                        <InputField label="Code" defaultValue={apiEquipmentDetails.code} setNewValue={setCodeEquip} />
                        <InputField label="Nom" defaultValue={apiEquipmentDetails.nom} setNewValue={setNomEquip} />
                        <InputField label="Marque du Fabricant" defaultValue={apiEquipmentDetails.marque} setNewValue={setMarqueEquip} />
                        <InputField label="Modèle" defaultValue={apiEquipmentDetails.modele} setNewValue={setModeleEquip} />
                        <InputField label="Numéro de Série" defaultValue={apiEquipmentDetails.numSerie} setNewValue={setNumSerieEquip} />
                        <InputField label="Localisation" defaultValue={apiEquipmentDetails.localisation} setNewValue={setLocalisationEquip} />
                        <InputField label="Etat" defaultValue={apiEquipmentDetails.etat} setNewValue={setEtatEquip} />
                        <TextAreaField label="Description" defaultValue={apiEquipmentDetails.description} setNewValue={setDescriptionEquip}/>
                    </div>
                </div>
            </Modal>

            {/* Delete Sub System Modal */}
            <Modal
                modalTitle="Supprimer le sous Système"
                isVisible={isDelSubSysModal}
                isDeleteModalVisible = {isDelSubSysModal}
                deleteText = {<span>Vous êtes sur le point de supprimer le sous système <span className='font-bold'>{displaySubSysList[selectedSubSys].nom}</span> de <span className='font-bold'>{apiEquipmentDetails.nom}</span> et toutes les pièces de rechange et les pannes associés à ce sous système. Voulez-vous poursuivre ?</span>}
                modalWidth = {600}
                closeModalAction = {closeModal}
                deleteAction = {deleteSubSys}
            />
            
            {/* Add New Sous System Modal */}
            <Modal 
                modalTitle="Nouveau Sous Système"
                isVisible={isAddSubSysModal}
                isDeleteModalVisible = {false}
                modalWidth = {'80%'}
                closeModalAction = {closeModal}
                addBtnLabel="Ajouter"
                addNewAction = {addNewSubSys}
            >
                <div className="w-full flex flex-row justify-center gap-4">
                    <div className="w-full flex flex-col justify-start gap-4">
                        <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                            Image du sous Système
                        </span>
                        <div className="w-4/5 relative aspect-square rounded-2xl bg-slate-300 border border-slate-500 border-dotted">
                            <div className='w-full aspect-square rounded-2xl flex flex-col bg-[rgba(0,0,0,0.5)] text-white justify-center items-center absolute'>
                                <BsUpload size={32}/>
                                <span className='text-center text-[20px] font-normal leading-normal tracking-wide'>Ajouter l’image</span>
                            </div>
                            <input onChange={(e)=>{addImage(e,setImageSubSys, setPreviewImageSubSys)}} required className='w-full absolute aspect-square rounded-2xl file:text-transparent file:hover:cursor-pointer file:border-0 file:w-full file:aspect-square file:bg-transparent' type="file" accept="image/*" />
                            {previewImageSubSys && (
                                <Image className="w-full aspect-square rounded-2xl" src={`${previewImageSubSys}`} alt="Sub System Preview" width={500} height={500}/>
                            )}
                        </div>
                    </div>

                    <div className="w-full flex flex-col justify-start gap-4">
                        <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                            Caractéristiques
                        </span>
                        <InputField label="Nom" setNewValue={setNomSubSys} />
                        <InputField label="Marque du Fabricant" setNewValue={setMarqueSubSys} />
                        <InputField label="Modèle" setNewValue={setModeleSubSys} />
                        <InputField label="Numéro de Série" setNewValue={setNumSerieSubSys} />
                        <InputField label="Localisation" setNewValue={setLocalisationSubSys} />
                        <TextAreaField label="Description" setNewValue={setDescriptionSubSys} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}