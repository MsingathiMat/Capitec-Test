import Image from 'next/image'


function LogoGray({ScalingWidth=160}:{ScalingWidth?:number}) {
  return (
     <Image
          src="/svg/Capitec_logo_grey.svg"
          alt="Capitec Bank"
          width={ScalingWidth}
          height={8}
         
        />
  )
}

export default LogoGray