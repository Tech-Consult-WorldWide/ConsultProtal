const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const updateAvailability = async (expertId, status) => {
  const response = await fetch(`${BACKEND_URL}/update-availability`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ expertId, status }),
  });
  return response.ok;
};

export const sendMessage = async (conversationId, senderId, message) => {
  const response = await fetch(`${BACKEND_URL}/send-message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ conversationId, senderId, message }),
  });
  return response.ok;
};