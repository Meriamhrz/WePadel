import React from "react";
import Category from "./Category/Category";
import Brand from "./Brand/Brands";
import Price from "./Price/Price";

const Sidebar = ({ filteredProducts,setFilteredProducts,InitialProducts}) => {
  return (
    <div className="sidebar">
      <Category filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} InitialProducts={InitialProducts} />
      <Brand filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} InitialProducts={InitialProducts} />
      <Price filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} InitialProducts={InitialProducts} />
    </div>
  );
};

export default Sidebar;
