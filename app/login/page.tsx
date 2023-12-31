'use client'

import 'animate.css';
import { useState } from "react";
import { useRouter } from 'next/navigation'
import Image from "next/image";
import InputField from '../../components/UIElements/FormElments/InputField'
import { useAppDispatch } from "@/redux/hooks";
import { login } from "@/redux/features/authentication/authenticatedUserSlice";
import RoundBar from "@/components/spiners/RoundBar";
import {projectName} from '@/constants/config'

import { addAlert } from "@/redux/features/alerts/alertsSlice"
import { DISPLAYTIMEOUT } from "@/constants/time"

export default function Login () {
    const dispatch = useAppDispatch()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [matricule, setMatricule] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const submitForm = async () => {
        //try authentication process
        if (!name || !email || !matricule){
            setError("veillez remplir tous les champs")
        }
        else{
            setLoading(true)
            try {
                const res = await fetch('/api/users/connexion', {
                    body: JSON.stringify({email, matricule}),
                    method: 'POST',
                })
                const json = await res.json()
                const { user } = json
                console.log(user)
                if (user != undefined){
                    // console.log(user)
                    dispatch(login(user))
                    if(name && email && matricule){
                        localStorage.setItem('role',user.role)
                        setTimeout(() => {
                            dispatch(addAlert({type: 'SUCCESS', message: `Connexion établi avec succes, Bienvenue ${user.nom}`}))
                        }, DISPLAYTIMEOUT)
                        router.push(`/dashboard/${name}/accueil`)
                    }
                }
                else{
                    setError(json.error)
                    setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: 'Echec de Connexion, veulliez verifier votre connexion'}))
                }, DISPLAYTIMEOUT)
                }
            } catch (error) {
                console.log(error)
                setTimeout(() => {
                    dispatch(addAlert({type: 'FAILURE', message: 'Echec de Connexion, veulliez verifier votre connexion'}))
                }, DISPLAYTIMEOUT)
            }
            setLoading(false)
        }
        //send user to the right view
    }

    return (
      <div className="w-screen h-screen bg-stone-50 flex justify-center items-center relative">
        <div className=" w-full h-[70%] animate__animated animate__bounceInDown absolute top-0 pr-[250px]">
            <div className="w-full h-full bg-[url('/assets/img/loginPAKstar.svg')] bg-cover bg-no-repeat bg-right-bottom"></div>
        </div>

        <div className="w-full h-full flex flex-col justify-center items-center absolute top-0 gap-14 z-10">
            <span className=" text-center text-sky-400 text-[81.07px] font-semibold leading-[104.23px] tracking-wide">{projectName}</span>

            <div className="w-3/5 bg-stone-50 rounded-[32px] shadow drop-shadow-lg border border-indigo-50 flex justify-center items-start gap-4">
                <div className="w-1/2 h-full flex flex-col justify-evenly items-center text-center p-8 bg-[#E8F2F8] rounded-tl-[32px] rounded-bl-[32px]">
                    <Image className="" width="300" height="100" src="/assets/img/pakLogo2.png" alt="Logo PAK"/>
                    <span className="text-center text-black text-[24px] font-normal uppercase">Service d’Exploitation et Maintenance des Réseaux Utilitaires</span>
                    <Image src="/assets/img/login3DEngineer.png" alt="login3DImage" width="200" height="400"/>
                </div>

                    <form className="w-1/2 h-full flex flex-col justify-evenly items-center text-center p-8 gap-10" onSubmit={(e)=>(e.preventDefault())}>
                        <div className="flex flex-col justify-center items-center">
                            <span className="text-black text-4xl font-bold">Connexion</span>
                            {error && <span className="text-red-500 text-lg font-bold">{error}</span>}
                        </div>
                        <InputField label="Nom" setNewValue={setName} />
                        <InputField label="Email" setNewValue={setEmail} />
                        <InputField label="Matricule" setNewValue={setMatricule} />
                        <button type="submit" onClick={()=>submitForm()} className="h-[30px] px-4 py-[24px] bg-amber-400 rounded-[32px] justify-center items-center inline-flex text-white text-[20px] font-normal leading-9">
                            Se Connecter
                        </button>
                    </form>
                    {loading &&
                    <div className="absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-[rgba(3,3,3,0.5)] rounded-[32px]">
                        <RoundBar />
                    </div>}
                </div>
            </div>

        <div className="w-full h-[55%] animate__animated animate__bounceInUp absolute bottom-0">
            <div className="w-full h-full bg-[url('/assets/img/loginPAKleaf.svg')] bg-cover bg-no-repeat bg-right-top"></div>
        </div>
      </div>
    );
}