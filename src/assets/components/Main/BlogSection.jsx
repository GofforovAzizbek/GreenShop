import img1 from "../../images/img1.png";
import img2 from "../../images/img2.png";
import bannerpicture from "../../images/bannerpicture.png";

const banners = [
  {
    title: "SUMMER CACTUS & SUCCULENTS",
    subtitle:
      "We are an online plant shop offering a wide range of cheap and trendy plants.",
    buttonText: "Find More",
    image: img2,
  },
  {
    title: "STYLING TRENDS & MUCH MORE",
    subtitle:
      "We are an online plant shop offering a wide range of cheap and trendy plants.",
    buttonText: "Find More",
    image: img1,
  },
];

const posts = [
  {
    date: "September 12",
    readTime: "Read in 6 minutes",
    title: "Cactus & Succulent Care Tips",
    description:
      "Cacti are succulents are easy care plants for any home or patio.",
    image: img2,
  },
  {
    date: "September 13",
    readTime: "Read in 2 minutes",
    title: "Top 10 Succulents for Your Home",
    description: "Best in hanging baskets. Prefers medium to high light.",
    image: img1,
  },
  {
    date: "September 15",
    readTime: "Read in 3 minutes",
    title: "Cacti & Succulent Care Tips",
    description:
      "Cacti and succulents thrive in containers and because most are...",
    image: bannerpicture,
  },
  {
    date: "September 15",
    readTime: "Read in 2 minutes",
    title: "Best Houseplants Room By Room",
    description: "The benefits of houseplants are endless. In addition to...",
    image: img1,
  },
];

export default function BlogSection() {
  return (
    <section className="container mt-14">
      <div className="grid gap-6 lg:grid-cols-2">
        {banners.map((banner) => (
          <div
            key={banner.title}
            className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:flex-row"
          >
            <div className="flex-1">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700">
                {banner.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {banner.subtitle}
              </p>
              <button className="mt-6 inline-flex items-center justify-center rounded-md bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">
                {banner.buttonText}
                <span className="ml-2">→</span>
              </button>
            </div>

            <div className="h-[210px] w-full max-w-[240px] overflow-hidden rounded-2xl bg-gray-50">
              <img
                src={banner.image}
                alt={banner.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
          Our Blog Posts
        </p>
        <p className="mt-2 text-base text-gray-600">
          We are an online plant shop offering a wide range of cheap and trendy
          plants.
        </p>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {posts.map((post) => (
          <article
            key={post.title}
            className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="h-44 w-full overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6">
              <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-600">
                <span>{post.date}</span>
                <span className="h-1 w-1 rounded-full bg-emerald-600" />
                <span>{post.readTime}</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">
                {post.title}
              </h4>
              <p className="flex-1 text-sm leading-relaxed text-gray-600">
                {post.description}
              </p>
              <button className="mt-4 inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                Read More
                <span className="ml-2">→</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
