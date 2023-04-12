import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Image from "next/image";
import { signIn } from "next-auth/react";
import Head from "next/head";

const Login = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className="h-[100dvh] w-full flex flex-col gap-12 justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-5">
          <Image
            src={`/img/logo-combine.png`}
            width={400}
            height={400}
            alt="Threds Logo"
            className="w-3/4"
          />
          <h1 className="text-5xl text-black font-medium md:font-semibold">
            Sign <span className="text-primary">In</span>
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 w-full px-4">
          <p className="text-2xl">it's easier to sign up now</p>
          <button
            className="btn rounded-full shadow-[0_5px_7px_-5px_gray] w-full sm:w-96 flex justify-center gap-4 text-lg capitalize tracking-widest bg-[#F1E6E6] text-[#696767] hover:bg-white"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/",
              })
            }
          >
            <FcGoogle />
            Continue with Google
          </button>
          <button
            className="btn rounded-full shadow-[0_5px_7px_-5px_gray] w-full sm:w-96 flex justify-center gap-4 text-lg capitalize tracking-widest bg-[#5165EA] text-white hover:bg-white hover:text-[#5165EA]"
            onClick={() =>
              signIn("facebook", {
                callbackUrl: "/",
              })
            }
          >
            <FaFacebook />
            Continue with Facebook
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
