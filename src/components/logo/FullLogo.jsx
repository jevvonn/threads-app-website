import Image from "next/image";

function FullLogo({ className }) {
  return (
    <Image
      src={`/img/logo-self.png`}
      className={className ?? ""}
      alt="Thred's Logo"
      width={100}
      height={100}
    />
  );
}

export default FullLogo;
