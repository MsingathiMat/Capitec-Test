"use client"
import LogoPrimary from '@/components/shared/LogoPrimary'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React from 'react'

function Page() {
  return (
    <div className=' CENTER w-screen h-screen flex-col! gap-12 sm:px-6'>


      <LogoPrimary ScalingWidth={200}/>

      <div  className=" CENTER gap-3 POINTER ">
              <Avatar className=" ">
  <AvatarImage src="/img/john.jpg" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
        <div className=" CENTER flex-col items-start! ">
  <p className=" text-[15px]">{"John Doe"}</p>
   <p className=" text-gray-500 text-[10px]">{"john.doe@email.com"}</p>
      </div>
 </div>
<p className=' text-center! p-12'>Ideally, this will be a public route like login and dashboard will be a protected route </p>

      <div className='CENTER gap-5'>
      
      <Link href={"/dashboard"}>
         <Button className=" BUTTON_OUTLINE w-50 ">Login</Button>
      </Link>
     
    
      </div>
    </div>
  )
}

export default Page