import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Header from "../components/common/Header";
import SearchBar from "../components/common/SearchBar";

import SpecialBanner from "../components/home/SpecialBanner";
import CategoryChips from "../components/home/CategoryChips";
import MostOrderedSection from "../components/home/MostOrderedSection";
import RecommendedSection from "../components/home/RecommendedSection";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <Header />

      <SearchBar
        onFocus={() => navigate("/menu")}
      />

      <SpecialBanner />

      <CategoryChips />

      <MostOrderedSection />

      <RecommendedSection />
    </MainLayout>
  );
}