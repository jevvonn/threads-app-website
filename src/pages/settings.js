import { BiEdit } from "react-icons/bi";
import Head from "next/head";

const Settings = () => {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>

      <div className="w-full h-screen overflow-hidden relative">
        <div className="ml-[-230px] mt-[-700px] w-[850px] h-[850px] md:ml-[-350px] md:mt-[-1350px] md:w-[1500px] md:h-[1500px] lg:ml-[-3060px] lg:mt-[-7350px] lg:w-[7500px] lg:h-[7500px] bg-secondary rounded-full"></div>

        <form className="w-full h-screen flex flex-col gap-6 items-center bg-transparent absolute top-0">
          <div className="w-10/12 mt-4 text-center">
            <h1 className="text-3xl text-black font-semibold md:font-semibold">
              Setting <span className="text-primary">Up</span> Your Profile
            </h1>
          </div>

          <div className="avatar w-32 h-32 relative">
            <div className="w-32 h-32 rounded-full ring-4 ring-white absolute">
              <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"></img>
            </div>
            <label className="w-10 h-10 flex justify-center items-center bg-white border-2 border-black rounded-full cursor-pointer absolute bottom-0 right-0 text-black text-3xl">
              <input type="file" className="hidden"></input>
              <BiEdit />
            </label>
          </div>

          <div className="w-10/12 md:w-3/5 lg:w-6/12">
            <label for="display-name" className="flex flex-col gap-1">
              <p className="text-2xl text-black font-medium md:font-semibold lg:font-medium">
                Display <span className="text-primary">Name</span>
              </p>
              <input
                type="text"
                name="display-name"
                className="w-full h-12 px-5 text-xl rounded-2xl border-2 border-[#777777] outline-none focus:border-2 focus:border-primary"
              ></input>
            </label>
          </div>

          <div className="w-10/12 md:w-3/5 lg:w-6/12">
            <label for="bio">
              <p className="text-2xl text-black font-medium md:font-semibold lg:font-medium">
                Bio
              </p>
              <textarea
                name="bio"
                className="w-full h-40 p-5 text-xl rounded-2xl border-2 outline-none resize-none border-1 border-[#777777] focus:border-2 focus:border-primary"
              ></textarea>
            </label>
          </div>

          <button className="w-2/4 mt-3 md:w-1/4 lg:w-1/5 btn btn-outline btn-primary border-2 rounded-2xl bg-[#f8f8f8] capitalize text-xl tracking-wide">
            Save Profile
          </button>
        </form>
      </div>
    </>
  );
};

export default Settings;
