import { Link } from "react-router";
import { FiCoffee, FiStar, FiTruck } from "react-icons/fi";

const Home = () => {
  const features = [
    {
      icon: <FiCoffee className="text-4xl text-amber-600" />,
      title: "Premium Beans",
      description: "Hand-picked from the finest farms around the world",
    },
    {
      icon: <FiStar className="text-4xl text-amber-600" />,
      title: "Expert Roasting",
      description: "Perfectly roasted to bring out the best flavors",
    },
    {
      icon: <FiTruck className="text-4xl text-amber-600" />,
      title: "Fast Delivery",
      description: "Fresh coffee delivered to your doorstep",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero min-h-[70vh] bg-gradient-to-br from-amber-50 to-amber-100">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-amber-900">
              Start Your Day With <span className="text-amber-600">Coffee</span>
            </h1>
            <p className="py-6 text-lg text-amber-800">
              Experience the rich aroma and exceptional taste of our premium
              coffee blends. Every cup tells a story of passion and perfection.
            </p>
            <Link to="/menu" className="btn btn-lg bg-amber-600 hover:bg-amber-700 text-white border-none">
              Explore Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card bg-amber-50 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="card-body items-center text-center">
                  {feature.icon}
                  <h3 className="card-title text-amber-900">{feature.title}</h3>
                  <p className="text-amber-700">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 lg:px-8 bg-amber-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-lg mb-8 text-amber-100">
            Browse our menu and find your perfect cup of coffee today!
          </p>
          <Link
            to="/menu"
            className="btn btn-lg bg-white text-amber-800 hover:bg-amber-100 border-none"
          >
            View Full Menu
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
