'use client'

import { removeAlert } from '@/redux/features/alerts/alertsSlice';
import { useAppDispatch } from '@/redux/hooks';
import React, { useEffect, useState } from 'react'
import { AiOutlineCheck, AiOutlineClose, AiOutlineWarning } from 'react-icons/ai'
export interface IICard {
    type: string;
    message: string;
    index?: number;
}
const InfoCard: React.FC<IICard> = (props) => {
    const dispatch = useAppDispatch()
    const [isVisible, setIsVisible] = useState<boolean>(true)
    useEffect(() => {
        setTimeout(() => {
            setIsVisible(false)
            props.index && dispatch(removeAlert(props.index))
        }, 3500)
    }, [dispatch, props.index])
    return (
        props.type === 'SUCCESS' && isVisible === true ?
            <div className='h-[50px] bg-green-500 text-white p-3 flex justify-start items-center space-x-3 rounded-lg'>
                <div className='w-[30px] h-[30px] flex justify-center items-center border-2 border-white rounded-full'>
                    <AiOutlineCheck />
                </div>
                <div className='flex justify-start items-center'>
                    <span>{props.message}</span>
                </div>
            </div>
        : props.type === 'WARNING' && isVisible ?
            <div className='h-[50px] bg-amber-500 text-white p-3 flex justify-start items-center space-x-3 rounded-lg'>
                <div className='w-[30px] h-[30px] flex justify-center items-center border-2 border-white rounded-full'>
                    <AiOutlineWarning />
                </div>
                <div className='flex justify-start items-center'>
                    <span>{props.message}</span>
                </div>
            </div>
        : props.type === 'FAILURE' && isVisible ?
            <div className='h-[50px] bg-red-500 text-white p-3 flex justify-start items-center space-x-3 rounded-lg'>
                <div className='w-[30px] h-[30px] flex justify-center items-center border-2 border-white rounded-full'>
                    <AiOutlineClose />
                </div>
                <div className='flex justify-start items-center'>
                    <span>{props.message}</span>
                </div>
            </div>
        : ""
    );
}

export default InfoCard