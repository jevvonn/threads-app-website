import Link from "next/link";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsFire } from "react-icons/bs";
import { BsBarChartFill } from "react-icons/bs";
import { MdNewReleases } from "react-icons/md";
import SingleThread from "@/components/thread/SingleThread";
import Navbar from "@/components/navigation/Navbar";

const data = [
  {
    id: "c40a8157-4878-4f2d-a271-85f10e684ca0",
    userId: "clh6b3v450000vng0img2thev",
    type: "POST_BODY",
    title: "Cerpen Setelah Beliin Anak Mobil Baru",
    body: `Sebelumnya, Mantan pejabat Direktorat Jenderal Pajak Kementerian                 Keuangan (DJP Kemenkeu) Rafael Alun Trisambodo ditahan KPK. Dia                 diduga menerima USD 90 ribu atau sekitar Rp 1,3 miliar melalui                 perusahaan konsultan pajak miliknya. <br></br>Ketua KPK Firli Bahuri mengatakan, kasus ini bermula                 saat Rafael diangkat menjadi Kepala Bidang Pemeriksaan,                 Penyidikan, dan Penagihan Pajak pada Kantor Wilayah Ditjen Pajak                 Jawa Timur I pada 2011.                  <br></br>                 "Dengan jabatannya tersebut diduga RAT (Rafael Alun) menerima                 gratifikasi dari beberapa wajib pajak atas pengondisian berbagai                 temuan pemeriksaan perpajakannya," ujar Firli dalam jumpa pers                 di Gedung KPK, Jakarta Selatan, Senin (3/4/2023). Firli                 mengatakan, Rafael juga diduga memiliki beberapa usaha yang satu                 di antaranya PT Artha Mega Ekadhana (PT AME) yang bergerak dalam                 bidang jasa konsultansi terkait pembukuan dan perpajakan.`,
    draft: false,
    categoryId: "649b40bb-db26-4c96-81d7-d18702df459e",
    created_at: "2023-05-02T14:19:51.974Z",
    tags: [],
    category: {
      id: "649b40bb-db26-4c96-81d7-d18702df459e",
      name: "Gaming",
    },
    user: {
      id: "clh6b3v450000vng0img2thev",
      name: "Jevon Mozart",
      email: "jmcb1602@gmail.com",
      emailVerified: null,
      image:
        "https://lh3.googleusercontent.com/a/AGNmyxbAJTBi9ghnDb9aEUJJSw9LSoI1fYn6PvkKd2Z3rA=s96-c",
      bio: null,
    },
    source: [],
    _count: {
      likes: 0,
      vote_up: 0,
      vote_down: 0,
      saved: 0,
      comments: 0,
    },
  },
  {
    id: "7ae39b4e-599e-41e4-af7e-af9596d9f62e",
    userId: "clh6b3v450000vng0img2thev",
    type: "POST_SOURCE",
    title: "Beliin anak mobil baru ",
    body: null,
    draft: false,
    categoryId: "649b40bb-db26-4c96-81d7-d18702df459e",
    created_at: "2023-05-02T14:17:07.122Z",
    tags: [],
    category: {
      id: "649b40bb-db26-4c96-81d7-d18702df459e",
      name: "Gaming",
    },
    user: {
      id: "clh6b3v450000vng0img2thev",
      name: "Jevon Mozart",
      email: "jmcb1602@gmail.com",
      emailVerified: null,
      image:
        "https://lh3.googleusercontent.com/a/AGNmyxbAJTBi9ghnDb9aEUJJSw9LSoI1fYn6PvkKd2Z3rA=s96-c",
      bio: null,
    },
    source: [
      {
        id: "a4fde2a6-ef6b-4521-9126-cfd490120116",
        type: "jpg",
        url: "https://www.viv.co.id/uploads/large/b6be9ec3653241b91edd9c848d43632f.jpg",
        threadId: "7ae39b4e-599e-41e4-af7e-af9596d9f62e",
      },
    ],
    _count: {
      likes: 0,
      vote_up: 0,
      vote_down: 0,
      saved: 0,
      comments: 0,
    },
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="w-full lg:w-3/4 md:p-3 flex gap-3 mx-auto mt-16">
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
          {data.map((thread) => (
            <SingleThread thread={thread} key={thread.id} />
          ))}
        </div>
        <div className="hidden w-2/6 lg:block">
          <div className="w-full py-6 px-4 flex flex-col items-center gap-4 border rounded mt-32">
            <h2 className="font-semibold text-xl">Follow More thred'er</h2>
            <div className="w-14 h-14 flex justify-center items-center bg-secondary text-primary border rounded-full">
              <AiOutlineUsergroupAdd size={30} />
            </div>
            <div className="w-full flex justify-between items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="avatar">
                  <div className="w-14 rounded-full border">
                    <img src="https://mediapublica.co/wp-content/uploads/2015/01/Mr_beans_holiday_ver2.jpg" />
                  </div>
                </div>
                <span className="font-semibold">Ibrahim Syah Qordhawi</span>
              </div>
              <button className="btn btn-sm btn-primary text-white capitalize tracking-wider">
                Follow
              </button>
            </div>
            <div className="w-full flex justify-between items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="avatar">
                  <div className="w-14 rounded-full border">
                    <img src="https://yt3.googleusercontent.com/jdxaiUL9R7okC1RlM0XJaMiG5A67ED-UftUbZES8yR53qfjAVT15PucIE675Hc2Zr2N8yVc1Gg=s900-c-k-c0x00ffffff-no-rj" />
                  </div>
                </div>
                <span className="font-semibold">Ibrahim Syah Qordhawi</span>
              </div>
              <button className="btn btn-sm btn-primary text-white capitalize tracking-wider">
                Follow
              </button>
            </div>
            <div className="w-full flex justify-between items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="avatar">
                  <div className="w-14 rounded-full border">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCTqpDrWQGagrqaEccS7Wd97j2tD4Mo16RRA&usqp=CAU" />
                  </div>
                </div>
                <span className="font-semibold">Mr Beast</span>
              </div>
              <button className="btn btn-sm btn-primary text-white capitalize tracking-wider">
                Follow
              </button>
            </div>
            <div className="w-full flex justify-between items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="avatar">
                  <div className="w-14 rounded-full border">
                    <img src="https://yt3.googleusercontent.com/jdxaiUL9R7okC1RlM0XJaMiG5A67ED-UftUbZES8yR53qfjAVT15PucIE675Hc2Zr2N8yVc1Gg=s900-c-k-c0x00ffffff-no-rj" />
                  </div>
                </div>
                <span className="font-semibold">Vidi Fadhil Arofah</span>
              </div>
              <button className="btn btn-sm btn-primary text-white capitalize tracking-wider">
                Follow
              </button>
            </div>
            <div className="w-full flex justify-between items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="avatar">
                  <div className="w-14 rounded-full border">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCTqpDrWQGagrqaEccS7Wd97j2tD4Mo16RRA&usqp=CAU" />
                  </div>
                </div>
                <span className="font-semibold">Kijang Balap</span>
              </div>
              <button className="btn btn-sm btn-primary text-white capitalize tracking-wider">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
