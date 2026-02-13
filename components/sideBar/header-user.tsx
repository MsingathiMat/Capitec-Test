"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ToggleIsLoadingProcess from "../shared/ToggleIsLoadingProcess";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation";

export function HeaderUser() {


const customerData = useSelector((state: RootState) => state.customer.customer);

const Router = useRouter()
  return (
   <ToggleIsLoadingProcess isLoading={!customerData}>


 <DropdownMenu>
      <DropdownMenuTrigger className=" CENTER gap-3 POINTER ">
            <Avatar className=" ">
  <AvatarImage src="/img/john.jpg" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
        <div className=" CENTER flex-col items-start! ">
  <p className=" text-[15px]">{customerData?.name}</p>
   <p className=" text-gray-500 text-[10px]">{customerData?.email}</p>
</div>
   
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={()=>{
          Router.push("/")
        }}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

</ToggleIsLoadingProcess>
  );
}
