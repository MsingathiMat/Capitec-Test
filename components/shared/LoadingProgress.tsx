"use client"
import { IdentityColors } from '@/constants/identityColors'
import React from 'react'
import { ThreeDot } from 'react-loading-indicators'



function LoadingProgress({isLoading, size="small",color=IdentityColors.CAPITEC_GRAY}:{isLoading:boolean, size?:SimpleSizes, color?:string}) {
  return (
    <>
     
   {isLoading? <ThreeDot  color={color} size={size} text="" textColor="" />:null}
    </>
  )
}

export default LoadingProgress
