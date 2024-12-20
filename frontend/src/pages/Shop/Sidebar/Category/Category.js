import React, { useState } from "react";
import "./Category.css";
import Input from "../../../../components/Input";

function Category({ filteredProducts,setFilteredProducts,InitialProducts}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleChange = (e) => {
    const value = e.target.value.toLowerCase(); // Convert to lowercase for case-insensitive comparison
    if (value==="all"){
      setFilteredProducts(InitialProducts);
    }
    else{
      setFilteredProducts(
        InitialProducts.filter((product) => 
          product.category.toLowerCase() === value
        )
      );
    }
    
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="category-container">
      {/* Make title and arrow fully clickable */}
      <div className="sidebar-title-container" onClick={toggleDropdown}>
        <h2 className="sidebar-title">Category</h2>
        <span className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}>
          ▼
        </span>
      </div>

      {/* Dropdown items */}
      {isDropdownOpen && (
        <div className="sidebar-items">
          <label className="sidebar-label-container">
            <input onChange={handleChange} type="radio" value="" name="test" checked />
            <span className="checkmark all"></span>All
          </label>
          <Input
            handleChange={handleChange}
            value="rackets"
            title="Rackets"
            name="test"
          />
          <Input
            handleChange={handleChange}
            value="shoes"
            title="Shoes"
            name="test"
          />
          <Input
            handleChange={handleChange}
            value="menclothes"
            title="Men Clothes"
            name="test"
          />
          <Input
            handleChange={handleChange}
            value="womenclothes"
            title="Women Clothes"
            name="test"
          />
          <Input
            handleChange={handleChange}
            value="grip"
            title="Grip"
            name="test"
          />
          <Input
            handleChange={handleChange}
            value="bags"
            title="Bags"
            name="test"
          />
        </div>
      )}
    </div>
  );
}

export default Category;
