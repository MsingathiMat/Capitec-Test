"use client"
import SectionContainer from '@/components/shared/SectionContainer'
import { Users } from '@/constants/users'
import { iconMap } from "@/constants/iconMap"
import { useSpendingSummaryQuery } from '@/redux/services/querySpendingSummary'
import React from 'react'
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
import { Goal, Group, HandCoinsIcon, UserRound } from 'lucide-react'
import { useCustomerProfileQuery } from '@/redux/services/queryCustomerProfile'
import { format } from 'date-fns'
import { useSpendingGolasQuery } from '@/redux/services/querySPendingGoals'
import StatsCard from '@/components/shared/StatsCard'
import { useCategoryListQuery } from '@/redux/services/queryCategoryList'


const Icon = Group
type iconMap = keyof typeof iconMap

function AllCategories() {

 
   const {data:CategoryListOnly, isFetching:isfetchingCategory}=useCategoryListQuery({ customerId: Users.JohnUserId })
   
   
    return (
       <SectionContainer HeaderTitle="All Categories" Description="List of all categories">
      <div className=' w-full mt-6 CENTER  gap-8 flex-wrap '>


           <ToggleIsLoadingProcess isLoading={isfetchingCategory}>

          {

            CategoryListOnly?.map((category)=>{

               const Icon = iconMap[category.icon as iconMap] 
              return  CategoryListOnly && <div className=' min-w-[320px]'><StatsCard BodyDescription={`Category Color: ${category.color}`} Component={<Icon size={40} color={category.color}/>}  Title={category?.name}  Icon={Group}  BodyTitle={`${category?.amount}` } /></div>
 
            })
           
          }

        </ToggleIsLoadingProcess>
        
      </div>
  
       </SectionContainer>
  )
}

export default AllCategories