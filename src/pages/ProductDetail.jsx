import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../services/api";
import facebookIcon from "../assets/images/Facebook.svg";
// import instagramIcon from "../assets/images/Instagram.svg";
import twitterIcon from "../assets/images/Twitter.svg";
import linkedinIcon from "../assets/images/Linkedin.svg";
import emailIcon from "../assets/images/Message.svg";
import likebtn from "../assets/images/likebtn.svg";

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
  const [relatedProducts, setRelatedProducts] = useState([]);
  const relatedSliderRef = useRef(null);
  const [activeRelatedPage, setActiveRelatedPage] = useState(0);

  const RELATED_ITEMS_PER_PAGE = 8;

  const scrollRelated = (dir) => {
    if (!relatedSliderRef.current) return;

    const slider = relatedSliderRef.current;
    const item = slider.querySelector("a");
    const itemWidth = item ? item.clientWidth + 16 : slider.clientWidth * 0.8;

    const nextPage = Math.max(
      0,
      Math.min(
        Math.ceil(relatedProducts.length / RELATED_ITEMS_PER_PAGE) - 1,
        activeRelatedPage + dir,
      ),
    );

    setActiveRelatedPage(nextPage);
    slider.scrollTo({
      left: nextPage * RELATED_ITEMS_PER_PAGE * itemWidth,
      behavior: "smooth",
    });
  };

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

        // Load related products (simple heuristic: grab a few other items)
        api
          .get("/products", { params: { limit: 10 } })
          .then((res) => {
            const allProducts = res.data.products || res.data || [];
            const related = allProducts.filter(
              (p) => p._id !== fetchedProduct._id,
            );
            // Ensure at least 5 cards remain visible by repeating products if needed
            const minItems = 5;
            let padded = [...related];
            while (padded.length < minItems && padded.length > 0) {
              padded = [...padded, ...related];
            }
            setRelatedProducts(padded.slice(0, Math.max(minItems, 10)));
            setActiveRelatedPage(0);
          })
          .catch(() => {
            // ignore related products failure
          });
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

  useEffect(() => {
    if (!relatedSliderRef.current) return;

    const slider = relatedSliderRef.current;

    const handleScroll = () => {
      const item = slider.querySelector("a");
      if (!item) return;

      const itemWidth = item.clientWidth + 16; // 16px gap
      const maxPage = Math.max(
        0,
        Math.ceil(relatedProducts.length / RELATED_ITEMS_PER_PAGE) - 1,
      );
      const currentPage = Math.min(
        maxPage,
        Math.round(slider.scrollLeft / (itemWidth * RELATED_ITEMS_PER_PAGE)),
      );

      setActiveRelatedPage(currentPage);
    };

    slider.addEventListener("scroll", handleScroll, { passive: true });

    return () => slider.removeEventListener("scroll", handleScroll);
  }, [relatedProducts]);

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

  const relatedPageCount = Math.max(
    1,
    Math.ceil(relatedProducts.length / RELATED_ITEMS_PER_PAGE),
  );

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
                className="rounded-[6px] bg-green-600 py-[10px] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
              >
                Buy Now
              </button>
              <button
                type="button"
                className="rounded-[6px] border border-green-600 px-5 py-[10px] text-sm font-semibold text-green-600 transition hover:bg-green-50"
              >
                Add to Cart
              </button>
              <button className="transition">
                <img src={likebtn} alt="" className="" />
              </button>
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

      {/* Related products slider */}
      {relatedProducts.length > 0 && (
        <section className="mt-14">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Related Products
            </h2>
          </div>

          <div className="overflow-hidden">
            <div
              ref={relatedSliderRef}
              className="flex gap-4 transition-transform duration-500"
              style={{ transform: `translateX(-${activeRelatedPage * 100}%)` }}
            >
              {relatedProducts.map((rp) => (
                <Link
                  to={`/products/${rp._id}`}
                  key={rp._id}
                  className="flex-none w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
                >
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="h-40 w-full overflow-hidden bg-white">
                      <img
                        src={rp.pictures?.[0]}
                        alt={rp.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-4">
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                        {rp.name}
                      </h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-semibold text-green-600">
                          $
                          {(rp.discount
                            ? Math.round(rp.price * (1 - rp.discount / 100))
                            : rp.price
                          ).toLocaleString()}
                        </span>
                        {rp.discount ? (
                          <span className="text-xs text-gray-400 line-through">
                            ${rp.price.toLocaleString()}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {relatedPageCount > 1 ? (
            <div className="mt-4 flex justify-center gap-2">
              {Array.from({ length: relatedPageCount }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveRelatedPage(idx)}
                  className={`h-2 w-2 rounded-full transition ${
                    idx === activeRelatedPage
                      ? "bg-green-600"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          ) : null}
        </section>
      )}
    </main>
  );
}
