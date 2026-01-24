import { FiPlus } from "react-icons/fi";
import Swal from "sweetalert2";

const CoffeeCard = ({ coffee }) => {
  const { name, price, image, description } = coffee;

  const handleAddToCart = () => {
    // TODO: Implement cart functionality with context/state management
    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: `${name} has been added to your cart`,
      showConfirmButton: false,
      timer: 1500,
      background: "#fffbeb",
      iconColor: "#d97706",
    });
  };

  return (
    <div className="card bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <figure className="px-4 pt-4">
        <img
          src={image}
          alt={name}
          className="rounded-xl h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-amber-900">{name}</h2>
        <p className="text-amber-700 text-sm">{description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-amber-600">৳{price}</span>
          <button
            onClick={handleAddToCart}
            className="btn btn-circle bg-amber-600 hover:bg-amber-700 text-white border-none"
          >
            <FiPlus className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
