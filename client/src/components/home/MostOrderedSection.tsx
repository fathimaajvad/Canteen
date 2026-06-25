import SectionTitle from "../common/SectionTitle";
import FoodCard from "../common/FoodCard";
import { foodItems } from "../../data/foodItems";

export default function MostOrderedSection() {
  const mostOrdered = [...foodItems]
    .sort(
      (a, b) =>
        b.ordersToday - a.ordersToday
    )
    .slice(0, 4);

  return (
    <div className="mt-6">
      <SectionTitle title="🔥 Most Ordered Today" />

      <div className="grid grid-cols-2 gap-4 px-4">
        {mostOrdered.map((food) => (
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