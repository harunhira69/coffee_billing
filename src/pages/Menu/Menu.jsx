import { useState } from "react";
import CoffeeCard from "../../components/CoffeeCard/CoffeeCard";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "hot coffee", "iced coffee", "specialty", "snacks"];

  const coffeeItems = [
    {
      id: 1,
      name: "Espresso",
      category: "hot coffee",
      price: 120,
      image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400",
      description: "Rich and bold single shot of pure coffee essence",
    },
    {
      id: 2,
      name: "Cappuccino",
      category: "hot coffee",
      price: 180,
      image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400",
      description: "Espresso topped with steamed milk and foam",
    },
    {
      id: 3,
      name: "Latte",
      category: "hot coffee",
      price: 200,
      image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
      description: "Smooth espresso with steamed milk",
    },
    {
      id: 4,
      name: "Iced Americano",
      category: "iced coffee",
      price: 160,
      image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400",
      description: "Chilled espresso over ice with cold water",
    },
    {
      id: 5,
      name: "Cold Brew",
      category: "iced coffee",
      price: 220,
      image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
      description: "Smooth cold-steeped coffee for 12 hours",
    },
    {
      id: 6,
      name: "Mocha Frappe",
      category: "specialty",
      price: 280,
      image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400",
      description: "Blended coffee with chocolate and whipped cream",
    },
    {
      id: 7,
      name: "Caramel Macchiato",
      category: "specialty",
      price: 260,
      image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400",
      description: "Vanilla-flavored latte with caramel drizzle",
    },
    {
      id: 8,
      name: "Chocolate Croissant",
      category: "snacks",
      price: 150,
      image: "https://images.unsplash.com/photo-1623334044303-241021148842?w=400",
      description: "Buttery croissant filled with rich chocolate",
    },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? coffeeItems
      : coffeeItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="py-8 px-4 lg:px-8 bg-amber-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-amber-900 mb-8">
          Our Menu
        </h1>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`btn capitalize ${
                selectedCategory === category
                  ? "bg-amber-600 text-white hover:bg-amber-700"
                  : "btn-ghost bg-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Coffee Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <CoffeeCard key={item.id} coffee={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
