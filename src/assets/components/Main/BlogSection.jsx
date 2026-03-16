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

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C13.1046 2 14 2.89543 14 4V8H18C19.1046 8 20 8.89543 20 10V14C20 15.1046 19.1046 16 18 16H14V20C14 21.1046 13.1046 22 12 22C10.8954 22 10 21.1046 10 20V16H6C4.89543 16 4 15.1046 4 14V10C4 8.89543 4.89543 8 6 8H10V4C10 2.89543 10.8954 2 12 2Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-gray-900">Garden Care</h4>
          <p className="text-sm leading-relaxed text-gray-600">
            We provide easy-to-follow tips to keep your plants thriving all year
            round.
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L5 7V17C5 18.1046 5.89543 19 7 19H17C18.1046 19 19 18.1046 19 17V7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 10H15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M9 14H15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-gray-900">
            Plant Renovation
          </h4>
          <p className="text-sm leading-relaxed text-gray-600">
            Discover refresh ideas to revitalize your green space with new
            layouts and creative planters.
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 20H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 10C4 7.79086 5.79086 6 8 6H16C18.2091 6 20 7.79086 20 10V17C20 19.2091 18.2091 21 16 21H8C5.79086 21 4 19.2091 4 17V10Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 6V4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-gray-900">
            Weekend Garden
          </h4>
          <p className="text-sm leading-relaxed text-gray-600">
            Quick and simple plant projects you can finish in a weekend, without
            the fuss.
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 md:flex md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Would you like to join our newsletter?
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Get plant care tips, new arrivals, and exclusive deals delivered
            straight to your inbox.
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-3 md:mt-0 md:flex-row md:items-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="h-11 w-full rounded-full border border-gray-200 bg-white px-4 text-sm text-gray-700 shadow-sm focus:border-green-500 focus:outline-none md:w-72"
          />
          <button className="h-11 rounded-full bg-emerald-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 md:ml-4">
            Join
          </button>
        </div>
      </div>
    </section>
  );
}
