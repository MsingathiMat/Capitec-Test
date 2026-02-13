"use client"

import SectionContainer from '@/components/shared/SectionContainer'
import { Users } from '@/constants/users'
import { useMonthlyTrendsQuery } from '@/redux/services/queryMonthlyTrens'
import React, { useState } from 'react'
import { MonthlyCharts } from './MonthlyCharts'
import ToggleIsLoadingProcess from '@/components/shared/ToggleIsLoadingProcess'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
function MonthlyTrends() {

    const [Filter, SetFilterTpe]=useState("")

  const { data, isFetching } = useMonthlyTrendsQuery({
    customerId: Users.JohnUserId, months:Filter
 
  })


  return (
    <SectionContainer HeaderTitle="Monthly Trends" Description="Trends by any month">

 <div className=' CENTER flex-col! gap-4 w-full'>
           <div> <Select onValueChange={(selectedValue)=>{SetFilterTpe(selectedValue)}} >
  <SelectTrigger className="w-[180px] POINTER">
    <SelectValue placeholder="Monthly Range" />
  </SelectTrigger>
  <SelectContent>
   <SelectGroup>
  <SelectItem value="24">24 Max</SelectItem>
  <SelectItem value="1">1 Month</SelectItem>
  <SelectItem value="2">2 Months</SelectItem>
  <SelectItem value="3">3 Months</SelectItem>
  <SelectItem value="4">4 Months</SelectItem>
  <SelectItem value="5">5 Months</SelectItem>
  <SelectItem value="6">6 Months</SelectItem>
  <SelectItem value="7">7 Months</SelectItem>
  <SelectItem value="8">8 Months</SelectItem>
  <SelectItem value="9">9 Months</SelectItem>
  <SelectItem value="10">10 Months</SelectItem>
  <SelectItem value="11">11 Months</SelectItem>
  <SelectItem value="12">12 Months</SelectItem>
</SelectGroup>
  </SelectContent>
</Select></div>
      <ToggleIsLoadingProcess isLoading={isFetching}>
        {/* Pass the inner trends array */}
        {data && <MonthlyCharts trends={data ?? []} />}
      </ToggleIsLoadingProcess>
 </div>
    </SectionContainer>
  )
}

export default MonthlyTrends
