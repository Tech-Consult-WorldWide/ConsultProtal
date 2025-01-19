# **ConsultPortal Frontend**

The frontend for **ConsultPortal**, a real-time expert consultation platform. The frontend provides an intuitive interface for clients to book appointments, view expert availability, and chat with experts.

---

## **Features**

1. **User Authentication**:
   - Login and registration using Firebase Authentication.

2. **Expert Listing**:
   - Displays a searchable list of experts along with their specialization, availability, and bio.

3. **Real-Time Availability Tracker**:
   - Displays the real-time availability status of experts (`Available`, `Busy`, or `Offline`).

4. **Appointment Booking**:
   - Clients can select an expert, choose a date and time, and book an appointment.

5. **Real-Time Chat**:
   - Clients and experts can engage in live conversations.

---

## **Technology Stack**

- **React**: For building the user interface.
- **CSS**: For styling and responsive design.
- **React Router**: For routing and navigation.
- **Firebase**:
  - Authentication: For secure user login.
  - Firestore: For fetching expert and client data.
- **Solace Event Broker**: For real-time updates and communication.

---

## **Project Structure**

```
frontend/
├── build/                  # Production-ready build files (generated after build)
├── node_modules/           # Installed dependencies
├── public/                 # Static assets
│   ├── index.html          # Main HTML file
│   ├── favicon.ico         # Favicon
│   └── logo.svg            # Application logo
├── src/                    # Main source code
│   ├── components/         # Reusable React components
│   │   ├── Availability/   # Availability tracker components
│   │   │   ├── AvailabilityTracker.css
│   │   │   └── AvailabilityTracker.js
│   │   ├── Chat/           # Chat system components
│   │   │   ├── Chat.css
│   │   │   ├── Chat.js
│   │   │   └── ChatWrapper.js
│   │   ├── ExpertCard.tsx  # Expert card component
│   │   ├── infoLabel.tsx   # Info label component
│   │   └── Notify.tsx      # Notification component
│   ├── pages/              # Page components
│   │   ├── user/           # User-related pages
│   │   │   ├── client/     # Client-specific pages
│   │   │   │   ├── ClientDashboard.css
│   │   │   │   ├── ClientDashboard.js
│   │   │   │   └── ExpertProfile.js
│   │   │   ├── BookAppointment.tsx  # Appointment booking page
│   │   │   ├── Dashboard.css        # Dashboard styling
│   │   │   ├── Dashboard.js         # Dashboard page
│   │   │   ├── HomePage.css         # Homepage styling
│   │   │   ├── HomePage.tsx         # Homepage
│   │   │   ├── Login.css            # Login styling
│   │   │   ├── Login.tsx            # Login page
│   │   │   ├── Profile.css          # Profile styling
│   │   │   ├── Profile.tsx          # Profile page
│   │   │   ├── Setting.css          # Settings styling
│   │   │   ├── Settings.js          # Settings page
│   │   │   ├── SignUp.css           # Signup styling
│   │   │   └── SignUp.tsx           # Signup page
│   ├── api.js              # API utilities for interacting with the backend
│   ├── App.css             # Global styling
│   ├── App.js              # Main React application
│   ├── App.test.js         # Unit tests for the App component
│   ├── Firebase.js         # Firebase configuration
│   ├── index.css           # Global styles for the application
│   ├── index.js            # Entry point for the React application
│   ├── reportWebVitals.js  # Performance reporting
│   ├── setupTests.js       # Test setup
│   ├── solaceClient.js     # Solace client for real-time communication
├── .env                    # Environment variables
├── .gitignore              # Git ignore rules
├── craco.config.js         # Configuration for Create React App with custom overrides
├── package-lock.json       # Dependency lock file
├── package.json            # Dependency list and project scripts
├── README.md               # Project documentation
├── tailwind.config.js      # Tailwind CSS configuration (if used)
```

---

## **Setup Instructions**

### **1. Clone the Repository**

```bash
git clone <frontend-repo-url>
cd frontend
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Configure Environment Variables**

Create a `.env` file in the root directory and add the following:

```bash
REACT_APP_BACKEND_URL=http://localhost:9000
REACT_APP_SOLACE_URL=wss://<your-solace-host>:443
REACT_APP_SOLACE_VPN=<your-vpn-name>
REACT_APP_SOLACE_USERNAME=<your-username>
REACT_APP_SOLACE_PASSWORD=<your-password>
```

### **4. Start the Development Server**

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## **Solace Integrations**

### **1. Real-Time Availability**
   - The frontend subscribes to the topic: `app/expert/status/<expertId>` to display real-time availability.

**Code Example**:

_File: components/Availability/AvailabilityTracker.js_

```javascript
import solace from "solace";

const subscribeToAvailability = (expertId, setAvailability) => {
  const topic = `app/expert/status/${expertId}`;
  const session = solace.SolclientFactory.createSession({
    url: process.env.REACT_APP_SOLACE_URL,
    vpnName: process.env.REACT_APP_SOLACE_VPN,
    userName: process.env.REACT_APP_SOLACE_USERNAME,
    password: process.env.REACT_APP_SOLACE_PASSWORD,
  });

  session.on(solace.SessionEventCode.MESSAGE, (message) => {
    const data = JSON.parse(message.getBinaryAttachment());
    setAvailability(data.status);
  });

  session.connect(() => {
    session.subscribe(
      solace.SolclientFactory.createTopicDestination(topic),
      true,
      "availability-subscription",
      10000
    );
  });
};
```

### **2. Real-Time Chat**
   - Chat messages are subscribed to and published on the topic: `app/chat/<conversationId>`.

**Code Example**:

_File: components/Chat/Chat.js_

```javascript
import solace from "solace";
import React, { useState, useEffect } from "react";

const Chat = ({ conversationId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const session = solace.SolclientFactory.createSession({
      url: process.env.REACT_APP_SOLACE_URL,
      vpnName: process.env.REACT_APP_SOLACE_VPN,
      userName: process.env.REACT_APP_SOLACE_USERNAME,
      password: process.env.REACT_APP_SOLACE_PASSWORD,
    });

    session.on(solace.SessionEventCode.MESSAGE, (message) => {
      const data = JSON.parse(message.getBinaryAttachment());
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    session.connect(() => {
      const topic = `app/chat/${conversationId}`;
      session.subscribe(
        solace.SolclientFactory.createTopicDestination(topic),
        true,
        "chat-subscription",
        10000
      );
    });

    return () => session.disconnect();
  }, [conversationId]);

  const sendMessage = () => {
    const session = solace.SolclientFactory.createSession({ /* config */ });
    const message = solace.SolclientFactory.createMessage();

    message.setDestination(
      solace.SolclientFactory.createTopicDestination(`app/chat/${conversationId}`)
    );
    message.setBinaryAttachment(
      JSON.stringify({ senderId: userId, content: newMessage, timestamp: new Date().toISOString() })
    );

    session.send(message);
    setNewMessage("");
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.senderId}:</strong> {msg.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
```

---

## **Future Enhancements**

1. **Push Notifications**:
   - Notify clients and experts about new messages or updates using Firebase Cloud Messaging.

2. **Video Conferencing**:
   - Add support for video/audio calls using WebRTC or Twilio.

3. **Admin Dashboard**:
   - Include a dashboard for administrators to monitor and manage users.

4. **AI-Powered Recommendations**:
   - Use AI to help clients select the right expert based on their needs.
