import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import LayoutPagesAdmin from "../components/Layouts/LayoutPagesAdmin";
import "../styles/ManageReservations.css"

const ManageReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/api/reservations", {
          withCredentials: true,
        });
        console.log("Reservations fetched:", response.data);
        setReservations(response.data);
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to fetch reservation history.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const liberateCourt = async (reservationId) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/reservations/liberate/${reservationId}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setReservations((prevReservations) =>
          prevReservations.filter((reservation) => reservation._id !== reservationId)
        );
        setSuccessMessage("Court liberated successfully!");
      }
    } catch (err) {
      console.error("Liberation Error:", err);
      setError("Failed to liberate court. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <LayoutPagesAdmin>
      <div className="container2">
      <Container className="my-5">
        <h1 className="text-center mb-4">Manage Reservations</h1>
        {successMessage && (
          <Alert variant="success" onClose={() => setSuccessMessage(null)} dismissible>
            {successMessage}
          </Alert>
        )}
        <Row xs={1} md={2} lg={3} className="g-4">
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <Col key={reservation._id}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title>
                      Court: <span className="text-danger">{reservation.courtId?.name || "N/A"}</span>
                    </Card.Title>
                    <Card.Text>
                      <strong>Reserved by:</strong> {reservation.userId?.userName || "Unknown"}
                    </Card.Text>
                    <Card.Text>
                      <strong>Date:</strong> {new Date(reservation.date).toLocaleDateString()}
                    </Card.Text>
                    <Card.Text>
                      <strong>Time:</strong> {reservation.time || "N/A"}
                    </Card.Text>
                    <Button
                      variant="outline-danger"
                      className="mt-3"
                      onClick={() => liberateCourt(reservation._id)}
                    >
                      Liberate Court
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <div className="text-center">
              <p>No reservations found.</p>
            </div>
          )}
        </Row>
      </Container>
      </div>
    </LayoutPagesAdmin>

  );
};

export default ManageReservations;
