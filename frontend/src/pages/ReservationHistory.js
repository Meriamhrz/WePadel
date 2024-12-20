import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

const ReservationHistory = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/api/reservations", {
          withCredentials: true, // Enable sending cookies with the request
        });
        setReservations(response.data); // Set reservations data
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to fetch reservation history."); // Set error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchReservations();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while waiting for data
  }

  if (error) {
    return <div>{error}</div>; // Show error message if fetch fails
  }

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Reservation History</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {reservations.map((reservation) => (
          <Col key={reservation._id}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>
                  Court <span className="text-primary">{reservation.courtId?.name || "N/A"}</span>
                </Card.Title>
                <Card.Text>
                  <strong>Reserved by:</strong> {reservation.userId?.name || "Unknown"}
                </Card.Text>
                <Card.Text>
                  <strong>Date:</strong> {reservation.date}
                </Card.Text>
                <Card.Text>
                  <strong>Time:</strong> {reservation.time}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ReservationHistory;
