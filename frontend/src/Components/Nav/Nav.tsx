import {
  FlaskConical,
  LayoutDashboard,
  PackagePlus,
  ShoppingCart,
  UsersRound,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Nav = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-[#F7F8FA] w-20 h-screen">
      <ul className="flex flex-col justify-center items-center gap-3.5">
        <Link to="/">
          <LayoutDashboard
            size={40}
            className={`${
              isActive("/")
                ? "text-[#59B17A] bg-white rounded-full p-2"
                : "text-gray-400 hover:text-gray-800 bg-white rounded-full p-2"
            }`}
          />
        </Link>
        <Link to="/all-orders">
          <ShoppingCart
            size={40}
            className={`${
              isActive("/all-orders")
                ? "text-[#59B17A] bg-white rounded-full p-2"
                : "text-gray-400 hover:text-gray-800 bg-white rounded-full p-2"
            }`}
          />
        </Link>
        <Link to="/all-products">
          <FlaskConical
            size={40}
            className={`${
              isActive("/all-products")
                ? "text-[#59B17A] bg-white rounded-full p-2"
                : "text-gray-400 hover:text-gray-800 bg-white rounded-full p-2"
            }`}
          />
        </Link>
        <Link to="/all-suppliers">
          <PackagePlus
            size={40}
            className={`${
              isActive("/all-suppliers")
                ? "text-[#59B17A] bg-white rounded-full p-2"
                : "text-gray-400 hover:text-gray-800 bg-white rounded-full p-2"
            }`}
          />
        </Link>
        <Link to="/all-customers">
          <UsersRound
            size={40}
            className={`${
              isActive("/all-customers")
                ? "text-[#59B17A] bg-white rounded-full p-2"
                : "text-gray-400 hover:text-gray-800 bg-white rounded-full p-2"
            }`}
          />
        </Link>
      </ul>
    </nav>
  );
};
