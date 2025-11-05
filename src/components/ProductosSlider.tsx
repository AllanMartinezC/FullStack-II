import React from "react";
import { productsData } from "../data/ProductsData";
import { Link } from "react-router-dom";
import "./ProductSlider.css";

export const ProductSlider: React.FC = () => {
  // toma algunos productos y duplícalos para el loop
  const items = productsData.slice(0, 12);

  return (
    <div className="hh-loop-slider">
      {/* máscara suave en bordes */}
      <div className="hh-fade hh-fade-left" />
      <div className="hh-fade hh-fade-right" />

      {/* pista que se mueve en X de forma infinita */}
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
