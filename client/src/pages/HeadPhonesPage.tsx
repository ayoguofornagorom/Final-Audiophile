import React from "react";
import CategoryPageLayout from "../components/CategoryPageLayout";
import { useStore } from "../context/StoreContext";
import RollerLoader from "../components/RollerLoader";

const HeadPhonesPage: React.FC = () => {
  // Get headphone products from context (already fetched globally)
  const { getProductsByCategory, loading } = useStore();

  if (loading) {
    return <RollerLoader />;
  }

  const headphones = getProductsByCategory("headphones");
  return <CategoryPageLayout title="HeadPhones" products={headphones} />;
};

export default HeadPhonesPage;
