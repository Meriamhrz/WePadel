import React from "react";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../pages/orebiSlice";

function Cards({ image, rating, title, paragraph, price, renderRatingIcons, id }) {
    const [isLiked, setIsLiked] = useState(false);
    const toggleLike = () => {
      setIsLiked((prev) => !prev);
    };
    const dispatch = useDispatch();
    
  return (
    <Col sm={6} lg={4} xl={3} className="mb-4">
      <Card className="overflow-hidden">
        <div className="overflow-hidden">
          <Card.Img variant="top" src={image} />
        </div>
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between">
            <div className="item_rating">{renderRatingIcons(rating)}</div>
            <div className="wishlist">
            <i className={`bi ${isLiked ? "bi-heart-fill" : "bi-heart"}`} style={{ color: isLiked ? "red" : "black", cursor: "pointer" }} onClick={toggleLike}></i>
            </div>
          </div>

          <Card.Title>{title}</Card.Title>
          <Card.Text>{paragraph}</Card.Text>

          <div className="d-flex align-items-center justify-content-between">
            <div className="menu_price">
              <h5 className="mb-0">${price}</h5>
            </div>
            <div className="add_to_card">
              <Link to="/Cart" onClick={() =>
                dispatch(
                  addToCart({
                    _id: id,
                    name: title,
                    quantity: 1,
                    image: image,
                    price: price,
                  })
                  
                )
              } >
                <i class="bi bi-bag me-2"></i>
                Add To Cart
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Cards;
