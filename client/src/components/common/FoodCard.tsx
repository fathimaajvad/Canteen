import { useCartStore } from "../../store/cartStore";

interface Props {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function FoodCard({
  id,
  name,
  price,
  image,
}: Props) {
  const {
    items,
    addItem,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();

  const cartItem = items.find(
    (item) => item.id === id
  );

  return (
    <div
      className="
        w-40
        flex-shrink-0

        bg-white
        rounded-2xl
        overflow-hidden

        shadow-sm
        hover:shadow-md

        transition-all
        duration-200
      "
    >
      <img
        src={
          image.startsWith("/images/")
            ? `${import.meta.env.BASE_URL}${image.slice(1)}`
            : image
       }
       alt={name}
       className="
         w-full
         h-36
         object-contain
         bg-white
         p-2
        "
      />

      <div className="px-3 pb-3">
        <h3
          className="
            text-sm
            font-medium
            truncate
          "
        >
          {name}
        </h3>

        <div
          className="
            flex
            items-center
            justify-between
            mt-3
          "
        >
          <span
            className="
              font-bold
              text-sm
            "
          >
            ₹{price}
          </span>

          {cartItem ? (
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <button
                onClick={() =>
                  decreaseQuantity(id)
                }
                className="
                  w-7
                  h-7
                  rounded-full
                  bg-orange-500
                  text-white
                "
              >
                -
              </button>

              <span className="text-sm font-medium">
                {cartItem.quantity}
              </span>

              <button
                onClick={() =>
                  increaseQuantity(id)
                }
                className="
                  w-7
                  h-7
                  rounded-full
                  bg-orange-500
                  text-white
                "
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() =>
                addItem({
                  id,
                  name,
                  price,
                  image,
                })
              }
              className="
                w-8
                h-8
                rounded-full
                bg-orange-500
                text-white
                font-bold
              "
            >
              +
            </button>
          )}
        </div>
      </div>
    </div>
  );
}