import React from 'react';

function ExpertProfileCard({ expert }) {
  return (
    <div className="expert-card">
      <img src={expert.image} alt="Expert" className="expert-image" />
      <div className="expert-info">
        <h3>{expert.name}</h3>
        <p>{expert.summary}</p>
        <button className="profile-button">Profile</button>
      </div>
    </div>
  );
}

export default ExpertProfileCard;
