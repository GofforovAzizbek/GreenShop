import React from "react";
import { NavLink, useLocation } from "react-router-dom";

// Logo img
import logo from "../../images/logo.svg";

// Header Right Icons
import search from "../../images/search.svg";
import bags from "../../images/bags.svg";
import logout from "../../images/logout.svg";

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

function MobileBottomNav() {
  const location = useLocation();

  const normalizePath = (pathname) => pathname.replace(/\/+$/, "") || "/";
  const path = normalizePath(location.pathname);

  const isShopActive = path === "/shop" || path.startsWith("/products");

  const items = [
    {
      key: "home",
      label: "Home",
      to: "/",
      isActive: () => path === "/" && !location.hash,
    },
    { key: "shop", label: "Shop", to: "/shop", isActive: () => isShopActive },
    {
      key: "products",
      label: "Products",
      to: "/products/",
      isActive: () => false,
    },
    { key: "more", label: "More", to: "#", isActive: () => false },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-6 pb-2 pt-2 lg:hidden">
      <div className="relative w-full flex justify-center">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
            <svg
              width="32"
              height="32"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="4" y="4" width="16" height="16" rx="4" />
              <path d="M8 12h8M12 8v8" />
            </svg>
          </div>
        </div>
        <div className="w-full bg-white rounded-t-[36px] rounded-b-[24px] shadow-lg flex items-center justify-between px-8 py-4">
          <NavLink to="/" className="flex flex-col items-center">
            <svg width="28" height="28" fill="#219653" viewBox="0 0 24 24">
              <path d="M3 9.75A6.75 6.75 0 0 1 9.75 3h4.5A6.75 6.75 0 0 1 21 9.75v4.5A6.75 6.75 0 0 1 14.25 21h-4.5A6.75 6.75 0 0 1 3 14.25v-4.5Z" />
              <path d="M9 21v-6h6v6" />
            </svg>
          </NavLink>
          <NavLink to="/favorites" className="flex flex-col items-center">
            <svg width="28" height="28" fill="#E0E0E0" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </NavLink>
          <NavLink to="/cart" className="flex flex-col items-center">
            <svg width="28" height="28" fill="#E0E0E0" viewBox="0 0 24 24">
              <path d="M7 18c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2H7zm0 2h10c2.21 0 4-1.79 4-4V7c0-2.21-1.79-4-4-4H7C4.79 3 3 4.79 3 7v9c0 2.21 1.79 4 4 4z" />
            </svg>
          </NavLink>
          <NavLink to="/profile" className="flex flex-col items-center">
            <svg width="28" height="28" fill="#E0E0E0" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" />
              <path d="M12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z" />
            </svg>
          </NavLink>
        </div>
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
    `relative z-10 flex flex-col items-center text-sm font-medium transition border-b-[3px] border-transparent ${
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
