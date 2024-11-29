import { Link, NavLink } from "react-router";
import { useState } from "react";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = {
    Home: "",
    Popular: "popular",
    Movies: "movies",
  };
  return (
    <>
      <header className="border-b border-sky-500 border-opacity-50 p-2">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-start justify-between lg:items-center">
            <div className="flex flex-col lg:flex-row lg:items-center">
              <div className="flex items-center gap-1">
                <button className="rounded border-2 border-sky-500 p-1 lg:hidden" onClick={() => setIsOpen(!isOpen)}>
                  {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                  )}
                </button>
                <Link className="flex gap-1" to="/">
                  <img src={`${logo}`} alt="Logo" className="size-8" />
                  <div className="text-2xl font-bold max-sm:hidden">AnimeCharge</div>
                </Link>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center">
                <nav className={`ml-4 flex flex-col gap-2 max-lg:ml-1 max-lg:mt-2 lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-4 ${isOpen ? "" : "hidden"}`}>
                  {Object.entries(navItems).map(([key, value]) => (
                    <NavLink className={({ isActive }) => (isActive ? "text-sky-500" : "")} key={key} to={`/${value}`}>
                      {key}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </div>
            <div className="flex items-center">
              <Link to="/search">
                <button className="rounded border-2 border-sky-500 p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;