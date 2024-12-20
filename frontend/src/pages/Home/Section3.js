import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image1 from "../../assets/products/racket-11.jpg";
import Image2 from "../../assets/products/racket-12.jpg";
import Image3 from "../../assets/products/racket-13.jpg";
import Image4 from "../../assets/products/racket-14.jpg";
import Image5 from "../../assets/products/racket-15.jpg";
import Image6 from "../../assets/products/racket-16.jpg";
import Image7 from "../../assets/products/racket-17.jpg";
import Image8 from "../../assets/products/racket-18.jpg";
import Cards from "../../components/Layouts/Cards";
import { Link } from "react-router-dom";


const mockData = [
  {
    id: "0001",
    image: Image1,
    title: "BULLPADEL",
    paragraph: "Raider Control",
    rating: 5,
    price: 69.99,
  },
  {
    id: "0002",
    image: Image2,
    title: "BABOLAT",
    paragraph: "Counter Veron 2024",
    rating: 4.5,
    price: 179.99,
  },
  {
    id: "0003",
    image: Image3,
    title: "ADIDAS",
    paragraph: "Metalbone Hard + 2024",
    rating: 4,
    price: 249.99,
  },
  {
    id: "0004",
    image: Image4,
    title: "SIUX",
    paragraph: "Electra ST3 Stupa Lite 2024",
    rating: 3.5,
    price: 139.99,
  },
  {
    id: "0005",
    image: Image5,
    title: "NOX",
    paragraph: "AT10 Genius Pro Cup 2024",
    rating: 3.0,
    price: 129.99,
  },
  {
    id: "0006",
    image: Image6,
    title: "WILSON",
    paragraph: "Carbon Force",
    rating: 3,
    price: 79.99,
  },
  {
    id: "0007",
    image: Image7,
    title: "HEAD",
    paragraph: "Speed Motion LTD Ari Sanchez",
    rating: 2.5,
    price: 99.99,
  },
  {
    id: "0008",
    image: Image8,
    title: "BULLPADEL",
    paragraph: "Ionic Light",
    rating: 2.0,
    price: 59.99,
  },
  
];


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

function Section3() {
  return (
    <section className="menu_section">
      <Container>
        <Row>
          <Col lg={{ span: 8, offset: 2 }} className="text-center mb-5">
            <h2 style={{color:'lightblue'}}>OUR PREMIUM PRODUCTS</h2>
            <p className="para">
            Here are some of our best selling products, including high-quality rackets, durable balls, and premium accessories, all designed to elevate your padel game.
            </p>
          </Col>
        </Row>
        <Row>
          {mockData.map((cardData, index) => (
            <Cards
              key={index}
              image={cardData.image}
              rating={cardData.rating}
              title={cardData.title}
              paragraph={cardData.paragraph}
              price={cardData.price}
              renderRatingIcons={renderRatingIcons}
            />
          ))}
        </Row>

        <Row className="pt-5">
          <Col sm={6} lg={5}>
            <div className="ads_box1 ads_img1 mb-5 mb-md-0">
              <h4 className="mb-0">CHOOSE YOUR </h4>
              <h5>COURT NOW</h5>
              <Link to="/courts" className="btn btn_red px-4 rounded-0">
                Learn More
              </Link>
            </div>
          </Col>
          <Col sm={6} lg={7}>
            <div className="ads_box ads_img2">
              <h4 className="mb-0">GET THE BEST</h4>
              <h5>COACHING LESSONS</h5>
              <Link to="/services" className="btn btn_red px-4 rounded-0">
                Learn More
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Section3;
