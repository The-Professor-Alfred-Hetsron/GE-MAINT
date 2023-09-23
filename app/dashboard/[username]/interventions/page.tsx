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

import { useAppDispatch } from "@/redux/hooks"
import { addAlert } from "@/redux/features/alerts/alertsSlice"
import { DISPLAYTIMEOUT } from "@/constants/time"

import { useState, useEffect } from "react"
import EquipmentType from "@/types/equipment"
import SubSystemType from "@/types/subSystem"
import PanneType from "@/types/panne"

export default function Interventions ({params}:{params: {username:string}}) {
    const username = decodeURI(params.username)
    const dispatch = useAppDispatch()
    const actualDate = `${new Date().getFullYear()}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + new Date().getDate()).slice(-2)}`

    const [ apiInterventionList, setApiInterventionList ] = useState<Array<InterventionType>>([])
    const [ displayIntervenList, setDisplayIntervenList] = useState<Array<InterventionType>>(apiInterventionList)

    const [ userRole, setUserRole ] = useState<string|null>("Responsable")

    // APi Equipment, Sub system, Panne and User List Start
    const [ apiEquipNames, setApiEquipNames ] = useState<Array<string>>([])
    const [ apiEquipIdList, setApiEquipIdList ] = useState<Array<number>>([])

    const [ apiSubSysNames, setApiSubSysNames ] = useState<Array<string>>([])
    const [ apiSubSysIdList, setApiSubSysIdList ] = useState<Array<number>>([])

    const [ apiPanneNames, setApiPanneNames ] = useState<Array<string>>([])
    const [ apiPanneIdList, setApiPanneIdList ] = useState<Array<number>>([])

    const [ apiUserNames, setApiUserNames ] = useState<Array<string>>([])
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
    const [ demanderPar, setDemanderPar ] = useState<string>(username)

    const [ executant, setExecutant ] = useState<string>("")
    const [ startDate, setStartDate ] = useState<string>(actualDate)
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

        setApiSubSysIdList([])
        setApiSubSysNames([])
        setApiPanneIdList([])
        setApiPanneNames([])
        
        setEtatInitial("")
        setDemanderPar(username)
        setFormValidity(false)

        setExecutant("")
        setStartDate(actualDate)
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

    const demandIntervention = async () => {
        // console.log(isFormValid)
        // console.log(`${panne} ${subSys} ${equip} ${etatInitial} ${demanderPar}`)
        if(isFormValid){
            try {
                const response = await fetch('/api/equipements/sous-systeme/panne/intervention/nouvelle', {
                    method: 'POST',
                    body: JSON.stringify({
                        panne_id:apiPanneIdList[apiPanneNames.indexOf(panne)],
                        etat_initial:etatInitial,
                        demander_par:demanderPar,
                        statut: "En Attente"
                    })
                });
                const json = await response.json()
                const { intervention } = json
                if(!intervention){
                    closeModal()
                    setTimeout(() => {
                        dispatch(addAlert({type: 'FAILURE', message: "Echec de l'envoi de la demande d'intervention"}))
                    }, DISPLAYTIMEOUT)
                    return
                }
                const tempData = {
                    id:intervention.id,
                    panneId:intervention.panne_id,
                    panne: panne,
                    sousSystemeId:apiSubSysIdList[apiSubSysNames.indexOf(subSys)],
                    sousSysteme: subSys,
                    equipementId:apiEquipIdList[apiEquipNames.indexOf(equip)],
                    equipement: equip,
                    etatEquipementInitial: intervention.etat_initial,
                    demanderPar: intervention.demander_par,
                    etat:intervention.statut
                }
                setApiInterventionList([tempData, ...apiInterventionList])
                closeModal()
                setTimeout(() => {
                    dispatch(addAlert({type: 'SUCCESS', message: "Demande d'intervention envoyée avec succes"}))
                }, DISPLAYTIMEOUT)
            } catch (error) {
                console.log(error)
                closeModal()
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: "Echec de l'envoi de la demande d'intervention"}))
                }, DISPLAYTIMEOUT)
            }

        }
    }

    const validateIntervention = async () => {
        // console.log(isApproveFormValid)
        if(isApproveFormValid){
            try {
                let tempList = [...apiInterventionList]
                const response = await fetch('/api/equipements/sous-systeme/panne/intervention/editer/'+tempList[selectedInterven].id, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        executant:executant,
                        debut_intervention:startDate,
                        fin_intervention:endDate,
                        etat_final:"",
                        observation:"",
                        statut: "Validé",
                    })
                });
                const json = await response.json()
                const { intervention } = json
                if(!intervention){
                    closeModal()
                    setTimeout(() => {
                        dispatch(addAlert({type: 'FAILURE', message: "Echec de l'envoi de la validation de l'intervention"}))
                    }, DISPLAYTIMEOUT)
                    return
                }
                tempList[selectedInterven]["executant"] = intervention.executant
                tempList[selectedInterven]["debutIntervention"] = intervention.debut_intervention
                tempList[selectedInterven]["finIntervention"] = intervention.fin_intervention
                tempList[selectedInterven]["etat"] = intervention.statut
                setApiInterventionList(tempList)
                closeModal()
                setTimeout(() => {
                    dispatch(addAlert({type: 'SUCCESS', message: "Intervention validé avec succes, en attente d'un rapport"}))
                }, DISPLAYTIMEOUT)
            } catch (error) {
                console.log(error)
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: "Echec de l'envoi de la validation de l'intervention"}))
                }, DISPLAYTIMEOUT)
                closeModal()
            }
        }
    }

    const reportIntervention = async() => {
        console.log(isReportFormValid)
        if(isReportFormValid){
            try {
                let tempList = [...apiInterventionList]
                const response = await fetch('/api/equipements/sous-systeme/panne/intervention/editer/'+tempList[selectedInterven].id, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        executant:tempList[selectedInterven].executant,
                        debut_intervention:tempList[selectedInterven].debutIntervention,
                        fin_intervention:tempList[selectedInterven].finIntervention,
                        etat_final:etatFinal,
                        observation:observation,
                        statut: "Rapport",
                    })
                });
                const json = await response.json()
                const { intervention } = json
                if(!intervention){
                    closeModal()
                    setTimeout(() => {
                        dispatch(addAlert({type: 'FAILURE', message: "Echec de l'envoi du rapport de l'intervention"}))
                    }, DISPLAYTIMEOUT)
                    return
                }
                tempList[selectedInterven]["etatEquipementFinal"] = intervention.etat_final
                tempList[selectedInterven]["observation"] = intervention.observation
                tempList[selectedInterven]["etat"] = intervention.statut
                setApiInterventionList(tempList)
                closeModal()
                setTimeout(() => {
                    dispatch(addAlert({type: 'SUCCESS', message: "Rapport de l'intervention envoyé avec succès"}))
                }, DISPLAYTIMEOUT)
            } catch (error) {
                console.log(error)
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: "Echec de l'envoi du rapport de l'intervention"}))
                }, DISPLAYTIMEOUT)
                closeModal()
            }
        }
    }

    const initialiseEquipList = (equipements:Array<EquipmentType>) => {
        console.log(equipements)
        const tempIds = equipements.map((equip:EquipmentType) => {
            return equip.id
        });
        // console.log(tempIds)
        setApiEquipIdList(tempIds)
        const tempNames = equipements.map((equip:EquipmentType) => {
            return equip.nom
        });
        // console.log(tempNames)
        setApiEquipNames(tempNames)
    }

    const initialiseSubsysList = async (equip:string) =>{
        console.log(equip)
        if(equip!=""){
            setEquip(equip)
            const tempId = apiEquipIdList[apiEquipNames.indexOf(equip)]
            console.log(tempId)
            try {
                if(tempId != undefined){
                    const subsysreq = await fetch(`/api/equipements/${tempId}/sous-systemes`)
                    const subsysjson = await subsysreq.json()
                    const { sousSystemes } = subsysjson
                    if(!sousSystemes) return
                    if(sousSystemes.length>0){
                        const tempIds =  sousSystemes.map((sub:SubSystemType) => {
                            return sub.id
                        });
                        console.log(tempIds)
                        setApiSubSysIdList(tempIds)
                        const tempNames = sousSystemes.map((sub:SubSystemType) => {
                            return sub.nom
                        });
                        setApiSubSysNames(tempNames)
                        console.log(tempNames)

                        setApiPanneIdList([])
                        setApiPanneNames([])
                        setSubSys("")
                        setPanne("")
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const initialisePanneList = async (subSys:string) =>{
        console.log(subSys)
        if(subSys!==""){
            setSubSys(subSys)
            const tempId = apiSubSysIdList[apiSubSysNames.indexOf(subSys)]
            console.log(tempId)
            try {
                if(tempId != undefined){
                    const pannereq = await fetch(`/api/equipements/sous-systeme/${tempId}/pannes/listes`)
                    const pannejson = await pannereq.json()
                    const { pannes } = pannejson
                    console.log(pannes)
                    if(!pannes) return
                    if(pannes.length>0){
                        const tempIds =  pannes.map((panne:PanneType) => {
                            return panne.id
                        });
                        console.log(tempIds)
                        setApiPanneIdList(tempIds)
                        const tempNames = pannes.map((panne:PanneType) => {
                            return panne.nom
                        });
                        console.log(tempNames)
                        setApiPanneNames(tempNames)
                        setPanne("")
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const loadUsers = async () => {
        const response = await fetch('/api/users')
        const json = await response.json()
        const { users } = json
        if (!users) return;
        // console.log(users)
        const tempNames = users.map((user:PanneType) => {
            return user.nom
        });
        // console.log(tempNames)
        setApiUserNames(tempNames);
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
                if (!interventions) return
                // console.log(interventions)
                loadUsers()

                const eqreq = await fetch('/api/equipements')
                const json1 = await eqreq.json()
                const { equipements } = json1
                if (!equipements){
                    setTimeout(() => {
                        dispatch(addAlert({type: 'FAILURE', message: 'Echec du chargement des Equipements'}))
                    }, DISPLAYTIMEOUT)
                    return
                }
                initialiseEquipList(equipements)

                if(interventions.length > 0){
                    const tempArray:InterventionType[] = []
                    for (let i = 0; i < interventions.length; i++) {
                        const interven = interventions[i];
                        const response1 = await fetch('/api/equipements/sous-systeme/panne/'+interven.panne_id)
                        const json1 = await response1.json();
                        const { panne } = json1
                        if (!panne) return;

                        const response2 = await fetch("/api/equipements/sous-systeme/"+panne.soussysteme_id)
                        const json2 = await response2.json()
                        const { sousSysteme } = json2
                        if (!sousSysteme) return;

                        const response3 = await fetch('/api/equipements/'+sousSysteme.equipement_id)
                        const json3 = await response3.json()
                        const { equipement } = json3
                        if (!equipement) return;
                        
                        const intervenObj: InterventionType = {
                            id:interven.id,
                            panneId:panne.id,
                            panne: panne.nom,
                            sousSystemeId:sousSysteme.id,
                            sousSysteme: sousSysteme.nom,
                            equipementId:equipement.id,
                            equipement: equipement.nom,
                            etatEquipementInitial: interven.etat_initial,
                            demanderPar: interven.demander_par,
                            executant: interven.executant?interven.executant:"",
                            debutIntervention: interven.debut_intervention?interven.debut_intervention:"",
                            finIntervention: interven.fin_intervention?interven.fin_intervention:"",
                            etatEquipementFinal: interven.etat_final?interven.etat_final:"",
                            observation: interven.observation?interven.observation:"",
                            etat: interven.statut
                        }
                        tempArray.splice(0,0,intervenObj)
                        // console.log(tempArray)
                    }
                    setApiInterventionList(tempArray)
                    setDisplayIntervenList(tempArray)
                    setTimeout(() => {
                        dispatch(addAlert({type: 'SUCCESS', message: 'Interventions chargées avec succes'}))
                    }, DISPLAYTIMEOUT)
                }else{
                    setTimeout(() => {
                        dispatch(addAlert({type: 'SUCCESS', message: 'Aucune Interventions Enregistrées'}))
                    }, DISPLAYTIMEOUT)
                }
            } catch (error) {
                console.log(error)
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: 'Echec du chargement des Interventions'}))
                }, DISPLAYTIMEOUT)
            }
        }
        setUserRole(localStorage.getItem('role'))
        loadInterventions()
    },[dispatch])

    return(
        <div className="w-full h-full overflow-y-auto bg-white rounded-2xl shadow drop-shadow-md p-2 flex-col justify-start items-center gap-2 flex">
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
                                <td className="w-full capitalize text-center">Statut</td>
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
                                            adminRole= {userRole}
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
                modalTitle="Détail de l'intervention"
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
                isAddStock={true}
                closeModalAction = {closeModal}
                addBtnLabel="Envoyer"
                addNewAction = {demandIntervention}
            >
                <div className="w-full flex flex-row justify-center gap-4">
                    <div className="w-full flex flex-col justify-start gap-4">
                        <span className="border-b border-slate-300 capitalize justify-center items-center text-black text-[20px] font-normal">
                            équipement
                        </span>
                        <DropDownField label="" optionList={apiEquipNames} placeholder="Selectionner l'équipement" setNewValue={initialiseSubsysList} />
                        <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                            Sous Système
                        </span>
                        <DropDownField label="" optionList={apiSubSysNames} placeholder='Selectionner le sous Système' setNewValue={initialisePanneList} />
                        <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                            Panne
                        </span>
                        <DropDownField label="" optionList={apiPanneNames} placeholder='Selectionner la panne à intervenir' setNewValue={setPanne} />
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
                isAddStock={true}
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
                            <DropDownField label="" optionList={apiUserNames} placeholder="Selectionner l'executant de l'intervention" setNewValue={setExecutant} />
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
                isAddStock={true}
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