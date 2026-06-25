interface Props {
  name: string;
  price: number;
  image: string;
}

export default function FoodCard({
  name,
  price,
  image,
}: Props) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <img
        src={image}
        alt={name}
        className="h-24 w-full object-cover"
      />

      <div className="p-3">
        <h3 className="text-sm font-medium line-clamp-1">
          {name}
        </h3>

        <div className="mt-2 flex justify-between items-center">
          <span className="font-bold">
            ₹{price}
          </span>

          <button className="bg-orange-500 text-white w-8 h-8 rounded-full">
            +
          </button>
        </div>
      </div>
    </div>
  );
}