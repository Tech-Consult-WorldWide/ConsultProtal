import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get the expert's ID from the URL
import { db } from "../../Firebase"; // Import Firestore
import { doc, getDoc } from "firebase/firestore"; // Firestore functions
import "./HomePage.css";
import "./BookAppointment.css"

function BookAppointmentPage() {
  const { expertId } = useParams(); // Get expert ID from URL
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpertDetails = async () => {
      try {
        // Reference to the specific expert document in Firestore
        const expertDoc = doc(db, "Experts", expertId);
        const expertSnapshot = await getDoc(expertDoc);

        if (expertSnapshot.exists()) {
          setExpert(expertSnapshot.data());
        } else {
          setError("Expert not found.");
        }
      } catch (err) {
        setError("Failed to fetch expert details.");
      } finally {
        setLoading(false);
      }
    };

    fetchExpertDetails(); // Fetch expert data
  }, [expertId]);

  if (loading) {
    return <div>Loading expert details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="book-appointment-container">
      <h1>Book an Appointment with {expert.name}</h1>
      <div className="expert-details">
        <img
          src={expert.photoUrl || "https://via.placeholder.com/150"} // Fallback image
          alt={expert.name}
          className="expert-photo"
        />
        <p><strong>Specialization:</strong> {expert.specialization}</p>
        <p><strong>Availability:</strong> {expert.availability}</p>
        <p>{expert.bio}</p>
      </div>
      <form className="appointment-form">
        <label htmlFor="appointment-date">Choose Date:</label>
        <input type="date" id="appointment-date" name="appointment-date" required />
        
        <label htmlFor="appointment-time">Choose Time:</label>
        <input type="time" id="appointment-time" name="appointment-time" required />

        <button type="submit">Confirm Appointment</button>
      </form>
    </div>
  );
}

export default BookAppointmentPage;
