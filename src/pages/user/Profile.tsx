import React, { useEffect, useState } from "react";
import { auth, db } from "../../Firebase"; // Import Firebase auth and Firestore
import { doc, getDoc } from "firebase/firestore"; // Firestore functions
import "./Profile.css";
import InfoCard from "./../components/infoLabel.tsx";

function Profile() {
  const [userData, setUserData] = useState({ username: "", email: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser; // Get the currently authenticated user
        if (user) {
          const userDoc = doc(db, "users", user.uid); // Reference the user's Firestore document
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            setUserData(userSnapshot.data()); // Set the user data from Firestore
          } else {
            console.error("No user data found in Firestore");
          }
        } else {
          console.error("No authenticated user found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Stop the loading state
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="profile-container">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p>Update your personal details and preferences below.</p>

      <form className="profile-form">
        <InfoCard label={"Name"} value={userData.username || "N/A"} />
        <InfoCard label={"Email"} value={userData.email || "N/A"} />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default Profile;
