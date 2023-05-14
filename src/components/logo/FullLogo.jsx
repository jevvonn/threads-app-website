import Image from "next/image";

function FullLogo({ className }) {
  return (
    <Image
      src={`/img/logo-self.png`}
      className={`${className ?? ""} w-auto h-auto`}
      alt="Thred's Logo"
      width={100}
      priority
      height={100}
    />
  );
}

export default FullLogo;
