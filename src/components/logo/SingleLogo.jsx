import Image from "next/image";

function SingleLogo({ className }) {
  return (
    <Image
      src={`/img/logo-combine.png`}
      className={className ?? ""}
      alt="Thred's Logo"
      width={100}
      height={100}
    />
  );
}

export default SingleLogo;
