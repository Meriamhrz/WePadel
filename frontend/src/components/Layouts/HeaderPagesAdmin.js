import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo/test.png";
import "../../styles/HeaderStylePages.css";
import { useSelector } from "react-redux";

const HeaderPages = () => {
  const cartCount = useSelector((state) => state.orebi?.cartCount || 0);
  // Access cart count from Redux state
  console.log("Redux State:", cartCount);

  return (
    <header>
      <Navbar className="sticky" expand="lg">
        <Container>
          {/* Logo Section */}
          <Navbar.Brand>
            <Link to="/AdminPage" className="logo">
              <img src={Logo} alt="Logo" className="img-fluid" />
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              {/* Navigation Links */}
              <Nav.Link as={Link} to="/AdminPage" className="text-dark">
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/manage-reservations" className="text-dark">
                Manage Courts
              </Nav.Link>
              <Nav.Link as={Link} to="/manage-coach-reservations" className="text-dark">
                Manage Coaches
              </Nav.Link>
              <Nav.Link as={Link} to="/customers" className="text-dark">
                Manage Customers
              </Nav.Link>


              {/* Profile Link */}
              <Nav.Link as={Link} to="/ProfileAdmin" className="text-dark">
                <i className="bi bi-person fs-5"></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default HeaderPages;
