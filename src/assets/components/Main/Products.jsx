import { NavLink } from "react-router-dom";
import { useNavigationLoading } from "../../../contexts/NavigationContext";

function ProductCard({ product }) {
  const { startLoading } = useNavigationLoading();
  const discountedPrice = product.discount
    ? Math.round(product.price * (1 - product.discount / 100))
    : null;

  return (
    <NavLink
      to={`/products/${product._id}`}
      onClick={() => startLoading()}
      className={({ isActive }) =>
        `group w-full text-left rounded-2xl border bg-white transition-shadow focus:outline-none focus:ring-2 focus:ring-green-400 ${
          isActive
            ? "border-blue-500 shadow-lg"
            : "border-gray-200 hover:shadow-lg hover:border-blue-400"
        }`
      }
    >
      <div className="relative overflow-hidden rounded-t-2xl bg-white flex flex-col items-center justify-center min-h-[300px]">
        <img
          src={product.pictures?.[0]}
          alt={product.name}
          className="h-48 w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
        {/* Hover icons: only visible on hover */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="flex h-10 w-10 items-center justify-center rounded bg-white text-green-600 shadow border border-gray-200 cursor-pointer">
            {/* Cart icon */}
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path
                d="M7 18C7.552 18 8 18.448 8 19C8 19.552 7.552 20 7 20C6.448 20 6 19.552 6 19C6 18.448 6.448 18 7 18ZM17 18C17.552 18 18 18.448 18 19C18 19.552 17.552 20 17 20C16.448 20 16 19.552 16 19C16 18.448 16.448 18 17 18ZM5 6H6.5L7.68 12.39C7.76 12.791 8.013 13.13 8.37 13.349C8.728 13.567 9.165 13.648 9.586 13.576L18.24 12.16C18.543 12.108 18.82 11.948 19.014 11.709C19.207 11.47 19.304 11.166 19.28 10.86L18.8 7.48C18.714 6.889 18.211 6.417 17.615 6.35L6.78 4.5C6.525 4.459 6.264 4.501 6.035 4.619C5.806 4.738 5.626 4.928 5.521 5.16L5 6Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded bg-white text-green-600 shadow border border-gray-200 cursor-pointer">
            {/* Heart icon */}
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path
                d="M20.84 4.61C20.329 4.109 19.723 3.693 19.055 3.384C18.386 3.076 17.668 2.879 16.94 2.8C15.713 2.647 14.447 3.054 13.58 3.92L12 5.5L10.42 3.92C9.553 3.054 8.287 2.647 7.06 2.8C6.332 2.879 5.614 3.076 4.946 3.384C4.277 3.693 3.671 4.109 3.16 4.61C1.87 5.9 1.87 8.03 3.16 9.32L12 18.16L20.84 9.32C22.13 8.03 22.13 5.9 20.84 4.61Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded bg-white text-green-600 shadow border border-gray-200 cursor-pointer">
            {/* Search icon */}
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path
                d="M21 21L15 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 18C13.314 18 16 15.314 16 12C16 8.686 13.314 6 10 6C6.686 6 4 8.686 4 12C4 15.314 6.686 18 10 18Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col items-start">
        <h3 className="text-base font-normal text-gray-900 mb-2">
          {product.name}
        </h3>
        <span className="text-lg font-bold text-green-600">
          ${discountedPrice ?? product.price}.00
        </span>
      </div>
    </NavLink>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-200 bg-white">
      <div className="h-48 w-full rounded-t-2xl bg-gray-200" />
      <div className="p-4">
        <div className="h-4 w-1/2 rounded bg-gray-200" />
        <div className="mt-2 h-3 w-1/3 rounded bg-gray-200" />
        <div className="mt-4 flex items-center justify-between">
          <div className="h-4 w-1/4 rounded bg-gray-200" />
          <div className="h-4 w-1/5 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default function Products({ products, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-sm font-medium text-red-600">
        {error}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="py-20 text-center text-sm font-medium text-gray-500">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
