import Navbar from "@/components/navigation/Navbar";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getServerAuthSession } from "../api/auth/[...nextauth]";
import { BiEdit } from "react-icons/bi";
import { SingleUpload } from "../../../firebase/upload";

export default function Customize() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [inputForm, setInputForm] = useState({
    name: "",
    image: "",
    bio: "",
  });

  useEffect(() => {
    if (session) {
      setInputForm((prev) => ({
        name: session.user.name,
        image: session.user.image,
        bio: session.user.bio,
      }));
    }
  }, [session]);

  const handleChange = (e) => {
    setInputForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputForm.name || !inputForm.image) {
      return toast.error("Please fill name field and upload your photo! ", {
        id: "save-setting",
      });
    }
    toast.loading("Saving your profile...", { id: "save-setting" });
    await update(inputForm);
    await update();
    toast.success("Redirect you in a moment...", { id: "save-setting" });
    router.back();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    toast.loading("Uploading Image...", { id: "upload-image" });
    const url = await SingleUpload(file, `user-${session.user.id}`, "users-pp");
    toast.success("Image Uploaded Successfully", { id: "upload-image" });
    setInputForm((prev) => ({
      ...prev,
      image: url,
    }));
  };

  return (
    <>
      <Head>
        <title>Profile Setting</title>
      </Head>

      <Navbar />
      <div className="w-full lg:w-6/12 p-3 mx-auto mt-16">
        <div className="text-center text-3xl font-semibold">
          <h1>
            Customize <span className="text-primary">Profile</span>
          </h1>
        </div>
        <div className="w-full">
          <div className="mt-6">
            <div className="flex justify-center gap-7 md:gap-36 mt-3">
              <div className="w-24 h-24 relative">
                <div className="avatar">
                  <div className="w-24 rounded-full border">
                    <Image
                      src={inputForm.image}
                      alt={inputForm.name}
                      width={200}
                      height={200}
                    />
                  </div>
                </div>
                <label className="w-10 h-10 flex justify-center items-center bg-white border rounded-full cursor-pointer absolute bottom-0 right-0 text-black text-xl">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                  <BiEdit />
                </label>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-xl font-semibold">
                    Change <span className="text-primary">Display Name</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={inputForm.name}
                  onChange={handleChange}
                  name="name"
                  className="input text-lg border-primary w-full focus:outline-none rounded"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl font-semibold">
                    Change <span className="text-primary">Bio</span>
                  </span>
                </label>
                <textarea
                  className="textarea text-lg textarea-bordered border-primary h-24 resize-none focus:outline-none rounded"
                  value={inputForm.bio}
                  onChange={handleChange}
                  name="bio"
                />
              </div>
              <hr />
              <button
                onClick={handleSubmit}
                className="w-52 h-12 block mx-auto border border-primary rounded text-primary text-xl font-semibold hover:bg-primary hover:text-white transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getServerAuthSession(context.req, context.res);

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
