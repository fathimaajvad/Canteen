import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

import MainLayout from "../layouts/MainLayout";

import Header from "../components/common/Header";
import SearchBar from "../components/common/SearchBar";

import MenuCategories from "../components/menu/MenuCategories";
import CategorySection from "../components/menu/CategorySection";

import { categories } from "../data/categories";
import { foodItems } from "../data/foodItems";

export default function MenuPage() {
  const [searchParams] =
    useSearchParams();

  const [search, setSearch] =
    useState("");

  const initialCategory =
    searchParams.get("category") ||
    "Meals";

  const [selectedCategory, setSelectedCategory] =
    useState(initialCategory);

  const hasResults = foodItems.some(
    (food) =>
      food.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

  // Auto-scroll when coming from Home page

  useEffect(() => {
    if (search.trim() !== "") return;

    const timer = setTimeout(() => {
      const section =
        document.getElementById(
          selectedCategory
        );

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedCategory, search]);

  // Active category highlight while scrolling

  useEffect(() => {
    if (search.trim() !== "") return;

    const handleScroll = () => {
      categories.forEach(
        (category) => {
          const section =
            document.getElementById(
              category
            );

          if (!section) return;

          const rect =
            section.getBoundingClientRect();

          if (
            rect.top <= 200 &&
            rect.bottom >= 200
          ) {
            setSelectedCategory(
              category
            );
          }
        }
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, [search]);

  return (
    <MainLayout>
      <Header />

      <SearchBar
        value={search}
        onChange={setSearch}
      />

      {search.trim() === "" && (
        <MenuCategories
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      )}

      <div className="mt-4">
        {!hasResults &&
        search.trim() !== "" ? (
          <div className="text-center py-10">
            <h2 className="text-lg font-semibold">
              No items found
            </h2>

            <p className="text-gray-500 mt-2">
              Try searching for another item
            </p>
          </div>
        ) : (
          categories.map((category) => {
            const foods =
              foodItems.filter(
                (food) =>
                  food.category ===
                    category &&
                  food.name
                    .toLowerCase()
                    .includes(
                      search.toLowerCase()
                    )
              );

            if (foods.length === 0)
              return null;

            return (
              <CategorySection
                key={category}
                title={category}
                foods={foods}
              />
            );
          })
        )}
      </div>
    </MainLayout>
  );
}