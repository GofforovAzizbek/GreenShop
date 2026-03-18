import React from "react";
import { NavLink, useLocation } from "react-router-dom";

// Logo img
import logo from "../../images/logo.svg";
import navBar from "../../images/navBar.svg";

// Header Right Icons
import search from "../../images/search.svg";
import bags from "../../images/bags.svg";
import logout from "../../images/logout.svg";
import likebtn from "../../images/likebtn.svg";

function MobileTopSearch() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white px-2 py-3 lg:hidden">
      <div className="relative mx-auto max-w-[370px]">
        <input
          type="search"
          placeholder="Find your plants"
          className="w-full h-[45px] rounded-[16px] border border-gray-200 bg-white pl-12 pr-4 text-[22px] text-gray-400 font-normal shadow focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100 placeholder:text-gray-400 placeholder:font-normal placeholder:text-[22px]"
        />
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <img src={search} alt="Search" className="h-7 w-7" />
        </span>
      </div>
    </div>
  );
}

function HomeIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H15C14.4477 21 14 20.5523 14 20V15C14 14.4477 13.5523 14 13 14H11C10.4477 14 10 14.4477 10 15V20C10 20.5523 9.55228 21 9 21H4C3.44772 21 3 20.5523 3 20V10.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MobileBottomNav() {
  const location = useLocation();

  const normalizePath = (pathname) => pathname.replace(/\/+$/, "") || "/";
  const path = normalizePath(location.pathname);

  const isShopActive = path === "/shop" || path.startsWith("/products");

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full bg-white/80 backdrop-blur-sm z-10 lg:hidden">
      <div className="relative w-full">
        <img
          src={navBar}
          alt="Mobile navbar background"
          className="absolute bottom-0 left-0 right-0 w-full h-auto object-contain"
        />
        <div className="relative z-10 h-full" />
      </div>
    </nav>
  );
}

function Header() {
  const location = useLocation();

  const normalizePath = (pathname) => pathname.replace(/\/+$/, "") || "/";
  const path = normalizePath(location.pathname);

  const isHomeActive = path === "/" && !location.hash;
  const isShopActive = path === "/shop" || path.startsWith("/products");
  const isPlantActive = location.hash === "#plantcare";
  const isBlogsActive = location.hash === "#blogs";

  const headerLinkClass = (isActive) =>
    `relative z-10 flex flex-col items-center text-sm font-medium transition border-b-[3px] border-transparent pb-1 ${
      isActive
        ? "text-green-600 border-green-600"
        : "text-[#3D3D3D] hover:text-green-600 hover:border-green-600"
    }`;

  return (
    <>
      {/* Mobile top search */}
      <MobileTopSearch />

      {/* Desktop header */}
      <header className="hidden lg:block pt-[25px]">
        <div className="container">
          <div className="flex-center justify-between pb-[16px] border-b border-gray-200">
            {/* Site logo */}
            <NavLink to="/" className="">
              <img src={logo} alt="Site Logo" className="" />
            </NavLink>

            {/* Header Navigation */}
            <nav className="">
              <ul className="flex-center gap-[50px]">
                {[
                  {
                    key: "home",
                    label: "Home",
                    to: "/",
                    isActive: isHomeActive,
                  },
                  {
                    key: "shop",
                    label: "Shop",
                    to: "/shop",
                    isActive: isShopActive,
                  },
                  {
                    key: "plantcare",
                    label: "Plant Care",
                    to: "/#plantcare",
                    isActive: isPlantActive,
                  },
                  {
                    key: "blogs",
                    label: "Blogs",
                    to: "/#blogs",
                    isActive: isBlogsActive,
                  },
                ].map((item) => (
                  <li key={item.key}>
                    <NavLink
                      to={item.to}
                      className={() => headerLinkClass(item.isActive)}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Header Right */}
            <div className="flex-center gap-[30px]">
              <div className="">
                <button type="button" className="">
                  <img src={search} alt="Search Icon" className="" />
                </button>
              </div>
              <div className="">
                <button type="button" className="">
                  <img src={bags} alt="Bags Icon" className="" />
                </button>
              </div>
              <div className="">
                <button
                  type="button"
                  className="header-right flex-center gap-[6px]"
                >
                  <img src={logout} alt="Logout Icon" className="" />
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <MobileBottomNav />
    </>
  );
}

export default Header;
