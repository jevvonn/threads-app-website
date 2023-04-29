import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { BsFire } from "react-icons/bs";
import { BsBarChartFill } from "react-icons/bs";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { MdNewReleases } from "react-icons/md";

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }
  return (
    <>
      <div className="w-full fixed top-0 z-[1] border-b-2 px-2 lg:px-12 lg:py-0 flex justify-between items-center gap-1 md:gap-20 bg-base-100">
        <div className="w-8 md:w-1/5">
          <img
            src="img/logo-combine.png"
            className="hidden lg:w-2/4 md:block"
          />
          <img src="img/logo-self.png" className="w-full md:hidden" />
        </div>
        <div className="md:w-4/5 flex justify-between items-center gap-2">
          <div className="form-control h-full relative flex justify-center md:w-1/2">
            <input
              type="text"
              placeholder="Search Thread's"
              className="input input-bordered w-full h-10 pr-10 lg:pr-14 rounded-full focus:outline-none"
            />
            <AiOutlineSearch
              size={24}
              className="absolute right-3 lg:right-5  bg-transparent"
            />
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-9 rounded-full">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-3/4 md:p-3 flex gap-3 mx-auto mt-12">
        <div className="w-full lg:w-4/6 flex flex-col items-end gap-3">
          <div className="w-full md:w-11/12 flex border rounded">
            <div className="w-2/6 h-28 flex flex-col justify-center items-center gap-2">
              <Link
                href=""
                className="w-14 h-14 flex justify-center items-center text-red-600 border rounded-full"
              >
                <BsFire size={30} />
              </Link>
              <span className="font-semibold">Most Like</span>
            </div>
            <div className="w-2/6 h-28 flex flex-col justify-center items-center gap-2">
              <Link
                href=""
                className="w-14 h-14 flex justify-center items-center text-primary border rounded-full"
              >
                <BsBarChartFill size={30} />
              </Link>
              <span className="font-semibold">Most Vote</span>
            </div>
            <div className="w-2/6 h-28 flex flex-col justify-center items-center gap-2">
              <Link
                href=""
                className="w-14 h-14 flex justify-center items-center text-yellow-400 border rounded-full"
              >
                <MdNewReleases size={30} />
              </Link>
              <span className="font-semibold">News Thred</span>
            </div>
          </div>
          <div className="w-full md:w-11/12 p-3 flex justify-between items-center border rounded">
            <div className="avatar">
              <div className="w-10 rounded-full border">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" />
              </div>
            </div>
            <Link
              href=""
              className="w-9/12 h-10 flex items-center border-2 border-primary rounded"
            >
              <input
                type="text"
                placeholder="Whats on your mind"
                className="w-full h-full pl-5 focus:outline-none rounded"
              />
            </Link>
          </div>
          <div className="w-full flex">
            <div className="w-1/12 hidden md:flex flex-col items-center text-primary">
              <button>
                <BiUpvote size={40} className="hidden md:block" />
              </button>
              <span className="font-semibold text-black">20.k</span>
              <button>
                <BiDownvote size={40} className="hidden md:block" />
              </button>
            </div>
            <Link
              href=""
              className="w-full md:w-11/12 border rounded p-3 flex flex-col gap-2"
            >
              <div className="w-full flex gap-2">
                <div className="avatar">
                  <div className="w-12 rounded-full border">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4cAmdWC6aM6Q_eRDo-66c-YE5efIedF_RKLcmCfvAcg&s" />
                  </div>
                </div>
                <div className="">
                  <span className="font-semibold">Raftel Al</span>
                  <div class="flex gap-1">
                    <p>Dirjen***</p>
                    <span>• 5 minutes ago</span>
                  </div>
                </div>
              </div>
              <h3 className="font-semibold">Beliin Anak Mobil Baru 😁😁❤️</h3>
              <img
                src="https://www.viv.co.id/uploads/large/b6be9ec3653241b91edd9c848d43632f.jpg"
                className="w-full"
              ></img>
              <div className="flex justify-end gap-3">
                <div className="md:hidden flex items-center text-primary">
                  <button>
                    <BiUpvote size={27} />
                  </button>
                  <span className="w-10 text-center font-semibold text-black">
                    20.k
                  </span>
                  <button>
                    <BiDownvote size={27} />
                  </button>
                </div>
                <div className="flex items-center gap-1 font-semibold">
                  <button>
                    <AiOutlineHeart size={30} />
                  </button>
                  <p>25.4k</p>
                </div>
                <div className="flex items-center gap-1 font-semibold">
                  <button>
                    <FaRegComment size={27} />
                  </button>
                  <p>120k</p>
                </div>
                <div className="flex items-center gap-1 font-semibold">
                  <button>
                    <BsBookmark size={25} />
                  </button>
                  <p>5k</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="w-full flex">
            <div className="w-1/12 hidden md:flex flex-col items-center text-primary">
              <button>
                <BiUpvote size={40} className="hidden md:block" />
              </button>
              <span className="font-semibold text-black">54.k</span>
              <button>
                <BiDownvote size={40} className="hidden md:block" />
              </button>
            </div>
            <Link
              href=""
              className="w-full md:w-11/12 border rounded p-3 flex flex-col gap-2"
            >
              <div className="w-full flex gap-2">
                <div className="avatar">
                  <div className="w-12 rounded-full border">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4cAmdWC6aM6Q_eRDo-66c-YE5efIedF_RKLcmCfvAcg&s" />
                  </div>
                </div>
                <div className="">
                  <span className="font-semibold">Raftel Al</span>
                  <div class="flex gap-1">
                    <p>Dirjen***</p>
                    <span>• 12 hours ago</span>
                  </div>
                </div>
              </div>
              <h3 className="font-semibold">
                Cerpen Setelah Beliin Anak Mobil Baru 😁😁❤️
              </h3>
              <p className="w-full relative line-clamp-[12] before:content-[''] before:w-full before:h-20 before:absolute before:bottom-0 before:bg-gradient-to-b from-transparent to-white">
                Sebelumnya, Mantan pejabat Direktorat Jenderal Pajak Kementerian
                Keuangan (DJP Kemenkeu) Rafael Alun Trisambodo ditahan KPK. Dia
                diduga menerima USD 90 ribu atau sekitar Rp 1,3 miliar melalui
                perusahaan konsultan pajak miliknya. <br></br>
                <br></br>Ketua KPK Firli Bahuri mengatakan, kasus ini bermula
                saat Rafael diangkat menjadi Kepala Bidang Pemeriksaan,
                Penyidikan, dan Penagihan Pajak pada Kantor Wilayah Ditjen Pajak
                Jawa Timur I pada 2011.
                <br></br>
                <br></br>
                "Dengan jabatannya tersebut diduga RAT (Rafael Alun) menerima
                gratifikasi dari beberapa wajib pajak atas pengondisian berbagai
                temuan pemeriksaan perpajakannya," ujar Firli dalam jumpa pers
                di Gedung KPK, Jakarta Selatan, Senin (3/4/2023). Firli
                mengatakan, Rafael juga diduga memiliki beberapa usaha yang satu
                di antaranya PT Artha Mega Ekadhana (PT AME) yang bergerak dalam
                bidang jasa konsultansi terkait pembukuan dan perpajakan.
              </p>
              <div className="flex justify-end gap-3">
                <div className="md:hidden flex items-center text-primary">
                  <button>
                    <BiUpvote size={27} />
                  </button>
                  <span className="w-10 text-center font-semibold text-black">
                    54.k
                  </span>
                  <button>
                    <BiDownvote size={27} />
                  </button>
                </div>
                <div className="flex items-center gap-1 font-semibold">
                  <button>
                    <AiOutlineHeart size={30} />
                  </button>
                  <p>2.6M</p>
                </div>
                <div className="flex items-center gap-1 font-semibold">
                  <button>
                    <FaRegComment size={27} />
                  </button>
                  <p>1.5M</p>
                </div>
                <div className="flex items-center gap-1 font-semibold">
                  <button>
                    <BsBookmark size={25} />
                  </button>
                  <p>200k</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="hidden w-2/6 lg:block">
          <div className="w-full py-6 px-4 flex flex-col items-center gap-4 border rounded mt-32">
            <h2 className="font-semibold text-xl">Follow More thred'er</h2>
            <div className="w-14 h-14 flex justify-center items-center bg-secondary text-primary border rounded-full">
              <AiOutlineUsergroupAdd size={30} />
            </div>
            <div className="w-full flex justify-between items-center gap-3">
              <div className="avatar">
                <div className="w-14 rounded-full border">
                  <img src="https://mediapublica.co/wp-content/uploads/2015/01/Mr_beans_holiday_ver2.jpg" />
                </div>
              </div>
              <span className="font-semibold">Ibrahim Syah Qordhawi</span>
              <button className="btn btn-primary text-white capitalize tracking-wider">
                Follow
              </button>
            </div>
            <div className="w-full flex justify-between items-center gap-3">
              <div className="avatar">
                <div className="w-14 rounded-full border">
                  <img src="https://yt3.googleusercontent.com/jdxaiUL9R7okC1RlM0XJaMiG5A67ED-UftUbZES8yR53qfjAVT15PucIE675Hc2Zr2N8yVc1Gg=s900-c-k-c0x00ffffff-no-rj" />
                </div>
              </div>
              <span className="font-semibold">Agung Setiyawan</span>
              <button className="btn btn-primary text-white capitalize tracking-wider">
                Follow
              </button>
            </div>
            <div className="w-full flex justify-between items-center gap-3">
              <div className="avatar">
                <div className="w-14 rounded-full border">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCTqpDrWQGagrqaEccS7Wd97j2tD4Mo16RRA&usqp=CAU" />
                </div>
              </div>
              <span className="font-semibold">Mr Beast</span>
              <button className="btn btn-primary text-white capitalize tracking-wider">
                Follow
              </button>
            </div>
            <div className="w-full flex justify-between items-center gap-3">
              <div className="avatar">
                <div className="w-14 rounded-full border">
                  <img src="https://yt3.googleusercontent.com/jdxaiUL9R7okC1RlM0XJaMiG5A67ED-UftUbZES8yR53qfjAVT15PucIE675Hc2Zr2N8yVc1Gg=s900-c-k-c0x00ffffff-no-rj" />
                </div>
              </div>
              <span className="font-semibold">Vidi Fadhil Arofah</span>
              <button className="btn btn-primary text-white capitalize tracking-wider">
                Follow
              </button>
            </div>
            <div className="w-full flex justify-between items-center gap-3">
              <div className="avatar">
                <div className="w-14 rounded-full border">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCTqpDrWQGagrqaEccS7Wd97j2tD4Mo16RRA&usqp=CAU" />
                </div>
              </div>
              <span className="font-semibold">bis</span>
              <button className="btn btn-primary text-white capitalize tracking-wider">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
