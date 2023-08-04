'use client'
import { useState } from "react"
import InputSearchField from "@/components/UIElements/FormElments/InputSearchField"
import ViewBtn from "@/components/UIElements/ViewBtn"

export default function Alarmes ({params}:{params: {username:string}}) {
    const baseUrl = "/dashboard/" + decodeURI(params.username)

    const [ apiAlarmList, setApiAlarmList ] = useState([])
    return(
        <div className="w-full h-full bg-white rounded-2xl shadow backdrop-blur-[20px] p-2 flex-col justify-start items-center gap-2 flex">
            <div className="w-full justify-start items-center gap-4 inline-flex">
                <span className="text-zinc-800 text-2xl font-semibold uppercase leading-[52.11px]">Alarmes</span>
                <span className="w-10 h-10 p-5 bg-sky-500 rounded-[100px] justify-center items-center inline-flex text-white text-base font-semibold">{apiAlarmList.length}</span>
            </div>

            <div className="w-full h-full p-2 bg-white rounded-2xl border border-slate-300 flex-col justify-start items-center gap-2.5 inline-flex">
                <div className="w-full justify-between items-center gap-4 inline-flex">
                    <InputSearchField setNewSearchValue={()=>{}} placeholder="Rechercher une alarmes"/>
                </div>

                {/* Liste des interventions ci-dessous */}
                <div className="w-full flex flex-col gap-4 justify-start items-start flex-wrap">
                    <table className="w-full p-2 rounded-2xl border border-slate-400 flex-col justify-start items-start flex overflow-x-auto">
                        <thead className="w-full bg-white border-b border-slate-400">
                            <tr className="w-full p-2 flex gap-1 text-black text-lg font-bold leading-7 tracking-tight">
                                <td className="w-[150px]">N°</td>
                                <td className="w-full">Alarmes</td>
                                <td className="w-full text-center">Date</td>
                                <td className="w-full text-center">Action</td>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                        {
                            apiAlarmList.map((intervention, index) => {
                                return <tr key={index} className="w-full p-2 flex gap-1 text-black text-lg font-medium leading-7 tracking-tight odd:bg-white even:bg-indigo-50">
                                    <td className="w-[150px]">{index+1}</td>
                                    <td className="w-full">Alarmes</td>
                                    <td className="w-full text-center">Alarmes</td>
                                    <td className="w-full flex gap-1 justify-end items-start flex-wrap">
                                    <ViewBtn
                                        viewText = "Voir Plus"
                                        href = {`${baseUrl}/maintenance`}
                                    />
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