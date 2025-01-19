import React, { useEffect, useState } from "react";
import { auth, db } from "../../../Firebase"; // Ensure this matches your Firebase import path
import { onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { updateAvailability } from "../../../api"; // Backend API call for Solace publishing
import "./AvailabilityTracker.css";

const AvailabilityTracker = () => {
  const [expertId, setExpertId] = useState(null);
  const [status, setStatus] = useState("Offline");
  const [expertName, setExpertName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch authenticated expert details
  useEffect(() => {
    const fetchExpertDetails = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const expertDoc = doc(db, "Experts", user.uid);
            const expertSnapshot = await getDoc(expertDoc);

            if (expertSnapshot.exists()) {
              const data = expertSnapshot.data();
              setExpertId(user.uid);
              setExpertName(data.name || "Expert");
              setStatus(data.availability || "Offline");
            } else {
              setError("Expert data not found in Firestore.");
            }
          } catch (err) {
            console.error("Error fetching expert details:", err);
            setError("Failed to fetch expert details.");
          }
        } else {
          console.error("No authenticated user found");
          setError("User is not authenticated.");
        }
        setLoading(false);
      });
    };

    fetchExpertDetails();
  }, []);

  // Update availability in Firestore and Solace
  const handleStatusChange = async (newStatus) => {
    if (!expertId) return;

    setLoading(true);
    try {
      // Update Firestore
      const expertDoc = doc(db, "Experts", expertId);
      await updateDoc(expertDoc, { availability: newStatus });

      // Update Solace
      const updated = await updateAvailability(expertId, newStatus);
      if (updated) {
        setStatus(newStatus);
        console.log("Availability updated successfully.");
      } else {
        console.error("Failed to update availability in Solace.");
      }
    } catch (err) {
      console.error("Error updating availability:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="availability-tracker">
      <h3>Welcome, {expertName}</h3>
      <p>Current Status: <strong>{status}</strong></p>
      <div className="status-buttons">
        <button
          className={status === "Available" ? "active" : ""}
          onClick={() => handleStatusChange("Available")}
        >
          Available
        </button>
        <button
          className={status === "Busy" ? "active" : ""}
          onClick={() => handleStatusChange("Busy")}
        >
          Busy
        </button>
        <button
          className={status === "Offline" ? "active" : ""}
          onClick={() => handleStatusChange("Offline")}
        >
          Offline
        </button>
      </div>
    </div>
  );
};

export default AvailabilityTracker;