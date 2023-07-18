'use client'

import Link from "next/link"
import AddBtn from "../../../../../../../../components/UIElements/AddBtn"
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillEye } from "react-icons/ai";
import { usePathname } from 'next/navigation'
import DeleteBtn from '../../../../../../../../components/UIElements/DeleteBtn'

export default function Panne ({params}:{params: { panne: string }}) {
    const pathname = usePathname()
    const subSysName = pathname.split('/')[pathname.split('/').length-3]
    const equipmentName = pathname.split('/')[pathname.split('/').length-4]
    const username = pathname.split('/')[pathname.split('/').length-6]

    const panne = {
        nom: "Nom Panne1",
        description: "La description de la panne 1, voici ce qu’il faut faire",
        gravite: 2
    }

    const protocoleList = [
        " ", " "
    ]

    const openAddProtocolModal = () => {

    }

    const viewProtocoleDetails = (index:number) => {

    }

    const deleteSelectedProtocole = (index:number) => {

    }

    const deletePanne = () => {
        console.log("Delete Panne")
    }
    return(
        <div className="w-full bg-white rounded-2xl shadow backdrop-blur-[20px] p-2 flex-col justify-start items-center gap-2 inline-flex">
            <div className="w-full justify-start items-center inline-flex gap-1">
                <Link href={`/dashboard/${username}/equipements/${equipmentName}`} className="text-[#165081] text-2xl font-semibold uppercase leading-[52.11px]">{equipmentName.replace("-"," ")}</Link>
                <Link href={`/dashboard/${username}/equipements/${equipmentName}/${subSysName}`} className="text-[#0B5DA7] text-2xl font-semibold uppercase leading-[52.11px]"> - {subSysName.replace("-"," ")}</Link>
                <span className="text-zinc-800 text-2xl font-semibold uppercase leading-[52.11px]"> - Pannes</span>
            </div>

            <div className="w-full p-2 bg-white rounded-2xl border border-slate-300 flex-col justify-start items-center gap-2.5 inline-flex">
                <div className="w-full px-4 flex-col justify-start items-start gap-2 inline-flex">
                    <div className="flex-col justify-start items-start inline-flex">
                        <span className="text-black text-[26px] font-semibold uppercase">{panne.nom}</span>
                        <div className="justify-start items-baseline gap-[4px] inline-flex">
                            <span className="text-black text-[18px] font-normal leading-loose">Description: </span>
                            <span className="text-black text-[20px] font-semibold uppercase">{panne.description}</span>
                        </div>
                        <div className="justify-start items-baseline gap-[4px] inline-flex">
                            <span className="text-black text-[18px] font-normal leading-loose">Gravité: </span>
                            <span className="text-black text-[20px] font-semibold uppercase">{panne.gravite}</span>
                        </div>
                    </div>
                    <div className="w-full pr-2 flex justify-between items-start">
                        <DeleteBtn deleteAction={deletePanne}/>
                    </div>
                </div>

                {/* Liste des protocoles preventifs ci-dessous */}
                <div className="w-full flex flex-col">
                    <div className="w-full pb-2 border-b border-slate-300 justify-start items-center gap-2.5 inline-flex">
                        <div className="w-full gap-2 flex flex-row justify-start items-baseline">
                            <span className="text-black text-[24px] font-normal">Pannes </span>
                            <span className="w-8 h-8 p-5 bg-sky-500 rounded-[100px] justify-center items-center inline-flex text-white text-base font-semibold">{protocoleList.length}</span>
                        </div>
                        <AddBtn width={400} placeholder="Nouveau Protocole" addFunction={openAddProtocolModal}/>
                    </div>

                    <div className="inline-flex gap-4 py-2 justify-start items-start flex-wrap overflow-auto">
                        <table className="w-full p-2 rounded-2xl border border-slate-400 flex-col justify-start items-start inline-flex">
                            <thead className="w-full bg-white border-b border-slate-400">
                                <tr className="w-full p-2 flex gap-1 text-black text-lg font-bold leading-7 tracking-tight">
                                    <td className="w-[150px]">N°</td>
                                    <td className="w-full">Protocoles</td>
                                    <td className="w-full text-center">Action</td>
                                </tr>
                            </thead>
                            <tbody className="w-full">
                            {
                                protocoleList.map((protocole, index) => {
                                    return <tr key={index} className="w-full p-2 flex gap-1 text-black text-lg font-medium leading-7 tracking-tight odd:bg-white even:bg-indigo-50">
                                        <td className="w-[150px]">{index+1}</td>
                                        <td className="w-full">Protocoles</td>
                                        <td className="w-full flex gap-1 justify-end items-start flex-wrap">
                                            <button onClick={()=>viewProtocoleDetails(index)} className="py-1 px-2 bg-white rounded-[100px] text-[#149FDA] border border-sky-500 justify-center items-center gap-1 inline-flex hover:bg-[#149FDA] hover:text-white">
                                                <AiFillEye size={20}/>
                                                <span>Details</span>
                                            </button>
                                            <button onClick={()=>deleteSelectedProtocole(index)} className="py-1 px-2 bg-white rounded-[100px] text-[#EA4335] border border-red-500 justify-center items-center gap-1 inline-flex hover:bg-[#EA4335] hover:text-white">
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
        </div>
    )
}