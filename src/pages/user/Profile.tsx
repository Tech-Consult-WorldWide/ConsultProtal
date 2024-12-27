import React, { useEffect, useState } from "react";
import { auth, db } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "./Profile.css";
import InfoCard from "./../components/infoLabel.tsx";

interface UserData {
  username: string;
  email: string;
}

function Profile() {
  const [userData, setUserData] = useState<UserData>({ username: "", email: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = doc(db, "users", user.uid);
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            const data = userSnapshot.data();
            setUserData({
              username: data.username || "N/A",
              email: data.email || "N/A",
            });
          } else {
            console.error("No user data found in Firestore");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.error("No authenticated user found");
      }

      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
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
      </form>
    </div>
  );
}

export default Profile;
