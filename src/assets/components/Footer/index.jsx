import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700">
      <div className="container py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Newsletter / promo */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Would you like to join newsletters?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We usually post offers and challenges in newsletter. We're your
              online houseplant destination.
            </p>
            <form className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-700 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100"
              />
              <button
                type="submit"
                className="rounded-full bg-green-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
              >
                Join
              </button>
            </form>
          </div>

          {/* Link sections */}
          <div className="grid gap-8 lg:grid-cols-2 lg:col-span-3">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  My Account
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>
                    <a href="#" className="hover:text-green-600">
                      My Account
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-600">
                      Our stores
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-600">
                      Contact us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-600">
                      Career
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-600">
                      Specials
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Help & Guide
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>
                    <a href="#" className="hover:text-green-600">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-600">
                      How to Buy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-600">
                      Shipping & Delivery
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-600">
                      Product Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-600">
                      How to Return
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Categories
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>
                    <a href="#" className="hover:text-green-600">
                      House Plants
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-600">
                      Pottery Plants
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-600">
                      Seeds
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-600">
                      Small Plants
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-600">
                      Accessories
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900">Contact</h3>
                <div className="mt-4 space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-8 w-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                      <span className="text-xl">📍</span>
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">
                        70 West Buckingham Ave.
                      </p>
                      <p>Farmingdale, NY 11735</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-8 w-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                      <span className="text-xl">✉️</span>
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">
                        contact@greenshop.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-8 w-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                      <span className="text-xl">📞</span>
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">
                        +88 01911 717 490
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-3">
              <span className="h-10 w-10 rounded-full bg-green-600" />
              <span className="text-sm font-semibold text-gray-900">
                GreenShop
              </span>
            </div>
            <p className="text-sm text-gray-500">
              © 2026 GreenShop. All Rights Reserved.
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
                <span className="text-green-600">F</span>
              </span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
                <span className="text-green-600">I</span>
              </span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
                <span className="text-green-600">T</span>
              </span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200">
                <span className="text-green-600">L</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
