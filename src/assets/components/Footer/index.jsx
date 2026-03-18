import React, { useState, useEffect } from "react";
import logoIcon from "../../images/logo.svg";
import locationIcon from "../../images/Location.svg";
import emailIcon from "../../images/Message.svg";
import phoneIcon from "../../images/Calling.svg";
import gardenCareImg from "../../images/FooterCactus1.svg";
import plantRenovationImg from "../../images/FooterCactus2.svg";
import wateringGardenImg from "../../images/FooterCactus3.svg";
import paymentMethodsImg from "../../images/FooterPayment.svg";
import facebookIcon from "../../images/Facebook.svg";
import instagramIcon from "../../images/Instagram.svg";
import twitterIcon from "../../images/Twitter.svg";
import linkedinIcon from "../../images/Linkedin.svg";
import unionIcon from "../../images/Union.svg";

const footerLinks = [
  {
    title: "My Account",
    links: ["My Account", "Our stores", "Contact us", "Career", "Specials"],
  },
  {
    title: "Help & Guide",
    links: [
      "Help Center",
      "How to Buy",
      "Shipping & Delivery",
      "Product Policy",
      "How to Return",
    ],
  },
  {
    title: "Categories",
    links: [
      "House Plants",
      "Potter Plants",
      "Seeds",
      "Small Plants",
      "Accessories",
    ],
  },
];

const categories = [
  {
    image: gardenCareImg,
    title: "Garden Care",
    description:
      "We are an online plant shop offering a wide range of cheap and trendy plants.",
  },
  {
    image: plantRenovationImg,
    title: "Plant Renovation",
    description:
      "We are an online plant shop offering a wide range of cheap and trendy plants.",
  },
  {
    image: wateringGardenImg,
    title: "Watering Garden",
    description:
      "We are an online plant shop offering a wide range of cheap and trendy plants.",
  },
];

const socialLinks = [
  { icon: facebookIcon, label: "Facebook" },
  { icon: instagramIcon, label: "Instagram" },
  { icon: twitterIcon, label: "Twitter" },
  { icon: linkedinIcon, label: "LinkedIn" },
  { icon: unionIcon, label: "Other" },
];

