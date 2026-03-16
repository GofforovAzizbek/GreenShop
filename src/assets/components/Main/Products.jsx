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
      <div className="relative overflow-hidden rounded-t-2xl bg-gray-50">
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/0 opacity-0 transition duration-200 group-hover:bg-black/30 group-hover:opacity-100">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-green-600 shadow">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 18C7.55228 18 8 18.4477 8 19C8 19.5523 7.55228 20 7 20C6.44772 20 6 19.5523 6 19C6 18.4477 6.44772 18 7 18Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 18C17.5523 18 18 18.4477 18 19C18 19.5523 17.5523 20 17 20C16.4477 20 16 19.5523 16 19C16 18.4477 16.4477 18 17 18Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 6H6.5L7.68 12.39C7.7596 12.7911 8.01279 13.1302 8.37016 13.3487C8.72753 13.5672 9.16477 13.6477 9.586 13.576L18.24 12.16C18.5434 12.1083 18.8203 11.9483 19.0135 11.7093C19.2067 11.4703 19.3036 11.1661 19.28 10.86L18.8 7.48C18.7144 6.88866 18.2106 6.41672 17.615 6.35L6.78 4.5C6.52478 4.45946 6.26404 4.50091 6.03509 4.61939C5.80615 4.73787 5.62576 4.92839 5.521 5.16L5 6Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-green-600 shadow">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.84 4.61C20.3292 4.1092 19.7228 3.69335 19.0545 3.38448C18.3862 3.0756 17.6683 2.87859 16.94 2.8C15.713 2.6473 14.4469 3.05409 13.58 3.92L12 5.5L10.42 3.92C9.55315 3.05409 8.28704 2.6473 7.06 2.8C6.33171 2.87859 5.61386 3.0756 4.94552 3.38448C4.27719 3.69335 3.67081 4.1092 3.16 4.61C1.87 5.9 1.87 8.03 3.16 9.32L12 18.16L20.84 9.32C22.13 8.03 22.13 5.9 20.84 4.61Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-green-600 shadow">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21L15 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 18C13.3137 18 16 15.3137 16 12C16 8.68629 13.3137 6 10 6C6.68629 6 4 8.68629 4 12C4 15.3137 6.68629 18 10 18Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <img
          src={product.pictures?.[0]}
          alt={product.name}
          className="h-48 w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-gray-500">{product.category}</p>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <span className="text-lg font-semibold text-gray-900">
              ${discountedPrice ?? product.price}
            </span>
          </div>
          <span className="text-xs text-gray-500">Size: {product.size}</span>
        </div>
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
