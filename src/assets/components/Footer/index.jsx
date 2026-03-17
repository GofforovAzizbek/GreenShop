import React, { useState } from "react";
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

const socialLinks = [
  { icon: facebookIcon, label: "Facebook" },
  { icon: instagramIcon, label: "Instagram" },
  { icon: twitterIcon, label: "Twitter" },
  { icon: linkedinIcon, label: "LinkedIn" },
  { icon: unionIcon, label: "Other" },
];

const DesktopFooter = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="hidden md:block">
      {/* Contact / Newsletter strip */}
      <div className="bg-white border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-8 py-12">
          <div className="grid grid-cols-4 gap-10">
            {/* Categories */}
            {categories.map((cat, i) => (
              <div key={i} className="flex items-start gap-4">
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

            {/* Newsletter */}
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-sm text-gray-800">
                Would you like to join newsletters?
              </h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter your email address..."
                  className="flex-1 border border-gray-200 rounded px-3 py-2 text-xs text-gray-500 outline-none focus:border-[#46A358] transition-colors"
                />
                <button
                  onClick={() => setEmail("")}
                  className="bg-[#46A358] hover:bg-[#3d9450] text-white text-xs font-semibold px-4 py-2 rounded transition-colors whitespace-nowrap"
                >
                  Join
                </button>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                We usually post offers and challenges in newsletter. We're your
                online houseplant destination.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-[#f0faf2]">
        <div className="max-w-[1200px] mx-auto px-8 py-10">
          <div className="grid grid-cols-5 gap-10">
            {/* Brand */}
            <div className="col-span-2 flex flex-col gap-4">
              <img src={logoIcon} alt="GreenShop" className="h-8 w-fit" />
              <div className="flex flex-col gap-2.5 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <img
                    src={locationIcon}
                    alt=""
                    className="w-4 h-4 mt-0.5 shrink-0"
                  />
                  <span>70 West Buckingham Ave. Farmingdale, NY 11735</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={emailIcon} alt="" className="w-4 h-4 shrink-0" />
                  <span>contact@greenshop.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={phoneIcon} alt="" className="w-4 h-4 shrink-0" />
                  <span>+88 01911 717 490</span>
                </div>
              </div>
            </div>

            {/* Links */}
            {footerLinks.map((section, i) => (
              <div key={i}>
                <h4 className="font-bold text-sm text-gray-800 mb-4">
                  {section.title}
                </h4>
                <ul className="flex flex-col gap-2">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href="#"
                        className="text-sm text-gray-500 hover:text-[#46A358] transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social + Payments */}
          <div className="border-t border-gray-200 mt-10 pt-6 flex items-center justify-between">
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-sm text-gray-800">Social Media</h4>
              <div className="flex items-center gap-2">
                {socialLinks.map((s, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded border border-gray-200 bg-white flex items-center justify-center hover:border-[#46A358] hover:bg-[#f0faf2] transition-colors"
                  >
                    <img src={s.icon} alt={s.label} className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 items-end">
              <h4 className="font-bold text-sm text-gray-800">We accept</h4>
              <img
                src={paymentMethodsImg}
                alt="Payment methods"
                className="h-8 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-white border-t border-gray-100 py-4">
        <p className="text-xs text-gray-400 text-center">
          © 2021 GreenShop. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default DesktopFooter;
