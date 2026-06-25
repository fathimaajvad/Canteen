import { useNavigate } from "react-router-dom";
import { popularCategories } from "../../data/popularCategories";

export default function CategoryChips() {
  const navigate = useNavigate();

  return (
    <div className="flex gap-3 overflow-x-auto px-4 py-4">
      {popularCategories.map((category) => (
        <button
          key={category}
          onClick={() =>
            navigate(`/menu?category=${category}`)
          }
          className="
            bg-white
            px-4
            py-2
            rounded-full
            shadow-sm
            whitespace-nowrap
          "
        >
          {category}
        </button>
      ))}
    </div>
  );
}