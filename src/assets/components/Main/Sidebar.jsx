import React, { useState } from "react";

const demoCategories = [
  { name: "House Plants", count: 33 },
  { name: "Potter Plants", count: 12 },
  { name: "Seeds", count: 65 },
  { name: "Small Plants", count: 39 },
  { name: "Big Plants", count: 23 },
  { name: "Succulents", count: 17 },
  { name: "Trerrariums", count: 19 },
  { name: "Gardening", count: 13 },
  { name: "Accessories", count: 18 },
];
const demoSizes = [
  { name: "Small", count: 119 },
  { name: "Medium", count: 86 },
  { name: "Large", count: 78 },
];
const minPrice = 39;
const maxPrice = 1230;

export default function Sidebar() {
  const [selectedCategory, setSelectedCategory] = useState("House Plants");
  const [selectedSize, setSelectedSize] = useState(null);
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  return (
    <aside className="w-full lg:w-[240px] max-w-[240px] p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Categories</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          {demoCategories.map((cat) => (
            <li key={cat.name}>
              <button
                type="button"
                className="w-full flex justify-between items-center px-3 py-2 focus:outline-none"
                onClick={() => setSelectedCategory(cat.name)}
              >
                <span
                  className={`font-semibold ${selectedCategory === cat.name ? "text-green-700" : "text-gray-800"}`}
                >
                  {cat.name}
                </span>
                <span
                  className={`font-semibold ${selectedCategory === cat.name ? "text-green-600" : "text-gray-800"}`}
                >
                  ({cat.count})
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Price Range</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-gray-800">Price:</span>
            <span className="font-semibold">
              <span className="text-green-700">${priceRange[0]}</span> –{" "}
              <span className="text-green-700">${priceRange[1]}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceRange[0]}
              onChange={(e) => {
                const val = Number(e.target.value);
                setPriceRange([val, Math.max(val, priceRange[1])]);
              }}
              className="w-1/2 accent-green-600"
              style={{ accentColor: "#219653" }}
            />
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceRange[1]}
              onChange={(e) => {
                const val = Number(e.target.value);
                setPriceRange([Math.min(val, priceRange[0]), val]);
              }}
              className="w-1/2 accent-green-600"
              style={{ accentColor: "#219653" }}
            />
          </div>
          <button
            type="button"
            className="w-full rounded-lg bg-green-600 px-4 py-2 text-base font-semibold text-white hover:bg-green-700"
          >
            Filter
          </button>
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Size</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          {demoSizes.map((sz) => (
            <li key={sz.name}>
              <button
                type="button"
                className="w-full flex justify-between items-center px-3 py-2 focus:outline-none"
                onClick={() => setSelectedSize(sz.name)}
              >
                <span
                  className={`font-semibold ${selectedSize === sz.name ? "text-green-700" : "text-gray-800"}`}
                >
                  {sz.name}
                </span>
                <span
                  className={`font-semibold ${selectedSize === sz.name ? "text-green-600" : "text-gray-800"}`}
                >
                  ({sz.count})
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 mt-2"
        onClick={() => {
          setSelectedCategory("House Plants");
          setSelectedSize(null);
          setPriceRange([minPrice, maxPrice]);
        }}
      >
        Reset filters
      </button>

      {/* Banner */}
      <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 text-center">
        <p className="text-2xl font-bold text-green-600">Super Sale</p>
        <p className="text-sm text-gray-500">UP TO 75% OFF</p>
        {/* Banner image can be added here if needed */}
      </div>
    </aside>
  );
}
