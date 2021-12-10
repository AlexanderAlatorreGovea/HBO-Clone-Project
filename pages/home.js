import Head from "next/head";
import MainLayout from "../components/Layouts/MainLayout";
import FeaturedMedia from "../components/UI/FeaturedMedia/FeaturedMedia";

export default function HomeView() {
  return (
    <MainLayout>
      <FeaturedMedia />
    </MainLayout>
  );
}
