import MainLayout from "../layouts/MainLayout";
import { useCartStore } from "../store/cartStore";

export default function CartPage() {
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();

  const subtotal = items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const platformFee =
    items.length > 0 ? 5 : 0;

  const grandTotal =
    subtotal + platformFee;

  return (
    <MainLayout>
      <div className="p-4 pb-32">
        <h1 className="text-2xl font-bold mb-6">
          Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-lg font-medium">
              Your cart is empty
            </p>

            <p className="text-gray-500 mt-2">
              Add some delicious food 😋
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="
                    bg-white
                    rounded-2xl
                    p-3
                    shadow-sm
                    flex
                    gap-4
                  "
                >
                  <img
                    src={
                      item.image.startsWith("/images/")
                        ? `${import.meta.env.BASE_URL}${item.image.slice(1)}`
                        : item.image
                   }
                   alt={item.name}
                    className="
                      w-20
                      h-20
                      rounded-xl
                      object-cover
                    "
                  />

                  <div className="flex-1">
                    <h3 className="font-medium">
                      {item.name}
                    </h3>

                    <p className="mt-1 font-semibold">
                      ₹{item.price}
                    </p>

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        mt-3
                      "
                    >
                      <button
                        onClick={() =>
                          decreaseQuantity(
                            item.id
                          )
                        }
                        className="
                          w-8
                          h-8
                          rounded-full
                          bg-orange-500
                          text-white
                        "
                      >
                        -
                      </button>

                      <span className="font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.id
                          )
                        }
                        className="
                          w-8
                          h-8
                          rounded-full
                          bg-orange-500
                          text-white
                        "
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bill Details */}

            <div
              className="
                bg-white
                rounded-2xl
                p-4
                shadow-sm
                mt-6
              "
            >
              <h2 className="font-bold mb-4">
                Bill Details
              </h2>

              <div className="flex justify-between mb-2">
                <span>Subtotal</span>

                <span>
                  ₹{subtotal}
                </span>
              </div>

              <div className="flex justify-between mb-2">
                <span>Platform Fee</span>

                <span>
                  ₹{platformFee}
                </span>
              </div>

              <hr className="my-3" />

              <div className="flex justify-between font-bold">
                <span>Total</span>

                <span>
                  ₹{grandTotal}
                </span>
              </div>
            </div>

            {/* Sticky Checkout */}

            <div
              className="
                fixed
                bottom-16
                left-0
                right-0
                px-4
              "
            >
              <button
                className="
                  w-full
                  bg-orange-500
                  text-white
                  py-4
                  rounded-2xl
                  font-semibold
                  shadow-lg
                "
              >
                Proceed to Checkout • ₹{grandTotal}
              </button>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}