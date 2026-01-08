import Logo from '/android-chrome-512x512.png';

function AboutScreen() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center pt-20 pb-10 px-10 sm:px-16 bg-amber-50">
      <div className="flex flex-row justify-center items-center">
        <img
          src={Logo}
          alt="Pizza Delight Logo"
          className="hidden sm:block h-32 w-32"
        />
        <h1 className="text-4xl lg:text-5xl text-green-600 font-semibold mt-4">
          <span className="text-green-600">About</span>
          <br /> Pizza Delight
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <article className="mb-6">
          <h2 className="text-2xl text-black font-semibold mb-3">
            Welcome to Pizza Delight
          </h2>
          <blockquote className="text-gray-700 text-lg italic border-l-4 border-green-600 pl-4 mb-3">
            "Every slice tells a story of passion, quality, and joy."
          </blockquote>
          <p className="text-gray-800 text-base leading-relaxed">
            At Pizza Delight, we craft more than pizzas – we create moments of happiness. From our kitchen to your table, every order is made with fresh ingredients, authentic flavors, and lightning-fast service that brings families together.
          </p>
        </article>

        <article className="mb-6">
          <h2 className="text-2xl text-black font-semibold mb-3">
            Our Story
          </h2>
          <p className="text-gray-800 text-base leading-relaxed mb-3">
            It began with a simple dream: to share the perfect pizza. What started as a small kitchen experiment has grown into a beloved tradition. We believe great pizza isn't just food – it's an experience that brings people together.
          </p>
          <blockquote className="text-gray-700 text-lg italic border-l-4 border-green-600 pl-4">
            "From humble beginnings to every customer's heart – that's our journey."
          </blockquote>
        </article>

        <article className="mb-6">
          <h2 className="text-2xl text-black font-semibold mb-3">
            Our Mission
          </h2>
          <blockquote className="text-gray-700 text-lg italic border-l-4 border-green-600 pl-4 mb-3">
            "Quality in every bite, care in every order."
          </blockquote>
          <p className="text-gray-800 text-base leading-relaxed">
            We deliver consistently delicious pizzas with unwavering attention to detail. Your satisfaction drives our every decision, from selecting the finest ingredients to ensuring impeccable hygiene standards.
          </p>
        </article>

        <article className="mb-6">
          <h2 className="text-2xl text-black font-semibold mb-3">
            Why Choose Pizza Delight
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center">
              <h3 className="text-green-700 font-semibold mb-2">Fresh Daily</h3>
              <p className="text-gray-700 text-sm">Premium ingredients sourced fresh every morning</p>
            </div>
            <div className="text-center">
              <h3 className="text-green-700 font-semibold mb-2">Fast & Reliable</h3>
              <p className="text-gray-700 text-sm">Hot, fresh delivery when you want it</p>
            </div>
            <div className="text-center">
              <h3 className="text-green-700 font-semibold mb-2">Secure Ordering</h3>
              <p className="text-gray-700 text-sm">Safe, easy online experience</p>
            </div>
            <div className="text-center">
              <h3 className="text-green-700 font-semibold mb-2">Wide Variety</h3>
              <p className="text-gray-700 text-sm">Veg & non-veg options for everyone</p>
            </div>
          </div>
        </article>

        <article className="mb-6">
          <h2 className="text-2xl text-black font-semibold mb-3">
            Our Promise
          </h2>
          <blockquote className="text-gray-700 text-lg italic border-l-4 border-green-600 pl-4 mb-3">
            "Your satisfaction is our greatest reward."
          </blockquote>
          <p className="text-gray-800 text-base leading-relaxed">
            Quality assurance in every pizza. Safe packaging, rigorous checks, and a commitment to making things right. Because at Pizza Delight, your happiness comes first.
          </p>
        </article>

        <article className="mb-6 text-center border-t border-gray-200 pt-6">
          <p className="text-green-700 font-semibold text-lg mb-2">
          </p>
          {/* <p className="text-gray-600 text-sm">
            A full-stack MERN demo pizza ordering application.
          </p> */}
        </article>
      </div>
    </section>
  );
}

export default AboutScreen;
