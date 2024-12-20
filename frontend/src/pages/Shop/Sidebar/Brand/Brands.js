import React, { useState } from "react";
import "./Brands.css";
import Input from "../../../../components/Input";

const Brand = ({ filteredProducts,setFilteredProducts,InitialProducts}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase(); // Convert to lowercase for case-insensitive comparison
    if (value==="all"){
      setFilteredProducts(InitialProducts);
    }
    else{
      setFilteredProducts(
        InitialProducts.filter((product) => 
          product.brand.toLowerCase() === value
        )
      );
    }
    
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="brand-container">
      {/* Brand title with dropdown toggle */}
      <div className="sidebar-title-container" onClick={toggleDropdown}>
        <h2 className="sidebar-title brand-title">Brand</h2>
        <span className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}>
          ▼
        </span>
      </div>

      {/* Dropdown options */}
      {isDropdownOpen && (
        <div className="sidebar-items">
          <label className="sidebar-label-container">
            <input onChange={handleChange} type="checkbox" value="all" name="brand" checked  />
            <span className="checkmark all"></span>All
          </label>

          <Input
            handleChange={handleChange}
            value="bullpadel"
            title="Bullpadel"
            name="brand"
            type="checkbox"
          />
          <Input
            handleChange={handleChange}
            value="babolat"
            title="Babolat"
            name="brand"
            type="checkbox"
          />
          <Input
            handleChange={handleChange}
            value="adidas"
            title="Adidas"
            name="brand"
            type="checkbox"
          />
          <Input
            handleChange={handleChange}
            value="siux"
            title="Siux"
            name="brand"
            type="checkbox"
          />
          <Input
            handleChange={handleChange}
            value="nox"
            title="Nox"
            name="brand"
            type="checkbox"
          />
          <Input
            handleChange={handleChange}
            value="wilson"
            title="Wilson"
            name="brand"
            type="checkbox"
          />
          <Input
            handleChange={handleChange}
            value="head"
            title="Head"
            name="brand"
            type="checkbox"
          />
        </div>
      )}
    </div>
  );
};

export default Brand;
