// ExpertCard.tsx
import React from "react";
import { Link } from "react-router-dom"; // To navigate to the Book Appointment page

interface ExpertProps {
  id: string;
  name: string;
  photoUrl: string;
  specialization: string;
  availability: string;
  bio: string;
}

const ExpertCard: React.FC<ExpertProps> = ({
  id,
  name,
  photoUrl,
  specialization,
  availability,
  bio,
}) => {
  return (
    <div className="expert-card">
      <img
        src={photoUrl || "https://via.placeholder.com/150"} // Fallback image
        alt={name}
        className="expert-photo"
      />
      <h3>{name}</h3>
      <p><strong>Specialization:</strong> {specialization}</p>
      <p><strong>Availability:</strong> {availability}</p>
      <p>{bio}</p>
      <Link to={`/book-appointment/${id}`}>
        <button>Book Appointment</button>
      </Link>
    </div>
  );
};

export default ExpertCard;
