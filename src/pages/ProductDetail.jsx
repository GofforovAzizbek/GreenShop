import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../services/api";
import facebookIcon from "../assets/images/Facebook.svg";
// import instagramIcon from "../assets/images/Instagram.svg";
import twitterIcon from "../assets/images/Twitter.svg";
import linkedinIcon from "../assets/images/Linkedin.svg";
import emailIcon from "../assets/images/Message.svg";

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
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    const productRequest = api.get(`/products/${id}`);
    const reviewsRequest = api.get("/reviews", { params: { productId: id } });

    Promise.all([productRequest, reviewsRequest])
      .then(([productRes, reviewsRes]) => {
        const fetchedProduct =
          productRes.data.product ??
          productRes.data.products?.[0] ??
          productRes.data ??
          productRes.data?.data?.[0] ??
          null;

        if (!fetchedProduct) {
          throw new Error("Product not found");
        }

        setProduct(fetchedProduct);
        setSelectedImage(fetchedProduct.pictures?.[0] ?? null);
        setSelectedSize(fetchedProduct.size ?? null);
        setQuantity(1);
        setLikeCount(fetchedProduct.likes ?? 0);

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

  const unitPrice = discountedPrice ?? product?.price ?? 0;
  const totalPrice = unitPrice * quantity;

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

      <div className="grid gap-8 lg:grid-cols-[80px_1fr_1fr]">
        {/* Thumbnails */}
        <div className="hidden lg:flex flex-col gap-3">
          {product.pictures?.map((src) => {
            const isActive = src === selectedImage;
            return (
              <button
                key={src}
                type="button"
                onClick={() => setSelectedImage(src)}
                className={`rounded-xl border p-1 transition ${
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

        {/* Main image */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <img
            src={selectedImage}
            alt={product.name}
            className="mx-auto h-[420px] w-full object-contain"
          />
        </div>

        {/* Product info */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {product.name}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-4">
                  <div className="text-2xl font-semibold text-green-600">
                    ${totalPrice.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    (${unitPrice.toLocaleString()} each)
                  </div>
                  {product.discount ? (
                    <div className="text-sm text-gray-500 line-through">
                      ${product.price.toLocaleString()}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Stars value={reviewStats.average} />
                <span className="font-medium">
                  {reviewStats.count} Customer Review
                  {reviewStats.count === 1 ? "" : "s"}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold text-gray-700">Size:</div>
              <div className="mt-2 flex items-center gap-2">
                {["S", "M", "L", "XL"].map((size) => {
                  const isActive = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`h-9 w-9 rounded-full border text-sm font-semibold transition ${
                        isActive
                          ? "border-green-600 bg-green-50 text-green-700"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="h-10 w-10 rounded-full border border-gray-200 text-xl font-semibold text-gray-600 transition hover:bg-gray-100"
                >
                  −
                </button>
                <div className="w-10 text-center text-sm font-semibold text-gray-800">
                  {quantity}
                </div>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="h-10 w-10 rounded-full border border-gray-200 text-xl font-semibold text-gray-600 transition hover:bg-gray-100"
                >
                  +
                </button>
              </div>

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
                onClick={() => {
                  setLiked((prev) => {
                    const next = !prev;
                    setLikeCount((count) => count + (next ? 1 : -1));
                    return next;
                  });
                }}
                className={`rounded-full border p-2 transition ${
                  liked
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-gray-200 text-gray-600 hover:bg-gray-100"
                }`}
                aria-pressed={liked}
              >
                ♥
              </button>
              <span className="text-sm font-medium text-gray-600">
                {likeCount}
              </span>
            </div>

            <div className="mt-6 space-y-1 text-sm text-gray-600">
              <div>
                <span className="font-semibold text-gray-700">SKU:</span>{" "}
                {product._id}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Categories:</span>{" "}
                {product.category}
              </div>
              {product.tags ? (
                <div>
                  <span className="font-semibold text-gray-700">Tags:</span>{" "}
                  {Array.isArray(product.tags)
                    ? product.tags.join(", ")
                    : product.tags}
                </div>
              ) : null}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <span className="font-semibold text-gray-700">
                Share this product:
              </span>
              <div className="flex items-center gap-2">
                {[
                  { icon: facebookIcon, href: "#", label: "Facebook" },
                  { icon: twitterIcon, href: "#", label: "Twitter" },
                  { icon: linkedinIcon, href: "#", label: "LinkedIn" },
                  { icon: emailIcon, href: "#", label: "Email" },
                ].map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    aria-label={link.label}
                    className="h-9 w-9 rounded border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 transition"
                  >
                    <img src={link.icon} alt={link.label} className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Description + Reviews */}
      <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex flex-wrap items-center gap-4 border-b border-gray-200 pb-3">
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
            <div className="space-y-6 text-sm leading-relaxed text-gray-600">
              <p>{product.description || "No description available."}</p>
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Living Room
                </h3>
                <p>
                  The ceramic cylinder planters come with a wooden stand to help
                  elevate your plants off the ground. The ceramic cylinder
                  planters come with a wooden stand to help elevate your plants
                  off the ground.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Dining Room
                </h3>
                <p>
                  The benefits of houseplants are endless. In addition to
                  cleaning the air of harmful toxins, they can help to improve
                  your mood, reduce stress and provide you with better sleep.
                </p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Office
                </h3>
                <p>
                  The ceramic cylinder planters come with a wooden stand to help
                  elevate your plants off the ground. The ceramic cylinder
                  planters come with a wooden stand to help elevate your plants
                  off the ground.
                </p>
              </div>
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
                    className="rounded-xl border border-gray-200 bg-gray-50 p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          {review.reviewerName || "Anonymous"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(
                            review.createdAt || review.date || Date.now(),
                          ).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Stars value={review.stars ?? 0} />
                        <span className="text-xs">{review.stars ?? 0}/5</span>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-600">
                      {review.comment}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
