import React, { useState } from "react";
import "./Price.css";

const Price = ({ filteredProducts, setFilteredProducts, InitialProducts }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function removeCharacter(input, charToRemove) {
    return input ? input.replace(new RegExp(`\\${charToRemove}`, "g"), "").trim() : "";
  }

  const handleChange = (e) => {
    const initValue = e.target.value.toLowerCase().trim();

    if (initValue === "all") {
      setFilteredProducts(InitialProducts);
    } else {
      const value = initValue.split("-");
      if (value.length === 2) {
        const price1 = Number(removeCharacter(value[0], "$"));
        const price2 = Number(removeCharacter(value[1], "$"));

        if (!isNaN(price1) && !isNaN(price2)) {
          setFilteredProducts(
            InitialProducts.filter(
              (product) => Number(product.price) >= price1 && Number(product.price) <= price2
            )
          );
        } else {
          console.error("Invalid price values:", price1, price2);
        }
      } else {
        console.error("Invalid price range format:", value);
      }
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="price-container ml">
      <div className="sidebar-title-container" onClick={toggleDropdown}>
        <h2 className="sidebar-title price-title">Price</h2>
        <span className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}>▼</span>
      </div>

      {isDropdownOpen && (
        <div className="sidebar-items">
          <label className="sidebar-label-container">
            <input
              onChange={handleChange}
              type="radio"
              value="all"
              name="price-filter"
              defaultChecked
            />
            <span className="checkmark"></span>All
          </label>

          <label className="sidebar-label-container">
            <input
              onChange={handleChange}
              type="radio"
              value="0-50"
              name="price-filter"
            />
            <span className="checkmark"></span>$0 - $50
          </label>

          <label className="sidebar-label-container">
            <input
              onChange={handleChange}
              type="radio"
              value="50-100"
              name="price-filter"
            />
            <span className="checkmark"></span>$50 - $100
          </label>

          <label className="sidebar-label-container">
            <input
              onChange={handleChange}
              type="radio"
              value="100-150"
              name="price-filter"
            />
            <span className="checkmark"></span>$100 - $150
          </label>

          <label className="sidebar-label-container">
            <input
              onChange={handleChange}
              type="radio"
              value="150-10000"
              name="price-filter"
            />
            <span className="checkmark"></span>Over $150
          </label>
        </div>
      )}
    </div>
  );
};

export default Price;
