'use client'

import 'animate.css';
import { AiFillEye } from "react-icons/ai"
import InputSearchField from "@/components/UIElements/FormElments/InputSearchField"
import TransactionState from "@/components/UIElements/TransactionState"

export default function StockTransaction () {

    const transactionList = [
        {
            panne: "Nom Piece1",
            sousSysteme: "Nom Sous Systeme1",
            quantite: 2,
            date: "12.06.2023",
            type: "Depôt",
        },
        {
            panne: "Nom Piece2",
            sousSysteme: "Nom Sous Systeme1",
            quantite: 2,
            date: "12.06.2023",
            type: "Retrait",
        },
        {
            panne: "Nom Piece4",
            sousSysteme: "Nom Sous Systeme1",
            quantite: 2,
            date: "12.06.2023",
            type: "Retrait",
        },
        {
            panne: "Nom Piece1",
            sousSysteme: "Nom Sous Systeme1",
            quantite: 2,
            date: "12.06.2023",
            type: "Depôt",
        },
        {
            panne: "Nom Piece2",
            sousSysteme: "Nom Sous Systeme1",
            quantite: 2,
            date: "12.06.2023",
            type: "Depôt",
        }
    ]

    const sortTransactionList = (value: string) => {

    }

    const viewPieceDetails = (index: number) => {

    }

    return(
        <div className="animate__animated animate__fadeInLeft w-full bg-white rounded-2xl shadow backdrop-blur-[20px] p-2 flex-col justify-start items-center gap-2 flex">
            <div className="w-full justify-start items-center gap-4 inline-flex">
                <span className="text-zinc-800 text-2xl font-semibold uppercase leading-[52.11px]">Transaction des Pièces de rechange</span>
                <span className="w-10 h-10 p-5 bg-sky-500 rounded-[100px] justify-center items-center inline-flex text-white text-base font-semibold">{transactionList.length}</span>
            </div>

            <div className="w-full h-full p-2 bg-white rounded-2xl border border-slate-300 flex-col justify-start items-center gap-2.5 flex">
                <div className="w-full justify-between items-center gap-4 inline-flex">
                    <InputSearchField setNewSearchValue={sortTransactionList} placeholder="Rechercher une pièce ou un module"/>
                </div>

                {/* Liste des transactions ci-dessous */}
                <div className="w-full flex flex-col gap-4 justify-start items-start flex-wrap">
                    <table className="w-full p-2 rounded-2xl border border-slate-400 flex-col justify-start items-start flex overflow-x-auto">
                        <thead className="w-full bg-white border-b border-slate-400">
                            <tr className="w-full p-2 flex gap-1 text-black text-lg font-bold leading-7 tracking-tight">
                                <td className="w-[150px]">N°</td>
                                <td className="w-full capitalize">Pièce</td>
                                <td className="w-full capitalize">Sous Système</td>
                                <td className="w-full capitalize text-center">Quantité</td>
                                <td className="w-full capitalize text-center">Date de Transaction</td>
                                <td className="w-full capitalize text-center">Type de Transaction</td>
                                <td className="w-full text-center">Action</td>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {
                                transactionList.map((transaction, index)=> {
                                    return <tr key={index} className="w-full p-2 flex gap-1 text-black text-lg font-medium leading-7 tracking-tight odd:bg-white even:bg-indigo-50">
                                        <td className="w-[150px]">{index+1}</td>
                                        <td className="w-full capitalize">{transaction.panne}</td>
                                        <td className="w-full capitalize">{transaction.sousSysteme}</td>
                                        <td className="w-full capitalize text-center">{transaction.quantite}</td>
                                        <td className="w-full capitalize text-center">{transaction.date}</td>
                                        <td className="w-full capitalize text-center"><TransactionState type={transaction.type}/></td>
                                        <td className="w-full text-center">
                                        <button onClick={()=>viewPieceDetails(index)} className="py-1 px-2 bg-white rounded-[100px] text-[#149FDA] border border-sky-500 justify-center items-center gap-1 inline-flex hover:bg-[#149FDA] hover:text-white">
                                            <AiFillEye size={20}/>
                                            <span>Details</span>
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