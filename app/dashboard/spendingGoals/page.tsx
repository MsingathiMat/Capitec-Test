"use client"
import SectionContainer from '@/components/shared/SectionContainer'
import { Users } from '@/constants/users'
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
import { Goal, HandCoinsIcon, UserRound } from 'lucide-react'
import { useCustomerProfileQuery } from '@/redux/services/queryCustomerProfile'
import { format } from 'date-fns'
import { useSpendingGolasQuery } from '@/redux/services/querySPendingGoals'
import StatsCard from '@/components/shared/StatsCard'


const Icon = Goal

function Goals() {

    const {data:SpendingGoalsData, isFetching:isSpendingGoals}=useSpendingGolasQuery({ customerId: Users.JohnUserId })
  
   
   
   
    return (
       <SectionContainer HeaderTitle="Spending Goals" Description="List of all user goals">
      <div className=' w-full mt-6 CENTER  gap-8 flex-wrap '>


           <ToggleIsLoadingProcess isLoading={isSpendingGoals}>

          {

            SpendingGoalsData?.map((goals)=>{

              return  SpendingGoalsData && <div className=' min-w-[320px]'><StatsCard   Title={goals?.id} BadgeTitle={`${goals?.status}`} Icon={Goal} Description={`Days remaining: ${goals?.daysRemaining}`} BodyDescription={"Monthly Budget"} BodyTitle={`R${goals?.monthlyBudget}`} Footer={`Already Spent : R${goals?.currentSpent}`} /></div>
 
            })
           
          }

        </ToggleIsLoadingProcess>
        
      </div>
  
       </SectionContainer>
  )
}

export default Goals