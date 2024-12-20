import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PromotionImage from "../../assets/promotion/pro.png";

function Section4() {
  return (
    <>
      <section className="promotion_section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="text-center mb-5 mb-lg-0">
              <img src={PromotionImage} className="img-fluid" alt="Promotion" />
            </Col>
            <Col lg={6} className="px-5">
              <h2>Nothing brings people together like a great game of padel</h2>
              <p>
              Our courts are designed for all levels, offering the perfect setting for fun and competitive play. Whether you’re here with friends or family, padel is the ultimate way to connect and enjoy quality time together.
              </p>
              <ul>
                <li>
                  <p>
                  From casual matches to intense rallies, every game is an opportunity to improve and bond.
                  </p>
                </li>
                <li>
                  <p>Experience the thrill of padel and create unforgettable memories on the court.</p>
                </li>
               
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      {/* BG Parallax Scroll */}
      <section className="bg_parallax_scroll"></section>
    </>
  );
}

export default Section4;
