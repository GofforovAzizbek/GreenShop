import img1 from "../../images/image1.png";
import img2 from "../../images/image2.png";
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
    <section className="hidden md:block container mt-[90px]">
      <div className="grid justify-between gap-5 lg:grid-cols-2">
        {banners.map((banner) => (
          <div
            key={banner.title}
            className="flex items-center justify-between text-right gap-6 rounded-2xl md:flex-row-reverse"
          >
            <div className="flex-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700">
                {banner.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500">{banner.subtitle}</p>
              <button className="mt-6 inline-flex items-center justify-center rounded-md bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">
                {banner.buttonText}
                <span className="ml-2">→</span>
              </button>
            </div>

            <div className="">
              <img src={banner.image} alt={banner.title} className="" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-[120px] text-center">
        <p className="font-semibold text-[30px]">Our Blog Posts</p>
        <p className="mt-2 text-base text-gray-600">
          We are an online plant shop offering a wide range of cheap and trendy
          plants.
        </p>
      </div>

      <div className="mt-10 mb-[100px] grid gap-[30px] md:grid-cols-2 lg:grid-cols-4">
        {posts.map((post) => (
          <article
            key={post.title}
            className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="h-44 w-full overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-contain object-center transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-[20px]">
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
              <button className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700">
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
