import Image from "next/image";

export function Logo() {
  return (
    <Image
      src="/svg/capitec-logo.svg"
      alt="Capitec"
      width={133}
      height={19}
      priority
      className="h-5 w-auto"
    />
  );
}
