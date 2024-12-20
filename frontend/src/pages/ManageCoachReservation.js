import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import LayoutPagesAdmin from "../components/Layouts/LayoutPagesAdmin";

const ManageCoachReservations = () => {
  const [coachReservations, setCoachReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchCoachReservations = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("auth_token"); // Get the token from cookies
        console.log(token);
        if (!token) {
          console.log("Authentication token is missing.");
          setError("Authentication token is missing. Please log in.");
          setLoading(false);
          return;
        }

        console.log("Fetching coach reservations...");
        const response = await axios.get("http://localhost:8080/api/coach-reservations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && Array.isArray(response.data)) {
          console.log("Fetched coach reservations successfully:", response.data);
          setCoachReservations(response.data);
        } else {
          console.error("Unexpected data structure:", response.data);
          setError("Failed to load coach reservations. Unexpected data structure.");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching coach reservations:", err);
        setError("Failed to load coach reservations. Please try again.");
        setLoading(false);
      }
    };

    fetchCoachReservations();
  }, []);

  const cancelCoachReservation = async (reservationId) => {
    try {
      const token = Cookies.get("auth_token"); // Get the token from cookies
      if (!token) {
        console.log("Authentication token is missing.");
        setError("Authentication token is missing. Please log in.");
        return;
      }

      console.log(`Canceling reservation with ID: ${reservationId}`);
      const reservation = coachReservations.find((res) => res._id === reservationId);

      if (!reservation) {
        console.log("Reservation not found in state.");
        setError("Reservation not found.");
        return;
      }

      const coachId = reservation.coachId._id; // Get the coach's ID from the reservation
      console.log(`Coach ID associated with reservation: ${coachId}`);

      // Cancel the reservation
      const response = await axios.delete(
        `http://localhost:8080/api/coach-reservations/${reservationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Canceled reservation response:", response);

      if (response.status === 200) {
        // Update the coach's availability by adding the canceled slot back
        const updatedAvailability = [
          ...reservation.coachId.availability,
          `${reservation.date}T${reservation.time}`,
        ];
        console.log("Updated availability to add back:", updatedAvailability);

        const updateResponse = await axios.put(
          `http://localhost:8080/api/coaches/${coachId}`,
          { availability: updatedAvailability },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Updated coach availability response:", updateResponse);

        // Remove the canceled reservation from the state
        setCoachReservations((prevReservations) =>
          prevReservations.filter((reservation) => reservation._id !== reservationId)
        );

        setSuccessMessage("Coach reservation canceled and availability updated successfully!");
      }
    } catch (err) {
      console.error("Error during cancellation:", err);
      setError("Failed to cancel coach reservation. Please try again.");
    }
  };

  return (
    <LayoutPagesAdmin>
      <div className="container2">
        <Container className="my-5">
          <h1 className="text-center mb-4">Manage Coach Reservations</h1>
          {successMessage && (
            <Alert variant="success" onClose={() => setSuccessMessage(null)} dismissible>
              {successMessage}
            </Alert>
          )}
          {error && (
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              {error}
            </Alert>
          )}
          {loading ? (
            <div className="text-center">
              <p>Loading reservations...</p>
            </div>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
              {coachReservations.length > 0 ? (
                coachReservations.map((reservation) => (
                  <Col key={reservation._id}>
                    <Card className="shadow-sm">
                      <Card.Body>
                        <Card.Title>
                          Coach: <span className="text-danger">{reservation.coachId?.name || "N/A"}</span>
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
                          onClick={() => cancelCoachReservation(reservation._id)}
                        >
                          Cancel Reservation
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <div className="text-center">
                  <p>No coach reservations found.</p>
                </div>
              )}
            </Row>
          )}
        </Container>
      </div>
    </LayoutPagesAdmin>
  );
};

export default ManageCoachReservations;
