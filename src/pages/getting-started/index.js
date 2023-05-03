import { BiEdit } from "react-icons/bi";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

const Settings = () => {
  const { data: session } = useSession();
  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Start</title>
      </Head>

      <div className="w-full h-screen overflow-hidden relative">
        <div className="ml-[-230px] mt-[-700px] w-[850px] h-[850px] md:ml-[-350px] md:mt-[-1350px] md:w-[1500px] md:h-[1500px] lg:ml-[-3060px] lg:mt-[-7350px] lg:w-[7500px] lg:h-[7500px] bg-secondary rounded-full"></div>

        <form className="w-full h-screen flex flex-col gap-6 items-center bg-transparent absolute top-0">
          <div className="w-full mt-4 text-center">
            <h1 className="text-3xl text-black font-semibold md:font-semibold">
              Setting <span className="text-primary">Up</span> Your Profile
            </h1>
          </div>

          <div className="w-32 h-32 relative ">
            <div className="avatar">
              <div className="w-32  rounded-full ring-2 ring-white">
                <Image
                  src={session.user.image}
                  alt="user-image"
                  width={200}
                  height={200}
                />
              </div>
            </div>
            <label className="w-10 h-10 flex justify-center items-center bg-white border rounded-full cursor-pointer absolute bottom-0 right-0 text-black text-xl">
              <input type="file" className="hidden"></input>
              <BiEdit />
            </label>
          </div>

          <div className="w-10/12 md:w-3/5 lg:w-6/12">
            <label htmlFor="display-name" className="flex flex-col gap-1">
              <p className="text-xl font-medium md:font-semibold lg:font-medium">
                Display <span className="text-primary">Name</span>
              </p>
              <input
                type="text"
                name="display-name"
                className="w-full py-2 px-4 text-lg rounded-2xl border border-[#777777] outline-none focus:border focus:border-primary"
                defaultValue={session.user.name}
              />
            </label>
          </div>

          <div className="w-10/12 md:w-3/5 lg:w-6/12">
            <label htmlFor="bio">
              <p className="text-xl font-medium md:font-semibold lg:font-medium">
                Bio
              </p>
              <textarea
                name="bio"
                className="w-full h-32 py-2 px-4 text-lg rounded-2xl outline-none resize-none border border-[#777777] focus:border focus:border-primary"
              ></textarea>
            </label>
          </div>

          <button className="w-2/4 mt-3 md:w-1/4 lg:w-1/5 btn btn-outline btn-primary border rounded-xl bg-[#f8f8f8] capitalize text-xl tracking-wide">
            Save Profile
          </button>
        </form>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return {
    props: {},
  };
};

export default Settings;
