'use client'

import AddBtn from "@/components/UIElements/AddBtn"
import InterventionState from "@/components/UIElements/InterventionState"
import InterventionActionBtn from "@/components/UIElements/InterventionActionBtn"
import InputSearchField from "@/components/UIElements/FormElments/InputSearchField"
import InputField from "@/components/UIElements/FormElments/InputField"
import DateInputField from '@/components/UIElements/FormElments/DateInputField'
import DropDownField from "@/components/UIElements/FormElments/DropDownField"
import TextAreaField from "@/components/UIElements/FormElments/TextAreaField"
import Modal from "@/components/UIElements/Modal"

import InterventionType from '@/types/intervention'
import {
    apiInterventions,
    apiEquipmentList,
    apiSubSystemList,
    apiPanneList,
    apiUserList
} from '@/data/interventionData'

import { useAppDispatch } from "@/redux/hooks"
import { addAlert } from "@/redux/features/alerts/alertsSlice"
import { DISPLAYTIMEOUT } from "@/constants/time"

import {translateDateTime} from "@/helpers/hooks"


import { useState, useEffect } from "react"

export default function Interventions ({params}:{params: {username:string}}) {
    const username = decodeURI(params.username)
    const dispatch = useAppDispatch()
    const actualDate = `${new Date().getFullYear()}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + new Date().getDate()).slice(-2)}`

    const [ apiInterventionList, setApiInterventionList ] = useState<Array<InterventionType>>(apiInterventions)
    const [ displayIntervenList, setDisplayIntervenList] = useState<Array<InterventionType>>(apiInterventionList)

    // APi Equipment, Sub system, Panne and User List Start
    const [ apiEquipNameList, setApiEquipNameList ] = useState<Array<string>>(apiEquipmentList)
    const [ apiSubSysNameList, setApiSubNameSysList ] = useState<Array<string>>(apiSubSystemList)
    const [ apiPanneNameList, setApiPanneNameList ] = useState<Array<string>>(apiPanneList)
    const [ apiUserNamesList, setApiUserNamesList ] = useState<Array<string>>(apiUserList)
    // APi Equipment, Sub system, Panne and User List End

    const [ isAddModal, setAddModalVisibility ] = useState<boolean>(false)
    const [ isDetailModal, setDetailModalVisibility ] = useState<boolean>(false)
    const [ isValidateModal, setValidateModalVisibility ] = useState<boolean>(false)
    const [ isReportModal, setReportModalVisibility ] = useState<boolean>(false)
    const [ toogleExecutantType, executantTypeToogler ] = useState<boolean>(false)
    
    // Intervention Information start
    const [ panne, setPanne ] = useState<string>("")
    const [ subSys, setSubSys ] = useState<string>("")
    const [ equip, setEquip ] = useState<string>("")
    const [ etatInitial, setEtatInitial ] = useState<string>("")
    const [ demanderPar, setDemanderPar ] = useState<string>("")

    const [ executant, setExecutant ] = useState<string>("")
    const [ startDate, setStartDate ] = useState<string>("")
    const [ endDate, setEndDate ] = useState<string>("")
    
    const [ etatFinal, setEtatFinal ] = useState<string>("")
    const [ observation, setObservation ] = useState<string>("")
    // Intervention Information End

    const [ selectedInterven, setSelectedInterven ] = useState<number>(0)
    const [ isFormValid, setFormValidity ] = useState<boolean>(false)
    const [ isApproveFormValid, setApproveFormValidity ] = useState<boolean>(false)
    const [ isReportFormValid, setReportFormValidity ] = useState<boolean>(false)

    const initialiseParams = () => {
        setPanne("")
        setSubSys("")
        setEquip("")
        setEtatInitial("")
        setDemanderPar("")
        setFormValidity(false)

        setExecutant("")
        setStartDate("")
        setEndDate("")
        setApproveFormValidity(false)

        setEtatFinal("")
        setObservation("")
        setReportFormValidity(false)
    }

    const closeModal = () => {
        setAddModalVisibility(false)
        setDetailModalVisibility(false)
        setValidateModalVisibility(false)
        setReportModalVisibility(false)

        setSelectedInterven(0)
        initialiseParams()
    }

    const sortInterventionList = (value: string) => {
        if(value !== ""){
            let tempList = [...apiInterventionList]
            tempList = apiInterventionList.filter((intervention)=>{
                return ((intervention.panne.toLowerCase().trim().includes(value.toLowerCase().trim())) ||
                        (intervention.sousSysteme.toLowerCase().trim().includes(value.toLowerCase().trim())) ||
                        (intervention.equipement.toLowerCase().trim().includes(value.toLowerCase().trim())) ||
                        (intervention.etatEquipementInitial.toLowerCase().trim().includes(value.toLowerCase().trim())) ||
                        (intervention.demanderPar.toLowerCase().trim().includes(value.toLowerCase().trim())) ||
                        (intervention.executant?.toLowerCase().trim().includes(value.toLowerCase().trim())) ||
                        (intervention.etat.toLowerCase().trim().includes(value.toLowerCase().trim())) ||
                        (intervention.etatEquipementFinal?.toLowerCase().trim().includes(value.toLowerCase().trim())) )
                        
            })
            if(tempList.length > 0) {
                setDisplayIntervenList(tempList)
            }
        }
        else{
            setDisplayIntervenList(apiInterventionList)
        }
    }

    const demandIntervention = () => {
        if(isFormValid){
            const tempIntervention = {
                panne: panne,
                sousSysteme: subSys,
                equipement: equip,
                etatEquipementInitial: etatInitial,
                demanderPar: demanderPar,
                etat: "En Attente"
            }
            setApiInterventionList([...apiInterventionList,tempIntervention])
            closeModal()
        }
    }

    const validateIntervention = () => {
        if(isApproveFormValid){
            let tempList = [...apiInterventionList]
            tempList[selectedInterven]["executant"] = executant
            tempList[selectedInterven]["debutIntervention"] = startDate
            tempList[selectedInterven]["finIntervention"] = endDate
            tempList[selectedInterven]["etat"] = "Validé"
            setApiInterventionList(tempList)
            closeModal()
        }
    }

    const reportIntervention = () => {
        if(isReportFormValid){
            let tempList = [...apiInterventionList]
            tempList[selectedInterven]["etatEquipementFinal"] = etatFinal
            tempList[selectedInterven]["observation"] = observation
            tempList[selectedInterven]["etat"] = "Rapport"
            setApiInterventionList(tempList)
            closeModal()
        }
    }

    useEffect(()=>{
        setDisplayIntervenList(apiInterventionList)
    },[apiInterventionList])

    useEffect(()=>{
        if(etatFinal!=="" && observation !== ""){
            setReportFormValidity(true)
        }
    },[etatFinal, observation])

    useEffect(()=>{
        if(executant!=="" && startDate!=="" &&
            endDate!== ""){
                setApproveFormValidity(true)
        }
    },[executant,startDate,endDate])

    useEffect(()=>{
        if(panne!=="" && subSys!=="" &&
        equip!=="" && etatInitial!=="" &&
        demanderPar!==""){
            setFormValidity(true)
        }
    },[panne,subSys,equip,etatInitial,demanderPar])

    useEffect(()=>{
        const loadInterventions = async() => {
            try {
                const response = await fetch('/api/equipements/sous-systeme/panne/intervention')
                const json = await response.json()
                const { interventions } = json
                if(!interventions){
                    setTimeout(() => {
                        dispatch(addAlert({type: 'FAILURE', message: json.error}))
                    }, DISPLAYTIMEOUT)
                    return
                }

                // setApiInterventionList(tempIntervenList)
                setTimeout(() => {
                    dispatch(addAlert({type: 'SUCCESS', message: 'Interventions chargées avec Succès'}))
                }, DISPLAYTIMEOUT)
            } catch (error: any) {
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: "Erreur de Chargement des Interventions"}))
                }, DISPLAYTIMEOUT)
                return
            }
        }
        // loadInterventions()
    },[dispatch])

    return(
        <div className="w-full h-full overflow-y-auto bg-white rounded-2xl shadow backdrop-blur-[20px] p-2 flex-col justify-start items-center gap-2 flex">
            <div className="w-full justify-start items-center gap-4 inline-flex">
                <span className="text-zinc-800 text-2xl font-semibold uppercase leading-[52.11px]">Interventions</span>
                <span className="w-10 h-10 p-5 bg-sky-500 rounded-[100px] justify-center items-center inline-flex text-white text-base font-semibold">{apiInterventionList.length}</span>
            </div>

            <div className="w-full h-full p-2 bg-white rounded-2xl border border-slate-300 flex-col justify-start items-center gap-2.5 inline-flex">
                <div className="w-full justify-between items-center gap-4 inline-flex">
                    <InputSearchField setNewSearchValue={sortInterventionList} placeholder="Rechercher une intervention: tout critère"/>
                    <AddBtn width={700} placeholder="Demander une Intervention" addFunction={()=>{setAddModalVisibility(true)}}/>
                </div>

                {/* Liste des interventions ci-dessous */}
                <div className="w-full h-full flex flex-col gap-4 justify-start items-start flex-wrap">
                    <table className="w-full h-full p-2 rounded-2xl border border-slate-400 flex-col justify-start items-start flex overflow-x-auto">
                        <thead className="w-full bg-white border-b border-slate-400">
                            <tr className="w-full p-2 flex gap-1 text-black text-lg font-bold leading-7 tracking-tight">
                                <td className="w-[150px]">N°</td>
                                <td className="w-full">Panne</td>
                                <td className="w-full text-center">Demandé par</td>
                                <td className="w-full capitalize text-center">état de l’équipement</td>
                                <td className="w-full capitalize text-center">état</td>
                                <td className="w-full text-center">Action</td>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                        {
                            displayIntervenList.map((intervention, index) => {
                                return <tr key={index} className="w-full p-2 flex gap-1 text-black text-lg font-medium leading-7 tracking-tight odd:bg-white even:bg-indigo-50">
                                    <td className="w-[150px]">{index+1}</td>
                                    <td className="w-full">{intervention.panne}</td>
                                    <td className="w-full text-center">{intervention.demanderPar}</td>
                                    <td className="w-full capitalize text-center">{intervention.etatEquipementInitial}</td>
                                    <td className="w-full flex justify-center items-center text-center"><InterventionState state={intervention.etat}/></td>
                                    <td className="w-full flex gap-1 justify-end items-start flex-wrap">
                                        <InterventionActionBtn
                                            state={intervention.etat}
                                            viewIntervention={()=>{setSelectedInterven(index)
                                                                    setDetailModalVisibility(true)}}
                                            validateIntervention={()=>{setSelectedInterven(index)
                                                                        setValidateModalVisibility(true)}}
                                            reportIntervention={()=>{setSelectedInterven(index)
                                                                        setReportModalVisibility(true)}}
                                        />
                                    </td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Intervention Detail Modal */}
            <Modal
                modalTitle="Supprimer l'utilisateur"
                isVisible={isDetailModal}
                isDeleteModalVisible = {false}
                isDetailIntervention={isDetailModal}
                index= {selectedInterven+1}
                interventionInfo = {apiInterventionList[selectedInterven]}
                validateIntervention = {()=>{setDetailModalVisibility(false)
                                                setValidateModalVisibility(true)}}
                reportIntervention = {()=>{setDetailModalVisibility(false)
                                        setReportModalVisibility(true)}}
                username = {username}
                modalWidth = {650}
                closeModalAction = {closeModal}
            />

            {/* Add Intervention Modal */}
            <Modal
                modalTitle="Demande d'Intervention"
                isVisible={isAddModal}
                isDeleteModalVisible = {false}
                modalWidth = {'80%'}
                closeModalAction = {closeModal}
                addBtnLabel="Envoyer"
                addNewAction = {demandIntervention}
            >
                <div className="w-full flex flex-row justify-center gap-4">
                    <div className="w-full flex flex-col justify-start gap-4">
                        <span className="border-b border-slate-300 capitalize justify-center items-center text-black text-[20px] font-normal">
                            équipement
                        </span>
                        <DropDownField label="" optionList={apiEquipNameList.map((name,index)=>{ return name+(index+1)})} placeholder="Selectionner l'équipement" setNewValue={setEquip} />
                        <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                            Sous Système
                        </span>
                        <DropDownField label="" optionList={apiSubSysNameList.map((name,index)=>{ return name+(index+1)})} placeholder='Selectionner le sous Système' setNewValue={setSubSys} />
                        <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                            Panne
                        </span>
                        <DropDownField label="" optionList={apiPanneNameList.map((name,index)=>{ return name+(index+1)})} placeholder='Selectionner la panne à intervenir' setNewValue={setPanne} />
                    </div>
                    <div className="w-full flex flex-col justify-start gap-4">
                        <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                            Détails sur la demande
                        </span>
                        <InputField label="Demandé Par" defaultValue={username} setNewValue={setDemanderPar} />
                        <TextAreaField label="Description de l'état actuel de l'équipement" setNewValue={setEtatInitial} />
                    </div>
                </div>
            </Modal>

            {/* Validate Intervention Modal */}
            <Modal
                modalTitle="Valider L’intervention"
                isVisible={isValidateModal}
                isDeleteModalVisible = {false}
                modalWidth = {'80%'}
                closeModalAction = {closeModal}
                addBtnLabel="Valider"
                addNewAction = {validateIntervention}
            >
                <div className="w-full flex flex-row justify-center gap-4">
                    <div className="w-full flex-col justify-start items-start inline-flex">
                        <span className="w-full border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                            Information sur la demande {"d'intervention"}
                        </span>
                        <div className="justify-start items-center gap-[4px] inline-flex">
                            <span className="text-black text-[18px] font-normal leading-loose">Panne: </span>
                            <span className="text-black text-[20px] font-semibold">{apiInterventionList[selectedInterven]?.panne}</span>
                        </div>
                        <div className="justify-start items-center gap-[4px] inline-flex">
                            <span className="text-black text-[18px] font-normal leading-loose">Sous Système: </span>
                            <span className="text-black text-[20px] font-semibold">{apiInterventionList[selectedInterven]?.sousSysteme}</span>
                        </div>
                        <div className="justify-start items-center gap-[4px] inline-flex">
                            <span className="text-black text-[18px] font-normal leading-loose capitalize">équipement: </span>
                            <span className="text-black text-[20px] font-semibold">{apiInterventionList[selectedInterven]?.equipement}</span>
                        </div>
                        <div className="justify-start items-center gap-[4px] inline-flex">
                            <span className="text-black text-[18px] font-normal leading-loose capitalize">état de l’équipement: </span>
                            <span className="text-black text-[20px] font-semibold">{apiInterventionList[selectedInterven]?.etatEquipementInitial}</span>
                        </div>
                        <div className="justify-start items-center gap-[4px] inline-flex">
                            <span className="text-black text-[18px] font-normal leading-loose">Demandé par: </span>
                            <span className="text-black text-[20px] font-semibold">{apiInterventionList[selectedInterven]?.demanderPar}</span>
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-start gap-4">
                        <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                            Détails sur la validation
                        </span>
                        {!toogleExecutantType?
                            <DropDownField label="" optionList={apiUserNamesList?.map((name,index)=>{ return name+(index+1)})} placeholder="Selectionner l'executant de l'intervention" setNewValue={setExecutant} />
                        :
                            <InputField label="Executant" setNewValue={setExecutant} />
                        }
                        <span onClick={()=>{executantTypeToogler(!toogleExecutantType)}} className="cursor-pointer hover:text-[#EDA92A] italic">
                            {!toogleExecutantType && 'Cliquez ici pour ajouter un executant externe'}
                            {toogleExecutantType && 'Cliquez ici pour choisir un personnel comme executant'}
                        </span>
                        <DateInputField label="Début d'intervention" defaultValue={actualDate} minDate={actualDate} setNewValue={setStartDate} />
                        <DateInputField label="Fin d'intervention" defaultValue={actualDate} minDate={actualDate} setNewValue={setEndDate} />
                    </div>
                </div>
            </Modal>

            {/* Report Intervention Modal */}
            <Modal
                modalTitle="Faire un Rapport sur L’intervention"
                isVisible={isReportModal}
                isDeleteModalVisible = {false}
                modalWidth = {'80%'}
                closeModalAction = {closeModal}
                addBtnLabel="Valider"
                addNewAction = {reportIntervention}
            >
                <div className="w-full flex flex-row justify-center gap-4">
                    <div className="w-full flex-col justify-start items-start inline-flex">
                        <span className="w-full border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                            Information sur {"l'intervention"}
                        </span>
                        <div className="justify-start items-center gap-[4px] inline-flex">
                            <span className="text-black text-[18px] font-normal leading-loose">Panne: </span>
                            <span className="text-black text-[20px] font-semibold">{apiInterventionList[selectedInterven]?.panne}</span>
                        </div>
                        <div className="justify-start items-center gap-[4px] inline-flex">
                            <span className="text-black text-[18px] font-normal leading-loose">Sous Système: </span>
                            <span className="text-black text-[20px] font-semibold">{apiInterventionList[selectedInterven]?.sousSysteme}</span>
                        </div>
                        <div className="justify-start items-center gap-[4px] inline-flex">
                            <span className="text-black text-[18px] font-normal leading-loose capitalize">équipement: </span>
                            <span className="text-black text-[20px] font-semibold">{apiInterventionList[selectedInterven]?.equipement}</span>
                        </div>
                        <div className="justify-start items-center gap-[4px] inline-flex">
                            <span className="text-black text-[18px] font-normal leading-loose capitalize">état de l’équipement: </span>
                            <span className="text-black text-[20px] font-semibold">{apiInterventionList[selectedInterven]?.etatEquipementInitial}</span>
                        </div>
                        <div className="justify-start items-center gap-[4px] inline-flex">
                            <span className="text-black text-[18px] font-normal leading-loose">Demandé par: </span>
                            <span className="text-black text-[20px] font-semibold">{apiInterventionList[selectedInterven]?.demanderPar}</span>
                        </div>
                        <div className="justify-start items-center gap-[4px] inline-flex">
                            <span className="text-black text-[18px] font-normal leading-loose">Executant: </span>
                            <span className="text-black text-[20px] font-semibold">{apiInterventionList[selectedInterven]?.executant}</span>
                        </div>
                        <div className="justify-start items-center gap-[4px] inline-flex">
                            <span className="text-black text-[18px] font-normal leading-loose">Début d’intervention: </span>
                            <span className="text-black text-[20px] font-semibold">{apiInterventionList[selectedInterven]?.debutIntervention}</span>
                        </div>
                        <div className="justify-start items-center gap-[4px] inline-flex">
                            <span className="text-black text-[18px] font-normal leading-loose">Fin d’intervention: </span>
                            <span className="text-black text-[20px] font-semibold">{apiInterventionList[selectedInterven]?.finIntervention}</span>
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-start gap-4">
                        <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                            Détails sur le rapport
                        </span>
                        <TextAreaField label="Actions effectuées" setNewValue={setEtatFinal} />
                        <TextAreaField label="Autres Observations" setNewValue={setObservation} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}