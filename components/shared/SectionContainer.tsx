"use client"
import LoadingProgress from '@/components/shared/LoadingProgress'
import StatsCard from '@/components/shared/StatsCard'
import ToggleIsLoadingProcess from '@/components/shared/ToggleIsLoadingProcess'
import { useCustomerProfileQuery } from '@/redux/services/queryCustomerProfile'
import { RootState } from '@/redux/store/store'
import { Goal, HandCoins, UserCircle, UserRound } from 'lucide-react'
import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { format } from "date-fns"
import { Users } from '@/constants/users'
import { useSpendingSummaryQuery } from '@/redux/services/querySpendingSummary'
import { useSpendingGolasQuery } from '@/redux/services/querySPendingGoals'


type SectionContainerProp={
    children:ReactNode,
    HeaderTitle:string,
    Description:string
}
function SectionContainer({HeaderTitle,Description,children}:SectionContainerProp) {



  return (
    <div className='p-10 CENTER flex-col  items-start! w-full '>

      <div className='CENTER flex-col items-start! gap-1'>
        <h1 className=' H1 font-bold'>{HeaderTitle} </h1>
        <p className=' text-gray-400 FONT_ARIAL'>{Description}</p>
      </div>

      <div className=' CENTER gap-5 justify-start  w-full'>
{children}
      
      </div>

    </div>
  )
}

export default SectionContainer