import Image from "next/image";

function FullLogo({ className }) {
  return (
    <Image
      src={`/img/logo-self.png`}
      className={`${className} w-auto h-auto` ?? ""}
      alt="Thred's Logo"
      priority
      width={100}
      height={100}
    />
  );
}

export default FullLogo;
