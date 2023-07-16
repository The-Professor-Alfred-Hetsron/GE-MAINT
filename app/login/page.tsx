'use client'

import { useState } from "react";
import { useRouter } from 'next/navigation'
import Image from "next/image";
import InputField from '../../components/UIElements/FormElments/InputField'

export default function Login () {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [matricule, setMatricule] = useState("")

    const router = useRouter()

    const submitForm = () => {
        console.log('Nom: '+name)
        console.log('Email: '+email)
        console.log('Matricule: '+matricule)
        if(name && email && matricule){
            router.push(`/dashboard/${name.trimEnd().replace(" ", "-")}/accueil`)
        }
    }

    return (
      <div className="w-screen h-screen bg-stone-50 flex justify-center items-center">
        <div className="w-full h-full flex justify-center items-center relative">
            <div className=" w-full h-[500px] absolute top-0 pr-[200px]">
                <div className="w-full h-full bg-[url('/assets/img/loginPAKstar.svg')] bg-cover bg-no-repeat bg-right-bottom"></div>
            </div>

            <div className="w-full h-full flex flex-col justify-center items-center absolute top-0 gap-14 z-10">
                <span className=" text-center text-sky-400 text-[81.07px] font-semibold leading-[104.23px] tracking-wide">TYA MAINT</span>

                <div className="w-3/5 bg-white rounded-[32px] shadow border border-indigo-50 flex justify-center items-start gap-4">
                    <div className="w-1/2 h-full flex flex-col justify-evenly items-center text-center p-8 bg-[#E8F2F8] rounded-tl-[32px] rounded-bl-[32px]">
                        <span className="text-sky-700 text-[18px] font-normal">PORT AUTONOME DE KRIBI</span>
                        <span className="text-sky-500 text-[18px] font-normal">PORT AUTHORITY OF KRIBI</span>
                        <span className="text-center text-black text-[24px] font-normal uppercase">Service d’Exploitation et Maintenance des Réseaux Utilitaires</span>
                        <Image src="/assets/img/login3DEngineer.png" alt="login3DImage" width="200" height="400"/>
                    </div>

                    <form className="w-1/2 h-full flex flex-col justify-evenly items-center text-center p-8 gap-10" onSubmit={(e)=>(e.preventDefault())}>
                        <span className="text-black text-4xl font-bold">Connexion</span>
                        <InputField label="Nom" setNewValue={setName} />
                        <InputField label="Email" setNewValue={setEmail} />
                        <InputField label="Matricule" setNewValue={setMatricule} />
                        <button type="submit" onClick={()=>submitForm()} className="h-[30px] px-4 py-[24px] bg-amber-400 rounded-[32px] justify-center items-center inline-flex text-white text-[20px] font-normal leading-9">Se Connecter</button>
                    </form>
                </div>
            </div>

            <div className="w-full h-[400px] absolute bottom-0">
                <div className="w-full h-full bg-[url('/assets/img/loginPAKleaf.svg')] bg-cover bg-no-repeat bg-right-top"></div>
            </div>
        </div>
      </div>
    );
}