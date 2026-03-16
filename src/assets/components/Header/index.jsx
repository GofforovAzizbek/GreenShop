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
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/95 px-4 py-3 backdrop-blur-lg lg:hidden">
      <div className="relative">
        <input
          type="search"
          placeholder="Search plants, pots..."
          className="w-full rounded-full border border-gray-200 bg-white py-2 pl-11 pr-4 text-sm text-gray-700 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
        />
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <img src={search} alt="Search" className="h-4 w-4" />
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between border-t border-gray-200 bg-white/95 px-4 pb-safe pt-2 backdrop-blur-lg lg:hidden">
      {items.map((item) => {
        const active = item.isActive();
        return (
          <NavLink
            key={item.key}
            to={item.to}
            className="flex flex-col items-center justify-center gap-1 px-4 text-xs font-medium"
          >
            <span
              className={`h-3 w-3 rounded-full transition-colors ${
                active ? "bg-green-600" : "bg-gray-300"
              }`}
            />
            <span className={active ? "text-green-600" : "text-gray-500"}>
              {item.label}
            </span>
          </NavLink>
        );
      })}
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