const DesktopFooter = () => {
  return (
    <footer className="hidden md:block">
      {/* Feature / newsletter strip */}
      <div className="bg-white border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <div key={i} className="flex flex-col items-start gap-4">
                <div className="w-14 h-14 shrink-0 flex items-center justify-center">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-800 mb-1">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-sm text-gray-800">
                Would you like to join newsletters?
              </h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="enter your email address..."
                  className="flex-1 border border-gray-200 rounded px-3 py-2 text-xs text-gray-500 outline-none focus:border-[#46A358] transition-colors"
                />
                <button className="bg-[#46A358] hover:bg-[#3d9450] text-white text-xs font-semibold px-4 py-2 rounded transition-colors whitespace-nowrap">
                  Join
                </button>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                We usually post offers and challenges in newsletter. We’re your
                online houseplant destination. We offer a wide range of
                houseplants and accessories shipped directly from our
                (green)house to yours!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Contact Info Strip */}
      <div className="bg-[#f0faf2] border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <img src={logoIcon} alt="GreenShop" className="h-8 w-fit" />

            {/* Contact Info */}
            <div className="flex items-center gap-12 flex-1">
              <div className="flex items-center gap-3">
                <img src={locationIcon} alt="" className="w-5 h-5 shrink-0" />
                <div className="text-sm text-gray-700">
                  <p>70 West Buckingham Ave.</p>
                  <p>Farmingdale, NY 11735</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img src={emailIcon} alt="" className="w-5 h-5 shrink-0" />
                <span className="text-sm text-gray-700">
                  contact@greenshop.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <img src={phoneIcon} alt="" className="w-5 h-5 shrink-0" />
                <span className="text-sm text-gray-700">+88 01911 717 490</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="bg-white">
        <div className="max-w-[1200px] mx-auto px-8 py-12">
          <div className="grid grid-cols-4 gap-12 mb-10">
            {/* My Account */}
            <div>
              <h4 className="font-bold text-base text-gray-900 mb-5">
                {footerLinks[0].title}
              </h4>
              <ul className="flex flex-col gap-3">
                {footerLinks[0].links.map((link, j) => (
                  <li key={j}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-[#46A358] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help & Guide */}
            <div>
              <h4 className="font-bold text-base text-gray-900 mb-5">
                {footerLinks[1].title}
              </h4>
              <ul className="flex flex-col gap-3">
                {footerLinks[1].links.map((link, j) => (
                  <li key={j}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-[#46A358] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-bold text-base text-gray-900 mb-5">
                {footerLinks[2].title}
              </h4>
              <ul className="flex flex-col gap-3">
                {footerLinks[2].links.map((link, j) => (
                  <li key={j}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-[#46A358] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-bold text-base text-gray-900 mb-5">
                Social Media
              </h4>
              <div className="flex items-center gap-3 mb-8">
                {socialLinks.map((s, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded border border-gray-300 flex items-center justify-center hover:border-[#46A358] hover:bg-[#f0faf2] transition-colors"
                  >
                    <img src={s.icon} alt={s.label} className="w-4 h-4" />
                  </a>
                ))}
              </div>

              <h4 className="font-bold text-base text-gray-900 mb-3">
                We accept
              </h4>
              <img
                src={paymentMethodsImg}
                alt="Payment methods"
                className="h-6 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-white border-t border-gray-200 py-4">
        <p className="text-sm text-gray-600 text-center">
          © 2024 GreenShop. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

const MobileFooter = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggle = (i) => setOpenSection(openSection === i ? null : i);

  return (
    <footer className="md:hidden font-montserrat bg-white border-t border-gray-200 md:pb-[150px]">
      {/* Feature / newsletter strip (mobile) */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 py-10">
          <div className="grid grid-cols-1 gap-8">
            {categories.map((cat, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#f0faf2]">
                  <img src={cat.image} alt={cat.title} className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-800 mb-1">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-sm text-gray-800">
                Would you like to join newsletters?
              </h3>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="enter your email address..."
                  className="w-full border border-gray-200 rounded px-3 py-2 text-xs text-gray-500 outline-none focus:border-[#46A358] transition-colors"
                />
                <button className="w-full bg-[#46A358] hover:bg-[#3d9450] text-white text-xs font-semibold px-4 py-2 rounded transition-colors">
                  Join
                </button>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                We usually post offers and challenges in newsletter. We're your
                online houseplant destination. We offer a wide range of
                houseplants and accessories shipped directly from our
                (green)house to yours!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Contact Info (mobile) */}
      <div className="bg-[#f0faf2] border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <img src={logoIcon} alt="GreenShop" className="h-8 w-fit" />
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3">
                <img src={locationIcon} alt="" className="w-5 h-5 shrink-0" />
                <div className="text-sm text-gray-700">
                  <p>70 West Buckingham Ave.</p>
                  <p>Farmingdale, NY 11735</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img src={emailIcon} alt="" className="w-5 h-5 shrink-0" />
                <span className="text-sm text-gray-700">
                  contact@greenshop.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <img src={phoneIcon} alt="" className="w-5 h-5 shrink-0" />
                <span className="text-sm text-gray-700">+88 01911 717 490</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {footerLinks.map((section, i) => (
          <div key={i}>
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between px-4 py-4"
            >
              <span className="font-bold text-sm text-gray-900">
                {section.title}
              </span>
              <span className="text-gray-400 text-lg leading-none">
                {openSection === i ? "−" : "+"}
              </span>
            </button>

            {openSection === i && (
              <ul className="px-4 pb-4 flex flex-col gap-2">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-green-600 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="px-4 py-6 border-t border-gray-100 flex flex-col gap-6">
        <div>
          <h4 className="font-bold text-sm text-gray-900 mb-3">Social Media</h4>
          <div className="flex items-center gap-3">
            {socialLinks.map((s, i) => (
              <a
                key={i}
                href="#"
                aria-label={s.label}
                className="w-9 h-9 rounded border border-gray-200 flex items-center justify-center text-green-600 hover:bg-green-50 transition-colors text-xs font-bold"
              >
                <img src={s.icon} alt={s.label} className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold text-sm text-gray-900 mb-3">We accept</h4>
          <img
            src={paymentMethodsImg}
            alt="Payment methods"
            className="h-8 object-contain"
          />
        </div>
      </div>

      <div className="border-t border-gray-100 px-4 py-4">
        <p className="text-xs text-gray-400 text-center">
          © 2024 GreenShop. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const handler = (event) => setIsMobile(event.matches);

    setIsMobile(mql.matches);
    mql.addEventListener?.("change", handler);
    mql.addListener?.(handler);

    return () => {
      mql.removeEventListener?.("change", handler);
      mql.removeListener?.(handler);
    };
  }, []);

  return isMobile ? <MobileFooter /> : <DesktopFooter />;
};

export default Footer;
