import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../services/api";

function Stars({ value, max = 5 }) {
  const fullStars = Math.floor(value);
  const hasHalf = value - fullStars >= 0.5;
  const emptyStars = max - fullStars - (hasHalf ? 1 : 0);

  return (
    <span className="flex items-center gap-1 text-yellow-500">
      {Array.from({ length: fullStars }).map((_, idx) => (
        <span key={`full-${idx}`} className="text-base">
          ★
        </span>
      ))}
      {hasHalf ? <span className="text-base">☆</span> : null}
      {Array.from({ length: emptyStars }).map((_, idx) => (
        <span key={`empty-${idx}`} className="text-base text-gray-300">
          ★
        </span>
      ))}
    </span>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    const productRequest = api.get("/products", { params: { id } });
    const reviewsRequest = api.get("/reviews");

    Promise.all([productRequest, reviewsRequest])
      .then(([productRes, reviewsRes]) => {
        const fetchedProduct = productRes.data.products?.[0] ?? null;
        if (!fetchedProduct) {
          throw new Error("Product not found");
        }

        setProduct(fetchedProduct);
        setSelectedImage(fetchedProduct.pictures?.[0] ?? null);

        const allReviews = Array.isArray(reviewsRes.data.reviews)
          ? reviewsRes.data.reviews
          : [];

        const productReviews = allReviews.filter((review) => {
          if (!review.productId) return false;
          if (typeof review.productId === "string") {
            return review.productId === fetchedProduct._id;
          }

          // productId might be an object with _id
          return review.productId?._id === fetchedProduct._id;
        });

        setReviews(productReviews);
      })
      .catch((err) => {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load product",
        );
      })
      .finally(() => setLoading(false));
  }, [id]);

  const reviewStats = useMemo(() => {
    if (!reviews.length) return { count: 0, average: 0 };
    const total = reviews.reduce((sum, r) => sum + (r.stars ?? 0), 0);
    return { count: reviews.length, average: total / reviews.length };
  }, [reviews]);

  const discountedPrice = product?.discount
    ? Math.round(product.price * (1 - product.discount / 100))
    : null;

  if (loading) {
    return (
      <main className="container py-14">
        <div className="text-center text-lg text-gray-600">
          Loading product…
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container py-14">
        <div className="text-center text-red-600">{error}</div>
        <div className="mt-6 text-center">
          <Link to="/shop" className="text-green-600 hover:underline">
            Back to shop
          </Link>
        </div>
      </main>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <main className="container py-14">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="text-sm text-gray-500">
          <Link className="hover:underline" to="/">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link className="hover:underline" to="/shop">
            Shop
          </Link>
        </div>
        <Link
          to="/shop"
          className="text-sm font-medium text-green-600 hover:text-green-700"
        >
          &larr; Back to shop
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-start gap-3 overflow-x-auto pb-1">
            {product.pictures?.map((src) => {
              const isActive = src === selectedImage;
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setSelectedImage(src)}
                  className={`shrink-0 rounded-xl border p-1 transition ${
                    isActive
                      ? "border-green-600 shadow-lg"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={src}
                    alt={product.name}
                    className="h-16 w-16 object-contain"
                  />
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <img
              src={selectedImage}
              alt={product.name}
              className="mx-auto h-[320px] w-full max-w-[420px] object-contain"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {product.name}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Stars value={reviewStats.average} />
                    <span className="text-xs text-gray-500">
                      ({reviewStats.count} customer review
                      {reviewStats.count === 1 ? "" : "s"})
                    </span>
                  </div>
                  <span className="h-1 w-1 rounded-full bg-gray-300" />
                  <span className="font-medium">
                    SKU: {product._id.substring(0, 8)}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-semibold text-gray-900">
                  ${discountedPrice ?? product.price}
                </div>
                {product.discount ? (
                  <div className="text-sm text-gray-500 line-through">
                    ${product.price}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-gray-500">Category</p>
                <p className="text-sm text-gray-700">{product.category}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">Size</p>
                <p className="text-sm text-gray-700">{product.size}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
              >
                Buy Now
              </button>
              <button
                type="button"
                className="rounded-full border border-green-600 px-5 py-2 text-sm font-semibold text-green-600 transition hover:bg-green-50"
              >
                Add to Cart
              </button>
              <button
                type="button"
                className="rounded-full border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100"
              >
                ♥
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex gap-4 border-b border-gray-200 pb-3">
              <button
                type="button"
                onClick={() => setActiveTab("description")}
                className={`text-sm font-semibold transition ${
                  activeTab === "description"
                    ? "text-green-600 border-b-2 border-green-600 pb-2"
                    : "text-gray-600 hover:text-green-600"
                }`}
              >
                Product Description
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("reviews")}
                className={`text-sm font-semibold transition ${
                  activeTab === "reviews"
                    ? "text-green-600 border-b-2 border-green-600 pb-2"
                    : "text-gray-600 hover:text-green-600"
                }`}
              >
                Reviews ({reviewStats.count})
              </button>
            </div>

            <div className="mt-6">
              {activeTab === "description" ? (
                <div className="text-sm leading-relaxed text-gray-600">
                  {product.description || "No description available."}
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.length === 0 ? (
                    <div className="text-sm text-gray-600">
                      No reviews yet. Be the first to add one!
                    </div>
                  ) : (
                    reviews.map((review) => (
                      <div
                        key={review._id}
                        className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-semibold text-gray-900">
                            {review.reviewerName || "Anonymous"}
                          </div>
                          <div className="text-sm text-gray-500">
                            <Stars value={review.stars ?? 0} />
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                          {review.comment}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
