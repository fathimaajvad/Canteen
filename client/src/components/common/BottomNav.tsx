import {
  UtensilsCrossed,
  ShoppingCart,
  ClipboardList,
  User,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";

const navItems = [
  
  {
    label: "Menu",
    icon: UtensilsCrossed,
    path: "/menu",
  },
  {
    label: "Cart",
    icon: ShoppingCart,
    path: "/cart",
  },
  {
    label: "Orders",
    icon: ClipboardList,
    path: "/orders",
  },
  {
    label: "Profile",
    icon: User,
    path: "/profile",
  },
];

export default function BottomNav() {
  const items = useCartStore(
    (state) => state.items
  );

  const cartCount = items.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
      <div className="flex justify-around py-3">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center text-xs ${
                  isActive
                    ? "text-orange-500"
                    : "text-gray-500"
                }`
              }
            >
              <div className="relative">
                <Icon size={20} />

                {item.label === "Cart" &&
                  cartCount > 0 && (
                    <span
                      className="
                        absolute
                        -top-2
                        -right-2
                        bg-orange-500
                        text-white
                        text-[10px]
                        rounded-full
                        min-w-[18px]
                        h-[18px]
                        flex
                        items-center
                        justify-center
                        px-1
                      "
                    >
                      {cartCount}
                    </span>
                  )}
              </div>

              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}