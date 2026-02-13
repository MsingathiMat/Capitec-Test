"use client"

import { iconMap } from "@/constants/iconMap"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"



type iconMap = keyof typeof iconMap

export const columns: ColumnDef<Transaction>[] = [
     {
    accessorKey: "icon",
    header: "Icon",
    cell:(data)=>{

      const Categorycolor = data.row.original.categoryColor
        const Icon = iconMap[data.row.original.icon as iconMap] 
        return <Icon size={20} color={Categorycolor}/>
    }
  },
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell:(item)=>{
 const FormattedDate = format(
      new Date(item.row.original.date),
      "dd MMMM yyyy"
    )
return FormattedDate
    }
  },
  {
    accessorKey: "merchant",
    header: "Merchant",
  },


   {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
   {
    accessorKey: "categoryColor",
    header: "Color",
    cell:(data)=><div style={{backgroundColor:data.row.original.categoryColor}} className=" rounded-full w-2 h-2"></div>
  },
]


