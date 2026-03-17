import { useEffect, useMemo, useState } from "react";
import { api } from "../../../services/api";
import Hero from "./Hero";
import BlogSection from "./BlogSection";
import ResponsiveSidebar from "./ResponsiveSidebar";
import Products from "./Products";
import Pagination from "./Pagination";

function Main({ showHero = true }) {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [categories, setCategories] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [sizes, setSizes] = useState([]);
  const [sizeCounts, setSizeCounts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSize, setSelectedSize] = useState("All");
  const [activeTab, setActiveTab] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [appliedPriceRange, setAppliedPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState("default");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const totalPages = Math.max(1, Math.ceil(count / limit));

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedSize("All");
    setActiveTab("all");
    setPriceRange([0, 2000]);
    setAppliedPriceRange([0, 2000]);
    setSortBy("default");
    setSearch("");
    setPage(1);
    setIsFiltersOpen(false);
  };

  const applyFilters = () => {
    setAppliedPriceRange(priceRange);
    setPage(1);
    setIsFiltersOpen(false);
  };

  const handleMaxPriceChange = (range) => {
    setPriceRange(range);
    setAppliedPriceRange(range);
    setPage(1);
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/products", {
        params: { page: 1, limit: 100 },
      });
      const productsAll = response.data.products || [];
      setAllProducts(productsAll);

      const uniqueCategories = [...new Set(productsAll.map((p) => p.category))];
      setCategories(uniqueCategories);

      const categoryCount = productsAll.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      }, {});
      setCategoryCounts(categoryCount);

      const uniqueSizes = [...new Set(productsAll.map((p) => p.size))];
      setSizes(uniqueSizes);

      const sizeCount = productsAll.reduce((acc, product) => {
        acc[product.size] = (acc[product.size] || 0) + 1;
        return acc;
      }, {});
      setSizeCounts(sizeCount);
    } catch {
      // ignore category fetching errors
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = { page, limit };
      if (selectedCategory !== "All") params.category = selectedCategory;
      if (selectedSize !== "All") params.size = selectedSize;

      const response = await api.get("/products", { params });
      setProducts(response.data.products || []);
      setCount(response.data.count || 0);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page, selectedCategory]);

  const filteredProducts = useMemo(() => {
    const getEffectivePrice = (product) =>
      product.discount
        ? Math.round(product.price * (1 - product.discount / 100))
        : product.price;

    let list = products;

    if (activeTab === "sale") {
      list = list.filter((p) => p.discount && p.discount > 0);
    }

    if (search) {
      const lower = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(lower));
    }

    list = list.filter((p) => {
      const price = getEffectivePrice(p);
      return price >= appliedPriceRange[0] && price <= appliedPriceRange[1];
    });

    if (sortBy === "priceAsc") {
      list = [...list].sort(
        (a, b) => getEffectivePrice(a) - getEffectivePrice(b),
      );
    }

    if (sortBy === "priceDesc") {
      list = [...list].sort(
        (a, b) => getEffectivePrice(b) - getEffectivePrice(a),
      );
    }

    if (sortBy === "nameAsc") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [products, activeTab, search, appliedPriceRange, sortBy]);

  return (
    <main className="min-h-screen pt-24 pb-24 lg:pt-0 lg:pb-0">
      {showHero && <Hero />}

      <div className="container mt-10 mb-14">
        <div className="flex flex-col lg:flex-row gap-8">
          <ResponsiveSidebar
            isOpen={isFiltersOpen}
            onOpen={() => setIsFiltersOpen(true)}
            onClose={() => setIsFiltersOpen(false)}
            categories={categories}
            categoryCounts={categoryCounts}
            selectedCategory={selectedCategory}
            onCategoryChange={(value) => {
              setSelectedCategory(value);
              setPage(1);
            }}
            sizes={sizes}
            sizeCounts={sizeCounts}
            selectedSize={selectedSize}
            onSizeChange={(value) => {
              setSelectedSize(value);
              setPage(1);
            }}
            priceRange={priceRange}
            onPriceRangeChange={handleMaxPriceChange}
            onApplyFilters={applyFilters}
            onResetFilters={resetFilters}
          />

          <div className="flex-1">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-8.75 text-sm text-gray-600">
                {[
                  { key: "all", label: "All Plants" },
                  { key: "new", label: "New Arrivals" },
                  { key: "sale", label: "Sale" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.key);
                      setPage(1);
                    }}
                    className={`transition ${
                      activeTab === tab.key
                        ? "text-green-600 border-b-2 pb-1.25"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="border-none"
                >
                  <option value="default">Short by: Default sorting</option>
                  <option value="priceAsc">Sort by: birbala</option>
                  <option value="priceDesc">Sort by: yoqlari</option>
                  <option value="nameAsc">Sort by: Name</option>
                </select>
              </div>
            </div>

            <Products
              products={filteredProducts}
              isLoading={loading}
              error={error}
            />

            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={setPage}
            />
          </div>
        </div>
      </div>

      <BlogSection />
    </main>
  );
}

export default Main;
