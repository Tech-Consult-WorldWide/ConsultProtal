import React from 'react';

type InfoCardProps = {
  label: string;
  value: string;
};

const InfoCard = ({ label, value }: InfoCardProps) => {
  return (
    <div>
      <label htmlFor="name">{label}</label>
      <input type="text" id="name" placeholder={value} disabled />
    </div>
  );
};

export default InfoCard;
