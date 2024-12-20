import React from "react";
import { Container, Row } from "react-bootstrap";
import Cards from "../../components/Layouts/Cards";

import { useState} from "react";
import { Form } from "react-bootstrap";


const renderRatingIcons = (rating) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (rating > 0.5) {
      stars.push(<i key={i} className="bi bi-star-fill"></i>);
      rating--;
    } else if (rating > 0 && rating < 1) {
      stars.push(<i key={"half"} className="bi bi-star-half"></i>);
      rating--;
    } else {
      stars.push(<i key={`empty${i}`} className="bi bi-star"></i>);
    }
  }
  return stars;
};


function ShopBody({ filteredProducts,setFilteredProducts,InitialProducts }) {
  const [searchTerm, setSearchTerm] = useState("");

  
 

  // Handle search input changes
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter products based on search term
    const filtered = InitialProducts.filter(
      (product) =>
        product.brand.toLowerCase().includes(value) ||
        product.paragraph.toLowerCase().includes(value) ||
        product.category.toLowerCase().includes(value)
    );  
    setFilteredProducts(filtered);
  };

  return (
    <div className="shopbody">
      <section className="menu_section">
        <Container>
          {/* Search Bar */}
          <div className="search-bar my-4">
            <Form.Control
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={handleSearch}
              style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}
            />
          </div>

          {/* Product Cards */}
          <Row>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((cardData, index) => (
                <Cards
                  key={index}
                  image={cardData.image}
                  rating={cardData.rating}
                  title={cardData.brand}
                  paragraph={cardData.paragraph}
                  price={cardData.price}
                  renderRatingIcons={renderRatingIcons}
                  id={cardData._id}
                />
              ))
            ) : (
              <p>No products found matching "{searchTerm}"</p>
            )}
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default ShopBody;
