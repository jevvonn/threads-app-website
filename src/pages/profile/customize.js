import Navbar from "@/components/navigation/Navbar";
import React, { useState } from "react";
import { BsLink45Deg } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Customize() {
  const [socialLinks, setSocialLinks] = useState([
    {
      id: Math.random().toString(),
      value: "https://instagram.com/vidi123",
    },
  ]);

  function handleChangeSocialLinks(value, id) {
    setSocialLinks((prev) =>
      prev.map((prevLink) =>
        prevLink.id == id
          ? {
              ...prevLink,
              value,
            }
          : prevLink
      )
    );
  }

  return (
    <>
      <Navbar />
      <div className="w-full lg:w-6/12 p-3 mx-auto mt-16">
        <div className="text-center text-3xl font-semibold">
          <h1>
            Customize <span className="text-primary">Profile</span>
          </h1>
        </div>
        <div className="w-full">
          <div className="mt-6">
            <span className="text-2xl font-semibold">Public profile</span>
            <div className="flex gap-7 md:gap-36 mt-3">
              <div className="avatar">
                <div className="w-32 rounded-full border">
                  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" />
                </div>
              </div>
              <div className="w-52 flex flex-col justify-center gap-2">
                <label className="w-full h-10 flex justify-center items-center bg-primary border rounded-lg cursor-pointer text-white text-xl">
                  <input type="file" className="hidden"></input>
                  Change Picture
                </label>
                <button className="w-full h-10 border border-primary rounded-lg text-primary text-xl font-semibold">
                  Delete Picture
                </button>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-xl font-semibold">
                    Change <span className="text-primary">Name</span>
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered border-primary w-full focus:outline-none"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl font-semibold">
                    Change <span className="text-primary">Bio</span>
                  </span>
                </label>
                <textarea className="textarea textarea-bordered border-primary h-24 resize-none focus:outline-none"></textarea>
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <span className="label-text text-xl font-semibold">
                    Social links ( 5 <span className="text-primary">Max</span> )
                  </span>
                  <p>
                    people who visit your profile will see your social links.
                  </p>
                </div>
                {socialLinks.map((link) => (
                  <div className="relative flex items-center" key={link.id}>
                    <BsLink45Deg size={27} className="absolute left-2" />
                    <input
                      type="text"
                      value={link.value}
                      onChange={(e) =>
                        handleChangeSocialLinks(e.target.value, link.id)
                      }
                      className="w-full px-10 py-2 focus:outline-primary"
                    />
                    <button className="absolute right-2 text-red-600">
                      <RiDeleteBin6Line size={23} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    setSocialLinks((prev) => [
                      ...prev,
                      { id: Math.random().toString(), value: "https://" },
                    ])
                  }
                  className="w-40 px-2 flex justify-center items-center rounded-lg gap-3 font-semibold bg-primary text-white"
                >
                  <span className="text-3xl">+</span> Add social link
                </button>
              </div>
              <hr />
              <button className="w-52 h-12 block mx-auto border border-primary rounded-lg text-primary text-xl font-semibold hover:bg-primary hover:text-white transition">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
