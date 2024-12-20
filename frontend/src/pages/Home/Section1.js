import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Burger from "../../assets/hero/PadelCourt.png";
import { Link } from "react-router-dom";

const Section1 = () => {
  return (
    <section className="hero_section">
      <Container>
        <Row>
          <Col lg={7} className="mb-5 mb-lg-0">
            <div className="position-relative">
              <img src={Burger} className="img-fluid" alt="Hero" />
              <div className="price_badge">
                <div className="badge_text">
                  <h4 className="h4_xs">Only</h4>
                  <h4 className="h3_lg">$79.99</h4>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={5}>
            <div className="hero_text text-center">
              <h1 className="text-white">Padel Court</h1>
              <h2 className="text-white">Book NOW!</h2>
              <p className="text-white pt-2 pb-4">
              Experience padel like never before on our premium courts. Perfect for all skill levels—join us for fun, fitness, and community!
              </p>
              <Link to="/courts" className="btn order_now">
                BOOK
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Section1;
