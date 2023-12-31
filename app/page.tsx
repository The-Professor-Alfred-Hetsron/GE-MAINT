import Image from "next/image"
import Link from 'next/link'
import {projectName} from '@/constants/config'

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-row">

      <div className="bg-[#E8F2F8] w-3/5 h-full flex rounded-br-[100px] flex-col justify-center items-center py-10">
        <div className="p-8 h-full flex flex-col justify-evenly items-start">
          <span className="text-sky-400 text-[400%] font-semibold w-full">{projectName}</span>
          <span className="text-[350%] font-semibold">Gestion de la Maintenance et du Suivi</span>
          <span className="text-[24px] font-normal">Service d’Exploitation et Maintenance des Réseaux Utilitaires</span>
          <Link href="/login" className="h-[30px] px-4 py-[24px] bg-amber-400 rounded-[32px] justify-center items-center inline-flex text-white text-[20px] font-normal leading-9 hover:scale-110">Se Connecter</Link>
        </div>
      </div>

      <div className="flex flex-col h-full w-2/5 justify-center items-center">

        <div className="flex flex-row justify-center items-center w-full p-4 gap-4">
          <div className="flex flex-col h-full justify-evenly">
            <span className="text-sky-700 text-[20px] font-normal">PORT AUTONOME DE KRIBI</span>
            <span className="text-sky-500 text-[20px] font-normal">PORT AUTHORITY OF KRIBI</span>
          </div>
          <Image className="relative rounded-[62.25px]" width="100" height="100" src="/assets/img/svgPAKLogo.svg" alt="Logo PAK"/>
        </div>

        <div className="h-full w-full flex justify-center relative items-center">
          <Image className="rounded-[62.25px] absolute left-[-80px] aspect-square" width="550" height="550" src="/assets/img/indexImg.png" alt="Index Generator"/>
        </div>
      </div>
    </div>
  )
}
