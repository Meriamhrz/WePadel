import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo/test.png";
import "../../styles/HeaderStyle.css";



const Header = () => {
  const [nav, setNav] = useState(false);

  // Scroll Navbar
  const changeValueOnScroll = () => {
    const scrollValue = document?.documentElement?.scrollTop;
    scrollValue > 100 ? setNav(true) : setNav(false);
  };

  window.addEventListener("scroll", changeValueOnScroll);

  return (
    <header>
      <Navbar
        collapseOnSelect
        expand="lg"
        className={`${nav === true ? "sticky" : ""}`}
      >
        <Container>
          <Navbar.Brand href="#home">
            <Link to="/" className="logo">
              <img src={Logo} alt="Logo" className="img-fluid" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/courts">
                Court Reservation
              </Nav.Link>
              <Nav.Link as={Link} to="/Shop">
                Shop
              </Nav.Link>
              <Nav.Link as={Link} to="/Services">
                Services
              </Nav.Link>
              <Nav.Link as={Link} to="/AboutUs">
                About Us
              </Nav.Link>
              
              <Nav.Link as={Link} to="/Cart">
                <div className="cart">
                  <i class="bi bi-bag fs-5"></i>
                  <em className="roundpoint">2</em>
                </div>
              </Nav.Link>
              <Nav.Link as={Link} to="/Profile">
              <div className="cart">
                <i style={{fontSize: "28px",position: "relative",top: "-0.320rem"}} class="bi bi-person"></i>
                </div>
              </Nav.Link> 
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
