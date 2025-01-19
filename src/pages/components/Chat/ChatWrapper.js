import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../../../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Chat from "./Chat";

const ChatWrapper = () => {
  const { conversationId } = useParams();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = doc(db, "users", user.uid);
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            const data = userSnapshot.data();
            setUserId(data.username || user.uid);
          } else {
            console.error("No user data found in Firestore");
            setError("User data not found.");
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError("Failed to fetch user data.");
        }
      } else {
        console.error("No authenticated user found");
        setError("User is not authenticated.");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error)   return <div>{error}</div>;

  return <Chat conversationId={conversationId} userId={userId} />;
};

export default ChatWrapper;