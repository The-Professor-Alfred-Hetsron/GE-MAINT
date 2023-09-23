'use client'

import React from 'react'
import InfoCard from './InfoCard'
import { useAppSelector } from '@/redux/hooks'

const Alerts = () => {
  const alerts = useAppSelector(state => state.alerts)
  console.log(alerts)
  return (
    <div className='absolute top-0 left-0 pt-8 w-full flex justify-center items-center'>
        <div className='flex flex-col space-y-4'>
            {alerts.map((alert, index) => {
            return <InfoCard key={index} type={alert.type} message={alert.message} index={index}/>
            })}
        </div>
    </div>
  )
}

export default Alerts