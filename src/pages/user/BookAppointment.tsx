import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import InfoCard from "../components/infoLabel.tsx";
import "./HomePage.css";
import "./BookAppointment.css";

function BookAppointmentPage() {
  const { expertId } = useParams();
  const [expert, setExpert] = useState<{
    email: string;
    name: string;
    photoUrl?: string;
    specialization: string;
    availability: string;
    bio: string;
  } | null>(null);
  const [clientEmail, setClientEmail] = useState<string | null>(null);
  const [clientName, setClientName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const appointmentDate = formData.get("appointment-date");
    const appointmentTime = formData.get("appointment-time");

    if (expert && clientEmail && clientName) {
      const appointmentDetails = `Date: ${appointmentDate}, Time: ${appointmentTime}, Patient: ${clientName}`;

      try {
        setLoading(true);
        // Make API call to send confirmation emails
        const response = await fetch("https://consultportal-backend.onrender.com/send-appointment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            expertEmail: expert.email,
            clientEmail,
            appointmentDetails,
          }),
        });

        if (response.ok) {
          alert("Appointment confirmed!");
          window.location.href = "/home";
        } else {
          alert("Failed to confirm appointment. Please try again.");
          setLoading(false);
        }
      } catch (err) {
        alert("Error: Unable to send confirmation emails.");
        setLoading(false);
      }
    }
    
  };

  useEffect(() => {
    const fetchExpertDetails = async () => {
      try {
        const expertDoc = doc(db, "Experts", expertId);
        const expertSnapshot = await getDoc(expertDoc);

        if (expertSnapshot.exists()) {
          setExpert(expertSnapshot.data() as {
            email: string;
            name: string;
            photoUrl?: string;
            specialization: string;
            availability: string;
            bio: string;
          });
        } else {
          setError("Expert not found.");
        }
      } catch (err) {
        setError("Failed to fetch expert details.");
      }
    };

    const fetchClientDetails = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const userDoc = doc(db, "users", user.uid);
            const userSnapshot = await getDoc(userDoc);

            if (userSnapshot.exists()) {
              const data = userSnapshot.data();
              setClientEmail(data.email || "N/A");
              setClientName(data.username || "N/A");
            } else {
              console.error("No user data found in Firestore");
            }
          } catch (err) {
            console.error("Error fetching client data:", err);
          }
        } else {
          console.error("No authenticated user found");
        }
      });
    };

    fetchExpertDetails();
    fetchClientDetails();
    setLoading(false);
  }, [expertId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="book-appointment-container">
      <h1>Book an Appointment with {expert?.name}</h1>
      <div className="expert-details">
        <img
          src={expert?.photoUrl || "https://via.placeholder.com/150"}
          alt={expert?.name}
          className="expert-photo"
        />
        <p>
          <strong>Specialization:</strong> {expert?.specialization}
        </p>
        <p>
          <strong>Availability:</strong> {expert?.availability}
        </p>
        <p>{expert?.bio}</p>
      </div>
      <form className="appointment-form" onSubmit={handleSubmit}>
        <InfoCard label={"Name"} value={clientName || "N/A"} />

        <InfoCard label={"Email"} value={clientEmail || "N/A"} />

        <label htmlFor="appointment-date">Choose Date:</label>
        <input
          type="date"
          id="appointment-date"
          name="appointment-date"
          required
        />

        <label htmlFor="appointment-time">Choose Time:</label>
        <input
          type="time"
          id="appointment-time"
          name="appointment-time"
          required
        />

        <button type="submit" disabled={loading}>Confirm Appointment</button>
      </form>
    </div>
  );
}

export default BookAppointmentPage;
