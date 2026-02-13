"use client"
import SectionContainer from '@/components/shared/SectionContainer'
import { Users } from '@/constants/users'
import { useSpendingSummaryQuery } from '@/redux/services/querySpendingSummary'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import ToggleIsLoadingProcess from '@/components/shared/ToggleIsLoadingProcess'
import { HandCoinsIcon } from 'lucide-react'
import { useState } from 'react'
import { SummaryPeriod } from '@/constants/summaryPeriod'


const Icon = HandCoinsIcon

const summaryPeriodLabelMap: Record<SummaryPeriod, string> = {
  [SummaryPeriod.SEVEN_DAYS]: "Last 7 Days",
  [SummaryPeriod.THIRTY_DAYS]: "Last 30 Days",
  [SummaryPeriod.NINETY_DAYS]: "Last 90 Days",
  [SummaryPeriod.ONE_YEAR]: "Last 1 Year",
}



function SpendingSummary() {

    const [FilterTpe, SetFilterTpe] = useState("")
     const { data: SpendingSUmmaryData, isFetching: isSpenfingQuearyLoading } = useSpendingSummaryQuery({ customerId: Users.JohnUserId,period:FilterTpe })
    
  return (
       <SectionContainer HeaderTitle="Spending Summary" Description="Summarized spending behaviour">
    <div className=' w-full mt-12 min-w-[320px]'>

      <div className='mb-6'>
     
          <Select onValueChange={(selectedValue)=>{SetFilterTpe(selectedValue)}} >
  <SelectTrigger className="w-[180px] POINTER">
    <SelectValue placeholder="Category" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
     
{

     <SelectGroup>
          {Object.values(SummaryPeriod).map((value) => (
            <SelectItem key={value} value={value}>
              {summaryPeriodLabelMap[value]}
            </SelectItem>
          ))}
        </SelectGroup>
}
    </SelectGroup>
  </SelectContent>
</Select>
      </div>
  <ToggleIsLoadingProcess isLoading={isSpenfingQuearyLoading}>
{
   SpendingSUmmaryData &&  <Card className="w-full brder-none outline-0 shadow-none">
  <CardHeader>
  
  <div className=" CENTER gap-4  justify-start!  w-full"> <Icon/>
    <CardTitle className=" LIGHT_BLUE text-2xl">{summaryPeriodLabelMap[FilterTpe as Period]}</CardTitle>

<Badge variant="default" className=" bg-orange-400 ml-auto">{SpendingSUmmaryData?.topCategory?.toLocaleUpperCase()}</Badge>
   
    </div>
 
    
  </CardHeader>
  <CardContent>
    <p className=" text-gray-500">{`Average Transaction: R${SpendingSUmmaryData?.averageTransaction}`} </p>
     <p className=" H1 mt-5">{`R${SpendingSUmmaryData?.totalSpent}`}</p>

     <p className=" text-gray-500">{`${summaryPeriodLabelMap[FilterTpe as Period]}`} </p>

       <p className=' text-2xl mt-5 text-orange-300'>{`Transaction Count: ${SpendingSUmmaryData?.transactionCount}`} </p>
  </CardContent>
  <CardFooter>
  <div className="CENTER justify-start gap-2  w-full">

      <p>{`Spent Change: ${SpendingSUmmaryData?.comparedToPrevious.spentChange}`} </p>
     <p className=' text-red-500 px-12'>|</p>
          <p>{`Transaction Change: ${SpendingSUmmaryData?.comparedToPrevious.transactionChange}`} </p>
  </div>
  </CardFooter>
 
</Card>
}

        </ToggleIsLoadingProcess>


 
        
      </div>
  
       </SectionContainer>
  )
}

export default SpendingSummary