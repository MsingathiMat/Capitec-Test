import Image from "next/image";
import LogoGray from "../shared/LogoGray";

const DISCLAIMER =
  "Capitec Bank is an authorised financial services provider (FSP 46669) and registered credit provider (NCRCP13). Capitec Bank Limited Reg. No: 1980/003695/06";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-white py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 px-4 text-center md:flex-row md:gap-6">
    <LogoGray ScalingWidth={100} />
        <p className="text-xs text-[#3a3a3a]">{DISCLAIMER}</p>
      </div>
    </footer>
  );
}
