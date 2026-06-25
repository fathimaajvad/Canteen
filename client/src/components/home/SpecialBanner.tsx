export default function SpecialBanner() {
  return (
    <div className="px-4 mt-4">
      <div className="bg-orange-500 rounded-3xl p-6 text-white">
        <p className="text-sm font-medium">
          TODAY'S SPECIAL
        </p>

        <h2 className="text-2xl font-bold mt-2">
          Chicken Shawarma
        </h2>

        <p className="mt-2">
          20% OFF Today
        </p>

        <button className="mt-4 bg-white text-orange-500 px-4 py-2 rounded-xl font-semibold">
          Order Now
        </button>
      </div>
    </div>
  );
}