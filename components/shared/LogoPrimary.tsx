import Image from 'next/image'


function LogoPrimary({ScalingWidth=120}:{ScalingWidth?:number}) {
  return (
     <Image
          src="/svg/capitec-logo.svg"
          alt="Capitec Bank"
          width={ScalingWidth}
          height={8}
           
        />
  )
}

export default LogoPrimary