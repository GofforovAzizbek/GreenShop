import React, { useState } from "react";
import paymentMethodsImg from "../../images/FooterPayment.svg";
import facebookIcon from "../../images/Facebook.svg";
import instagramIcon from "../../images/Instagram.svg";
import twitterIcon from "../../images/Twitter.svg";
import linkedinIcon from "../../images/Linkedin.svg";
import unionIcon from "../../images/Union.svg";

const socialLinks = [
  { label: "", href: "#", icon: facebookIcon },
  { label: "", href: "#", icon: instagramIcon },
  { label: "", href: "#", icon: twitterIcon },
  { label: "", href: "#", icon: linkedinIcon },
  { label: "", href: "#", icon: unionIcon },
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

const MobileFooter = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggle = (i) => setOpenSection(openSection === i ? null : i);

  return (
    <footer className="font-montserrat bg-white border-t border-gray-200 pb-[150px]">
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
                href={s.href}
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

export default MobileFooter;
