import FoodCard from "../common/FoodCard";
import SectionTitle from "../common/SectionTitle";
import { foodItems } from "../../data/foodItems";

export default function RecommendedSection() {
  const recommended =
    foodItems.filter(
      (item) => item.recommended
    );

  return (
    <div className="mt-6">
      <SectionTitle title="✨ Recommended For You" />

      <div className="grid grid-cols-2 gap-4 px-4">
        {recommended.map((food) => (
          <FoodCard
            key={food.id}
            id={food.id}
            name={food.name}
            price={food.price}
            image={food.image}
          />
        ))}
      </div>
    </div>
  );
}