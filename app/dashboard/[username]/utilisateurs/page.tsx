'use client'

import AddBtn from "@/components/UIElements/AddBtn"
import InputSearchField from "@/components/UIElements/FormElments/InputSearchField"
import InputField from "@/components/UIElements/FormElments/InputField"
import Modal from "@/components/UIElements/Modal"
import UserRole from "@/components/UIElements/UserRole"

import { useState, useEffect } from "react"
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa"

import UserType from "@/types/user"

export default function Users () {

    const [ apiUserList, setApiUserList ] = useState<Array<UserType>>([
        {
            nom: "Nom Prénom1",
            email: "nom1@gmail.com",
            matricule: "PAK5DS5S4",
            role: "Personnel"
        },
        {
            nom: "Nom Prénom2",
            email: "nom2@gmail.com",
            matricule: "PAK5DS5S4",
            role: "Responsable"
        },
        {
            nom: "Nom Prénom3",
            email: "nom3@gmail.com",
            matricule: "PAK5DS5S4",
            role: "Responsable"
        },
        {
            nom: "Nom Prénom4",
            email: "nom4@gmail.com",
            matricule: "PAK5DS5S4",
            role: "Personnel"
        },
        {
            nom: "Nom Prénom5",
            email: "nom5@gmail.com",
            matricule: "PAK5DS5S4",
            role: "Personnel"
        },
        {
            nom: "Nom Prénom1",
            email: "nom1@gmail.com",
            matricule: "PAK5DS5S4",
            role: "Personnel"
        },
        {
            nom: "Nom Prénom2",
            email: "nom2@gmail.com",
            matricule: "PAK5DS5S4",
            role: "Responsable"
        },
        {
            nom: "Nom Prénom3",
            email: "nom3@gmail.com",
            matricule: "PAK5DS5S4",
            role: "Responsable"
        },
        {
            nom: "Nom Prénom4",
            email: "nom4@gmail.com",
            matricule: "PAK5DS5S4",
            role: "Personnel"
        },
        {
            nom: "Nom Prénom5",
            email: "nom5@gmail.com",
            matricule: "PAK5DS5S4",
            role: "Personnel"
        }
    ])
    const [ displayUserList, setDisplayUserList ] = useState<Array<UserType>>(apiUserList)

    const [ isDelAddModal, setDelModalVisibility ] = useState<boolean>(false)
    const [ isUpdateModal, setUpdateModalVisibility ] = useState<boolean>(false)
    const [ isAddModal, setAddModalVisibility ] = useState<boolean>(false)

    // User Information Start
    const [ nom, setNom ] = useState<string>("")
    const [ email, setEmail ] = useState<string>("")
    const [ matricule, setMatricule ] = useState<string>("")
    const [ role, setRole ] = useState<string>("")
    // User Information End

    const [ selectedUser, setSelectedUser ] = useState<number>(0)
    const [ isFormValid, setFormValidity ] = useState<boolean>(false)

    const initialiseParams = () => {
        setNom("")
        setEmail("")
        setMatricule("")
        setRole("")
        setFormValidity(false)
    }

    const initialiseUpdateParams = (index:number)=>{
        let tempUser = apiUserList[index]
        setNom(tempUser.nom)
        setEmail(tempUser.email)
        setMatricule(tempUser.matricule)
        setRole(tempUser.role)
        setFormValidity(false)
    }

    const closeModal = () => {
        setDelModalVisibility(false)
        setUpdateModalVisibility(false)
        setAddModalVisibility(false)
        setSelectedUser(0)
        initialiseParams()
    }
    
    const sortUserList = (value: string) => {
        if(value !== ""){
            let tempList = [...apiUserList]
            tempList = apiUserList.filter((user)=>{
                return ((user.nom.toLowerCase().trim().includes(value.toLowerCase().trim())) ||
                        (user.email.toLowerCase().trim().includes(value.toLowerCase().trim())) ||
                        (user.matricule.toLowerCase().trim().includes(value.toLowerCase().trim())) ||
                        (user.role.toLowerCase().trim().includes(value.toLowerCase().trim())))
                        
            })
            if(tempList.length > 0) {
                setDisplayUserList(tempList)
            }
        }
        else{
            setDisplayUserList(apiUserList)
        }
    }

    const addUser = () => {
        if(isFormValid){
            const tempUser = {
                nom: nom,
                email: email,
                matricule: matricule,
                role: role
            }
            setApiUserList([...apiUserList, tempUser])
            closeModal()
        }
    }

    const updateUser = () => {
        if(isFormValid){
            const tempUser = {
                nom: nom,
                email: email,
                matricule: matricule,
                role: role
            }
            let tempUserList = [...apiUserList]
            tempUserList[selectedUser] = tempUser
            setApiUserList(tempUserList)
            closeModal()
        }
    }

    const deleteUser = () => {
        let tempList = [...apiUserList]
        tempList.splice(selectedUser,1)
        setApiUserList(tempList)
        closeModal()
    }
    
    useEffect(()=>{
        setDisplayUserList(apiUserList)
    },[apiUserList])

    useEffect(()=>{
        if(nom!=="" && email!==""
            && matricule!=="" && role!==""){
                setFormValidity(true)
            }
    },[nom,email,matricule,role])

    return(
        <div className="w-full bg-white rounded-2xl shadow backdrop-blur-[20px] p-2 flex-col justify-start items-center gap-2 flex">
            <div className="w-full justify-start items-center gap-4 inline-flex">
                <span className="text-zinc-800 text-2xl font-semibold uppercase leading-[52.11px]">Utilisateurs</span>
                <span className="w-10 h-10 p-5 bg-sky-500 rounded-[100px] justify-center items-center inline-flex text-white text-base font-semibold">{apiUserList.length}</span>
            </div>

            <div className="w-full h-full p-2 bg-white rounded-2xl border border-slate-300 flex-col justify-start items-center gap-2.5 inline-flex">
                <div className="w-full justify-between items-center gap-4 inline-flex">
                    <InputSearchField setNewSearchValue={sortUserList} placeholder="Rechercher un utilisateur:nom, email, matricule, role"/>
                    <AddBtn width={550} placeholder="ajouter un utilisateur" addFunction={()=>{setAddModalVisibility(true)}}/>
                </div>

                {/* Liste des Utilisateurs ci-dessous */}
                <div className="w-full flex flex-col gap-4 justify-start items-start flex-wrap">
                    <table className="w-full p-2 rounded-2xl border border-slate-400 flex-col justify-start items-start flex overflow-x-auto">
                        <thead className="w-full bg-white border-b border-slate-400">
                            <tr className="w-full p-2 flex gap-1 text-black text-lg font-bold leading-7 tracking-tight">
                                <td className="w-[150px]">N°</td>
                                <td className="w-full capitalize">Nom</td>
                                <td className="w-full capitalize">Email</td>
                                <td className="w-full capitalize">Matricule</td>
                                <td className="w-full capitalize text-center">Role</td>
                                <td className="w-full text-right">Action</td>
                            </tr>
                        </thead>
                        <tbody className="w-full overflow-y-auto">
                        {
                            displayUserList.map((user, index) => {
                                return <tr key={index} className="w-full p-2 flex items-center gap-1 text-black text-lg font-medium leading-7 tracking-tight odd:bg-white even:bg-indigo-50">
                                    <td className="w-[150px]">{index+1}</td>
                                    <td className="w-full">{user.nom}</td>
                                    <td className="w-full">{user.email}</td>
                                    <td className="w-full">{user.matricule}</td>
                                    <td className="w-full flex justify-center items-center"><UserRole role={user.role}/></td>
                                    <td className="w-full flex flex-row gap-1 justify-end items-center flex-wrap">
                                        <button onClick={()=>{setSelectedUser(index)
                                                                initialiseUpdateParams(index)
                                                                setUpdateModalVisibility(true)}} className="py-1 px-2 bg-white rounded-[100px] text-[#149FDA] border border-sky-500 justify-center items-center gap-1 inline-flex hover:bg-[#149FDA] hover:text-white">
                                            <FaRegEdit size={20}/>
                                            <span>Modifier</span>
                                        </button>
                                        <button onClick={()=>{setSelectedUser(index)
                                                                setDelModalVisibility(true)}} className="py-1 px-2 bg-white rounded-[100px] text-[#EA4335] border border-red-500 justify-center items-center gap-1 inline-flex hover:bg-[#EA4335] hover:text-white">
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

            {/* Add User Modal */}
            <Modal
                modalTitle="Ajouter un Utilisateur"
                isVisible={isAddModal}
                isDeleteModalVisible = {false}
                modalWidth = {'80%'}
                closeModalAction = {closeModal}
                addBtnLabel="Ajouter"
                addNewAction = {addUser}
            >
                <div className="w-full flex flex-row justify-center gap-4">
                    <div className="w-full flex flex-col justify-start gap-4">
                        <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                            Caractéristiques
                        </span>
                        <InputField label="Nom" setNewValue={setNom} />
                        <InputField label="Email" setNewValue={setEmail} />
                        <InputField label="Matricule" setNewValue={setMatricule} />
                        <InputField label="Rolz" setNewValue={setRole} />
                    </div>
                </div>
            </Modal>
            
            {/* Update User Modal */}
            <Modal
                modalTitle="Modifier un Utilisateur"
                isVisible={isUpdateModal}
                isDeleteModalVisible = {false}
                modalWidth = {'80%'}
                closeModalAction = {closeModal}
                addBtnLabel="Modifier"
                addNewAction = {updateUser}
            >
                <div className="w-full flex flex-row justify-center gap-4">
                    <div className="w-full flex flex-col justify-start gap-4">
                        <span className="border-b border-slate-300 justify-center items-center text-black text-[20px] font-normal">
                            Caractéristiques
                        </span>
                        <InputField label="Nom" defaultValue={nom}  setNewValue={setNom} />
                        <InputField label="Email" defaultValue={email} setNewValue={setEmail} />
                        <InputField label="Matricule" defaultValue={matricule} setNewValue={setMatricule} />
                        <InputField label="Role" defaultValue={role} setNewValue={setRole} />
                    </div>
                </div>
            </Modal>

            {/* Delete User Modal */}
            <Modal
                modalTitle="Supprimer l'utilisateur"
                isVisible={isDelAddModal}
                isDeleteModalVisible = {isDelAddModal}
                deleteText = {<span>Vous êtes sur le point de supprimer {"l'utilisateur"} <span className='font-bold'>{apiUserList[selectedUser].nom}</span> ainsi que tout les droits {"d'accès"} associés à cet utilisateur. Voulez-vous poursuivre ?</span>}
                modalWidth = {600}
                closeModalAction = {closeModal}
                deleteAction = {deleteUser}
            />
        </div>
    )
}