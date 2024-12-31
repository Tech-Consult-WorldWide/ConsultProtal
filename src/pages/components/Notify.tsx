import React from 'react';
import nodemailer from 'nodemailer';

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service provider
  auth: {
    user: 'your-email@gmail.com', // Your email address
    pass: 'your-email-password', // Your email password or app password
  },
});

// Function to send confirmation email to the expert
const expertConfirmation = async (expertEmail: string, appointmentDetails: string) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: expertEmail,
    subject: 'Appointment Confirmation',
    text: `Hello Expert,

You have a new appointment. Here are the details:

${appointmentDetails}

Thank you!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent to expert successfully');
  } catch (error) {
    console.error('Error sending email to expert:', error);
  }
};

// Function to send confirmation email to the client
const customerConfirmation = async (customerEmail: string, appointmentDetails: string) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: customerEmail,
    subject: 'Appointment Confirmation',
    text: `Hello Client,

Your appointment has been confirmed. Here are the details:

${appointmentDetails}

Thank you!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent to client successfully');
  } catch (error) {
    console.error('Error sending email to client:', error);
  }
};

// Example usage in a React component
interface AppointmentConfirmationProps {
  expertEmail: string;
  clientEmail: string;
  appointmentDetails: string;
}

const AppointmentConfirmation: React.FC<AppointmentConfirmationProps> = ({ expertEmail, clientEmail, appointmentDetails }) => {
  const handleSendEmails = async () => {
    // const expertEmail = 'expert@example.com';
    // const clientEmail = 'client@example.com';
    // const appointmentDetails = `Date: 2024-01-05\nTime: 3:00 PM\nLocation: 123 Main St, CityName`;

    await expertConfirmation(expertEmail, appointmentDetails);
    await customerConfirmation(clientEmail, appointmentDetails);
  };

  return (
    <div>
      <h1>Send Appointment Confirmation Emails</h1>
      <button onClick={handleSendEmails}>Send Emails</button>
    </div>
  );
};

export default AppointmentConfirmation;
