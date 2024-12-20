import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo/test.png";
import "../../styles/HeaderStylePages.css";

const HeaderPages = () => {
  return (
    <header>
      <Navbar className="sticky">
        <Container>
          <Navbar.Brand href="#home">
            <Link to="/" className="logo">
              <img src={Logo} alt="Logo" className="img-fluid" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" style={{ color: "black" }}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/courts" style={{ color: "black" }}>
                Court Reservation
              </Nav.Link>
              <Nav.Link as={Link} to="/Shop" style={{ color: "black" }}>
                Shop
              </Nav.Link>
              <Nav.Link as={Link} to="/Services" style={{ color: "black" }}>
                Services
              </Nav.Link>
              
              <Nav.Link as={Link} to="/Cart" style={{ color: "black" }}>
                <div className="cart">
                  <i className="bi bi-bag fs-5"></i>
                  <em className="roundpoint">2</em>
                </div>
              </Nav.Link>
              <Nav.Link as={Link} to="/Profile" style={{ color: "black" }}>
                <div className="cart">
                  <i style={{ fontSize: "28px", position: "relative", top: "-0.320rem" }} className="bi bi-person"></i>
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default HeaderPages;
