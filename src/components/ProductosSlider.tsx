import React from "react";
import { productsData } from "../data/ProductsData";
import { Link } from "react-router-dom";
import "./ProductSlider.css";

export const ProductSlider: React.FC = () => {
  
  const items = productsData.slice(0, 12);

  return (
    <div className="hh-loop-slider">
      {}
      <div className="hh-fade hh-fade-left" />
      <div className="hh-fade hh-fade-right" />

      {}
      <div className="hh-loop-track" aria-hidden="false">
        {[...items, ...items].map((p, i) => (
          <div key={`${p.id}-${i}`} className="hh-loop-item">
            <Link to={`/detalle/${p.id}`}>
              <img src={p.imageSrc} alt={p.title} />
              <h5>{p.title}</h5>
            </Link>
            <p className="precio">${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
