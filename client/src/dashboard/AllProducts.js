import React from "react";
import { SearchContainer, ProductContainer } from "../components/index";
import { useAppContext } from "../context/appContext";
import AllProjects from "./AllProjects";

const AllProducts = () => {
  const { user } = useAppContext();
  if (user.type === "ProcurementManager") {
    return <AllProjects />;
  }
  return (
    <>
      <SearchContainer />
      <ProductContainer />
    </>
  );
};

export default AllProducts;
