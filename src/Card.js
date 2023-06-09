import React from 'react';
import { Link } from 'react-router-dom';

export default function Card(props) {
  let CardName = `color_bg ${props.alt}`;
  let  image = `url(${props.images})`;
  let { title, price, onAddToBasket } = props;

  return (
    <div className="card">
      <div className="wrapper">
        <Link to={`/${title}`}>
          <div className={CardName}></div>
          <div className="card_img" style={{ "backgroundImage": image }}></div>
        </Link>
        <div className="cardInfo">
          <h1 style={{ cursor: "default" }}>{title}</h1>
          <div className="action">
            <div className="priceGroup">
              <p className="price" style={{ cursor: "default" }}>{price}</p>
            </div>
            <div className="cart" style={{ cursor: "pointer" }}>
              <svg className="outCart" xmlns="<http://www.w3.org/2000/svg>" viewBox="0 0 64 64" onClick={onAddToBasket}>
                <path d="M2 6h10l10 40h32l8-24H16"></path>
                <circle cx="23" cy="54" r="4"></circle>
                <circle cx="49" cy="54" r="4"></circle>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
