import React from "react";
import "../css/Card.css";

const Card = ({ name, imageUrl, number, types, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={imageUrl} alt={name} />
      <div className="card-content">
        <h2>{name}</h2>
        <h2>#{number}</h2>
        <div className="types">
          {types.map((type, index) => (
            <span key={index} className={`type ${type}`}>
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
