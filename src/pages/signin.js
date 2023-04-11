import LoginButton from "@/components/LoginButton";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function signIn() {
  return (
    <div className="h-screen flex flex-col justify-evenly lg:justify-center bg-white">
      <div className="w-full h-56 md:h-72 lg:h-96 flex flex-col justify-between items-center">
        <img
          src="img/hantu-combine.png"
          className="w-10/12 md:w-3/4 lg:w-1/3"
        ></img>
        <h1 className="text-3xl lg:text-5xl text-black font-medium md:font-semibold">
          Sign <span className="text-primary">In</span>
        </h1>
        <p className="text-2xl lg:text-3xl">it's easier to sign up now</p>
      </div>
      <div className="w-full mt-4 lg:h-72 flex flex-col justify-center items-center gap-5">
        <button className="btn rounded-full shadow-[0_5px_7px_-5px_gray] w-80 lg:w-1/4 flex justify-start pl-7 lg:pl-16 gap-4 text-lg lg:text-xl capitalize tracking-widest bg-[#F1E6E6] text-[#696767]  hover:bg-secondary">
          <FcGoogle />
          Continue with Google
        </button>
        <button className="btn rounded-full shadow-[0_5px_7px_-5px_gray] w-80 lg:w-1/4 flex justify-start pl-7 lg:pl-16 gap-4 text-lg lg:text-xl capitalize tracking-widest bg-[#5165EA] text-white  hover:bg-white hover:text-[#5165EA]">
          <FaFacebook />
          Continue with Facebook
        </button>
      </div>
    </div>
  );
}
