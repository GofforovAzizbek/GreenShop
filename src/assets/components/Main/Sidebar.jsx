import React from "react";
import bannerpicture from "../../images/bannerpicture.png";

export default function Sidebar({
  categories,
  categoryCounts,
  selectedCategory,
  onCategoryChange,
  sizes,
  sizeCounts,
  selectedSize,
  onSizeChange,
  priceRange,
  onPriceRangeChange,
  onResetFilters,
  onApplyFilters,
  className = "",
}) {
  const [, maxPrice] = priceRange;

  return (
    <aside
      className={`w-full lg:w-[240px] max-w-[240px] p-6 bg-white border border-gray-200 rounded-2xl shadow-sm ${className}`}
    >
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Categories</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>
            <button
              type="button"
              className={`w-full text-left px-3 py-2 rounded-lg transition ${
                selectedCategory === "All"
                  ? "bg-green-50 text-green-700"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => onCategoryChange("All")}
            >
              <span>All Plants</span>
              <span className="ml-auto text-xs text-gray-400">
                (
                {Object.values(categoryCounts || {}).reduce(
                  (sum, value) => sum + (value || 0),
                  0,
                )}
                )
              </span>
            </button>
          </li>
          {categories.map((category) => (
            <li key={category}>
              <button
                type="button"
                className={`w-full text-left px-3 py-2 rounded-lg transition ${
                  selectedCategory === category
                    ? "bg-green-50 text-green-700"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => onCategoryChange(category)}
              >
                <span>{category}</span>
                <span className="ml-auto text-xs text-gray-400">
                  ({categoryCounts[category] ?? 0})
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Price range
        </h2>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>$0</span>
            <span>${maxPrice}</span>
          </div>
          <input
            type="range"
            min="0"
            max="2000"
            value={maxPrice}
            onChange={(e) => {
              const newMax = Number(e.target.value);
              onPriceRangeChange(newMax);
            }}
            className="w-full h-2 appearance-none rounded-full bg-gray-200 accent-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="button"
            onClick={onApplyFilters}
            className="w-full rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Filter
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Size</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          {sizes.map((size) => (
            <li key={size}>
              <button
                type="button"
                className={`w-full text-left px-3 py-2 rounded-lg transition ${
                  selectedSize === size
                    ? "bg-green-50 text-green-700"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => onSizeChange(size)}
              >
                <span>{size}</span>
                <span className="ml-auto text-xs text-gray-400">
                  ({sizeCounts?.[size] ?? 0})
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={onResetFilters}
        className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-xl hover:bg-green-700"
      >
        Reset filters
      </button>

      <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 text-center">
        <p className="text-2xl font-bold text-green-600">Super Sale</p>
        <p className="text-sm text-gray-500">UP TO 75% OFF</p>
        <img
          src={bannerpicture}
          alt="Sale"
          className="mx-auto mt-6 h-40 w-40 object-contain"
        />
      </div>
    </aside>
  );
}
