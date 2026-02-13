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
import { HandCoinsIcon, UserRound } from 'lucide-react'
import { useCustomerProfileQuery } from '@/redux/services/queryCustomerProfile'
import { format } from 'date-fns'


const Icon = UserRound

function Profile() {

    const { data: customerData , isFetching:isCustomerDataFetching} = useCustomerProfileQuery({ customerId: Users.JohnUserId })
  

   
   
     let FormattedDate = ""
  
    if (customerData?.joinDate) {
      FormattedDate = format(
        new Date(customerData.joinDate),
        "dd MMMM yyyy"
      )

   
    return (
       <SectionContainer HeaderTitle="Profile" Description="User details">
      <div className=' w-full mt-12 min-w-[320px]'>
  <ToggleIsLoadingProcess isLoading={isCustomerDataFetching}>
{
   customerData &&  <Card className="w-full brder-none outline-0 shadow-none">
  <CardHeader>
  
  <div className=" CENTER gap-4  justify-start!  w-full"> <Icon/>
    <CardTitle className=" LIGHT_BLUE">{customerData?.name}</CardTitle>

<Badge variant="default" className=" bg-orange-400 ml-auto">{customerData?.accountType.toUpperCase()}</Badge>
   
    </div>
 
    
  </CardHeader>
  <CardContent>
    <p className=" text-gray-500">{customerData?.email} </p>
     <p className=" H1 mt-5">{`${customerData?.customerId}`} </p>

     <p className=" text-gray-500">{"CUstomer Id"} </p>

       <p className=' text-2xl mt-5 text-orange-300'>{`Starting Date: ${FormattedDate}`} </p>
  </CardContent>
  <CardFooter>
  <div className="CENTER justify-start gap-2  w-full">

<p>Customer Currency</p>
     <p className=' text-red-500 px-12'>|</p>
          <p>{customerData?.currency} </p>
  </div>
  </CardFooter>
 
</Card>
}

        </ToggleIsLoadingProcess>


 
        
      </div>
  
       </SectionContainer>
  )
}}

export default Profile