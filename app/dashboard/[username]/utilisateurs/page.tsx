'use client'

import AddBtn from "@/components/UIElements/AddBtn"
import InputSearchField from "@/components/UIElements/FormElments/InputSearchField"
import UserRole from "@/components/UIElements/UserRole"
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Users () {

    const userList = [
        {
            nom: "Nom Prénom",
            email: "nom@gmail.com",
            matricule: "PAK5DS5S4",
            role: "Personnel"
        },
        {
            nom: "Nom Prénom",
            email: "nom@gmail.com",
            matricule: "PAK5DS5S4",
            role: "Responsable"
        },
        {
            nom: "Nom Prénom",
            email: "nom@gmail.com",
            matricule: "PAK5DS5S4",
            role: "Responsable"
        },
        {
            nom: "Nom Prénom",
            email: "nom@gmail.com",
            matricule: "PAK5DS5S4",
            role: "Personnel"
        },
        {
            nom: "Nom Prénom",
            email: "nom@gmail.com",
            matricule: "PAK5DS5S4",
            role: "Personnel"
        }
    ]

    const sortInterventionList = (value: string) => {

    }

    const openAddUserModal = () => {
        console.log("Open Intervention Modal")
    }

    const deleteUser = (index: number) => {
        console.log("Delete User " + index)
    }

    return(
        <div className="w-full bg-white rounded-2xl shadow backdrop-blur-[20px] p-2 flex-col justify-start items-center gap-2 flex">
            <div className="w-full justify-start items-center gap-4 inline-flex">
                <span className="text-zinc-800 text-2xl font-semibold uppercase leading-[52.11px]">Utilisateurs</span>
                <span className="w-10 h-10 p-5 bg-sky-500 rounded-[100px] justify-center items-center inline-flex text-white text-base font-semibold">{userList.length}</span>
            </div>

            <div className="w-full h-full p-2 bg-white rounded-2xl border border-slate-300 flex-col justify-start items-center gap-2.5 inline-flex">
                <div className="w-full justify-between items-center gap-4 inline-flex">
                    <InputSearchField setNewSearchValue={sortInterventionList} placeholder="Rechercher un utilisateur"/>
                    <AddBtn width={550} placeholder="ajouter un utilisateur" addFunction={openAddUserModal}/>
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
                                <td className="w-full text-center">Action</td>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                        {
                            userList.map((user, index) => {
                                return <tr key={index} className="w-full p-2 flex gap-1 text-black text-lg font-medium leading-7 tracking-tight odd:bg-white even:bg-indigo-50">
                                    <td className="w-[150px]">{index+1}</td>
                                    <td className="w-full">{user.nom}</td>
                                    <td className="w-full">{user.email}</td>
                                    <td className="w-full">{user.matricule}</td>
                                    <td className="w-full flex justify-center"><UserRole role={user.role}/></td>
                                    <td className="w-full flex gap-1 justify-end items-start flex-wrap">
                                        <button onClick={()=>deleteUser(index)} className="py-1 px-2 bg-white rounded-[100px] text-[#EA4335] border border-red-500 justify-center items-center gap-1 inline-flex hover:bg-[#EA4335] hover:text-white">
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
        </div>
    )
}