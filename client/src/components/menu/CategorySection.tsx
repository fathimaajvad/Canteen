import FoodCard from "../common/FoodCard";

interface Food {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface Props {
  title: string;
  foods: Food[];
}

export default function CategorySection({
  title,
  foods,
}: Props) {
  return (
    <section
      id={title}
      className="mb-8"
    >
      <h2 className="px-4 mb-4 text-xl font-bold">
        {title}
      </h2>

      <div
        className="
          flex
          gap-3
          overflow-x-auto
          px-4
          pb-2
        "
      >
        {foods.map((food) => (
          <FoodCard
            key={food.id}
            id={food.id}
            name={food.name}
            price={food.price}
            image={food.image}
          />
        ))}
      </div>
    </section>
  );
}