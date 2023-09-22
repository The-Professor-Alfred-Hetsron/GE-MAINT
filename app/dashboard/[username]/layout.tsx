'use client'

import NavBar from '@/components/UIElements/NavBar'
import Header from '@/components/UIElements/Header'
import { useAppSelector } from "@/redux/hooks";
import { useState, useEffect } from 'react';

export default function DashboardLayout(
    { 
        children,
        params 
    }: {
        children: React.ReactNode,
        params: { username: string }
    }
){
    const username = decodeURI(params.username)
    // const role = useAppSelector(state =>
    //     state.authentication.role
    // )
    

    const [ isNavVisible, setNavVisibility ] = useState(true)
    const [ role, setRole ] = useState<String | null>("Responsable")
    
    useEffect(()=>{
        setRole(localStorage.getItem('role'))
    },[])

    return (
        <div className="w-screen h-screen bg-stone-50 flex justify-center items-center">
            {isNavVisible && <NavBar username={username} navToogler={setNavVisibility}/>}
            <div className={`lg:w-full h-screen fixed top-0 right-0 flex flex-col gap-2 p-4 bg-stone-50 justify-start items-center ${isNavVisible?'w-[calc(100%-320px)]': 'w-full'}`}>
                <Header username={username} role={role} navStatus={isNavVisible} navToogler={setNavVisibility}/>
                {children}
            </div>
        </div>
    )
}