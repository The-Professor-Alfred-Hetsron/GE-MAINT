'use client'

import NavBar from '../../../components/UIElements/NavBar'
import Header from '../../../components/UIElements/Header'
import { useAppSelector } from "@/redux/hooks";
import { useState } from 'react';

export default function DashboardLayout(
    { 
        children,
        params 
    }: {
        children: React.ReactNode,
        params: { username: string }
    }
){
    const userType = "Responsable"

    const [ isNavVisible, setNavVisibility ] = useState(true)

    return (
        <div className="w-screen h-screen bg-stone-50 flex justify-center items-center overflow-auto">
            {isNavVisible && <NavBar username={decodeURI(params.username)} navToogler={setNavVisibility}/>}
            <div className={isNavVisible? 'w-[calc(100%-320px)] lg:w-full h-full fixed top-0 right-0 flex flex-col gap-2 p-2 bg-stone-50 justify-start items-center overflow-y-auto':'w-full lg:w-full h-full fixed top-0 right-0 flex flex-col gap-2 p-2 bg-stone-50 justify-start items-center overflow-y-auto'}>
                <Header username={decodeURI(params.username)} role={userType} navStatus={isNavVisible} navToogler={setNavVisibility}/>
                {children}
            </div>
        </div>
    )
}