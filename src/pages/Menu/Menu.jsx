import { useEffect, useMemo, useState } from "react";
import { FiCoffee } from "react-icons/fi";
import {
  MdCoffeeMaker,
  MdLocalCafe,
  MdIcecream,
  MdCookie,
  MdCake,
  MdEmojiFoodBeverage
} from "react-icons/md";
import { BiSolidCoffeeBean } from "react-icons/bi";
import CoffeeCard from "../../components/CoffeeCard/CoffeeCard";

const API_BASE = import.meta?.env?.VITE_API_BASE_URL || "http://localhost:3000";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [coffeeItems, setCoffeeItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "all", label: "All", icon: MdCoffeeMaker },
    { id: "hot-coffee", label: "Hot Coffee", icon: FiCoffee },
    { id: "iced-coffee", label: "Iced Coffee", icon: MdIcecream },
    { id: "espresso-bar", label: "Espresso Bar", icon: BiSolidCoffeeBean },
    { id: "tea-non-coffee", label: "Tea & Non-Coffee", icon: MdEmojiFoodBeverage },
    { id: "snacks-savory", label: "Snack & Savory", icon: MdCookie },
    { id: "desserts-bakery", label: "Desserts & Bakery", icon: MdCake }
  ];

  // ✅ Fetch from backend
  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/all_items`);
        const data = await res.json();
        setCoffeeItems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Failed to load items:", e);
        setCoffeeItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  // ✅ Filter items
  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return coffeeItems;
    return coffeeItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory, coffeeItems]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="relative py-12 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto relative">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
              <MdLocalCafe className="text-lg" />
              Premium Selection
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-amber-950 mb-3 tracking-tight">
              Our Menu
            </h1>
            <p className="text-amber-800/70 text-lg max-w-xl mx-auto">
              Discover our handcrafted beverages and artisanal treats, made with love and the finest ingredients
            </p>
          </div>

          {/* Category Tabs */}
          <div className="relative mb-12">
            <div className="hidden md:flex justify-center">
              <div className="inline-flex flex-wrap justify-center gap-2 p-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-amber-900/5 border border-amber-100">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isActive = selectedCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`
                        group relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm
                        transition-all duration-300 ease-out
                        ${isActive
                          ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-600/30"
                          : "text-amber-800 hover:bg-amber-50 hover:text-amber-900"
                        }
                      `}
                    >
                      <Icon className={`text-lg transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                      <span>{category.label}</span>
                      {isActive && (
                        <span className="absolute inset-0 rounded-xl ring-2 ring-amber-400/50 ring-offset-2 ring-offset-white/80 animate-pulse"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Tabs */}
            <div className="md:hidden">
              <div className="flex gap-2 overflow-x-auto pb-3 px-1 scrollbar-hide snap-x snap-mandatory">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isActive = selectedCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`
                        flex-shrink-0 snap-start flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm
                        transition-all duration-300 ease-out whitespace-nowrap
                        ${isActive
                          ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-600/25"
                          : "bg-white/80 text-amber-800 border border-amber-100 hover:border-amber-200"
                        }
                      `}
                    >
                      <Icon className="text-lg" />
                      <span>{category.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6 px-1">
            <p className="text-amber-700 text-sm">
              Showing <span className="font-semibold text-amber-900">{filteredItems.length}</span> items
              {selectedCategory !== "all" && (
                <span>
                  {" "}in <span className="font-semibold text-amber-900">{categories.find(c=>c.id===selectedCategory)?.label}</span>
                </span>
              )}
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-16 text-amber-800">
              Loading menu...
            </div>
          )}

          {/* Grid */}
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <CoffeeCard key={item._id} coffee={item} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredItems.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                <FiCoffee className="text-3xl text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">No items found</h3>
              <p className="text-amber-700">We're brewing something special for this category. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
