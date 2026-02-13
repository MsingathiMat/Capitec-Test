"use client"
import SectionContainer from '@/components/shared/SectionContainer'
import { Users } from '@/constants/users'
import { useCustomerTransactionsQuery } from '@/redux/services/queryCustomerTransactions'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { DataTable } from './DataTable'
import { columns } from './columns'
import ToggleIsLoadingProcess from '@/components/shared/ToggleIsLoadingProcess'
import { useEffect, useState } from 'react'

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { addDays } from "date-fns"
import { type DateRange } from "react-day-picker"
import { useSpendingCategoriesQuery } from '@/redux/services/querySpendingCategories'
import { useCategoryListQuery } from '@/redux/services/queryCategoryList'
import { iconMap } from '@/constants/iconMap'

 

function CustomerTransactionTable() {

      const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  })
    




const [FilterTpe, SetFilterTpe] = useState("")

useEffect(()=>{

    if (!dateRange?.from || !dateRange?.to) return

    const params = new URLSearchParams({
      startDate: dateRange.from.toISOString().split("T")[0],
      endDate: dateRange.to.toISOString().split("T")[0],
    })

    SetFilterTpe(`?${params.toString()}`)
 
}, [dateRange])



const {data:CategoryListOnly}=useCategoryListQuery({ customerId: Users.JohnUserId })

type iconMap = keyof typeof iconMap


const {data:Transactions, isFetching:isTransactionDataFetching}=useCustomerTransactionsQuery({ customerId: Users.JohnUserId, query:FilterTpe })
  return (
    <SectionContainer HeaderTitle="Transactions" Description="List of transactions">
  <div className="container mx-auto py-10 w-full">
      
  <div className=' mb-6 CENTER gap-6 flex-wrap ' >

   
     <div className='CENTER gap-3 flex-wrap' >
           <Select onValueChange={(selectedValue)=>{SetFilterTpe(selectedValue)}} >
  <SelectTrigger className="w-[180px] POINTER">
    <SelectValue placeholder="Rearrange rows" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectItem value="?sortBy=date_asc">Date Asc</SelectItem>
      <SelectItem value="?sortBy=date_desc">Date Desc</SelectItem>
      <SelectItem value="?sortBy=amount_asc">Amount Asc</SelectItem>
         <SelectItem value="?sortBy=amount_desc">Amount Desc</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>

<Select onValueChange={(selectedValue)=>{SetFilterTpe(selectedValue)}} >
  <SelectTrigger className="w-[180px] POINTER">
    <SelectValue placeholder="Category" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
     
 {CategoryListOnly?.map(({ name }) => {
  

    return (
      <SelectItem
        key={name}
        value={`?category=${name}`}
      >
       {name}
      </SelectItem>
    )
  })}
    </SelectGroup>
  </SelectContent>
</Select>
     </div>
  <Card className="mx-auto w-fit p-0">
      <CardContent className="p-0">
        <Calendar
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
        />
      </CardContent>
    </Card>
  </div>

      <ToggleIsLoadingProcess isLoading={isTransactionDataFetching}>
        <DataTable   columns={columns} data={Transactions?.transactions ?? []} />
      </ToggleIsLoadingProcess>
    </div>
    </SectionContainer>
  )
}

export default CustomerTransactionTable