import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Racket from "../../assets/about/Racket.png";
import Quality from "../../assets/about/best-quality.png";
import Delivery from "../../assets/about/delivery-bike.png";

// Mock Data Cards
const mockData = [
  {
    image: Racket,
    title: "Premium Experience",
    paragraph: `Step onto our premium padel courts for an unmatched playing experience. With top-tier surfaces, modern facilities, and a welcoming atmosphere, every game feels like a championship match`,
  },
  {
    image: Quality,
    title: "Quality Products",
    paragraph: `Discover a range of premium quality products designed for excellence. Each item is crafted with the finest materials, ensuring durability, superior performance, and exceptional value that stands the test of time`,
  },
  {
    image: Delivery,
    title: "Fastest Delivery",
    paragraph: `Experience lightning-fast delivery that gets your order to your doorstep in record time. Our streamlined process ensures reliability, speed, and efficiency, so you can enjoy what you need without the wait. With every delivery, we prioritize your satisfaction by combining speed with exceptional service`,
  },
  // Add more mock data objects as needed
];

function Section2() {
  return (
    <>
      <section className="about_section">
        <Container>
          <Row>
            <Col lg={{ span: 8, offset: 2 }} className="text-center">
              <h2>Playing padel is more enjoyable when you share the court with your family</h2>
              
              <Link to="/shop" className="btn order_now btn_red">
                Explore Our Shop
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="about_wrapper">
        <Container>
          <Row className="justify-content-md-center">
            {mockData.map((cardData, index) => (
              <Col md={6} lg={4} className="mb-4 mb-md-0" key={index}>
                <div className="about_box text-center">
                  <div className="about_icon">
                    <img
                      src={cardData.image}
                      className="img-fluid"
                      alt="icon"
                    />
                  </div>
                  <h4>{cardData.title}</h4>
                  <p>{cardData.paragraph}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Section2;
