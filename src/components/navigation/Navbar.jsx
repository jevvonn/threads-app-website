import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import UserDropdown from "@/components/navigation/UserDropdown";
import SingleLogo from "@/components/logo/SingleLogo";
import FullLogo from "@/components/logo/FullLogo";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const { q } = router.query;

  return (
    <div className="w-full fixed top-0 z-50 border-b py-2 px-2 lg:px-12 flex justify-between items-center gap-1 md:gap-20 bg-base-100">
      <div className="w-8 md:w-1/5">
        <Link href="/" title="Thred's">
          <SingleLogo className="hidden lg:w-2/4 md:block" />
          <FullLogo className="w-full md:hidden" />
        </Link>
      </div>
      <div className="md:w-4/5 flex justify-between items-center gap-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/search?q=${e.target.search.value}`);
          }}
          autoComplete="off"
          className="md:w-1/2"
        >
          <div className="form-control h-full relative flex justify-center ">
            <input
              type="search"
              name="search"
              placeholder="Search Thread's..."
              defaultValue={q ? q : ""}
              className="input input-bordered w-full h-10 pr-10 lg:pr-14 rounded-full focus:outline-none relative"
            />
            <AiOutlineSearch
              size={24}
              className="absolute right-3 lg:right-5  bg-transparent"
            />
          </div>
          <button type="submit" className="hidden" />
        </form>
        <UserDropdown />
      </div>
    </div>
  );
}
