import { FiCoffee, FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-amber-900 text-amber-100">
      <aside>
        <FiCoffee className="text-5xl" />
        <p className="font-bold text-lg">
          Coffee Shop
          <br />
          Premium Coffee Since 2020
        </p>
        <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="#" className="hover:text-white transition-colors">
            <FiFacebook className="text-2xl" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <FiInstagram className="text-2xl" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <FiTwitter className="text-2xl" />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
