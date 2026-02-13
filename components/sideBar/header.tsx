import { Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { HeaderUser } from "./header-user";

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-4 border-b border-border bg-white px-4 md:px-6">
      <SidebarTrigger className="-ml-1  POINTER HOVER_PRIMARY_WHITE" />
      <div className="hidden flex-1 items-center justify-center md:flex">
        <div className="relative w-full max-w-md">
         
        
        </div>
      </div>
      <div className="flex items-center gap-4">
        <HeaderUser />
      </div>
    </header>
  );
}
