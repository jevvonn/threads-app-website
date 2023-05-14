import Image from "next/image";

function SingleLogo({ className }) {
  return (
    <Image
      src={`/img/logo-combine.png`}
      className={`${className ?? ""} w-auto h-auto`}
      alt="Thred's Logo"
      width={100}
      priority
      height={100}
    />
  );
}

export default SingleLogo;
