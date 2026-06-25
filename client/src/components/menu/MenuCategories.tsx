import { categories } from "../../data/categories";

interface Props {
  selected: string;
  onSelect: (category: string) => void;
}

export default function MenuCategories({
  selected,
  onSelect,
}: Props) {
  return (
    <div
      className="
        sticky
        top-0
        z-20
        bg-slate-50
        flex
        gap-3
        overflow-x-auto
        scrollbar-hide
        px-4
        py-3
      "
    >
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => {
            onSelect(category);
            document
              .getElementById(category)
              ?.scrollIntoView({
                behavior: "smooth",
              });
          }}
          className={`
            px-4
            py-2
            rounded-full
            whitespace-nowrap
            transition
            ${
              selected === category
                ? "bg-orange-500 text-white"
                : "bg-white"
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
}