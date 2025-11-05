import { useEffect } from "react";
import { Link } from "react-router-dom";
import { productsData } from "../data/ProductsData";
import { useCart } from "../context/CartContext";
import { useState } from "react";

type CardProps = {
  id: number;
  title: string;
  price: number;
  unit: string;
  imageSrc: string;
};

const ProductCard = ({ id, title, price, unit, imageSrc }: CardProps) => {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="producto">
      <Link to={`/detalle/${id}`}>
        <img src={imageSrc} alt={title} />
        <h3>{title}</h3>
      </Link>

      <p className="precio">${price} / {unit}</p>

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
        <button onClick={() => setQty(q => Math.max(1, q - 1))}>–</button>
        <input
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
          style={{ width: 60, textAlign: "center" }}
        />
        <button onClick={() => setQty(q => q + 1)}>+</button>

        <button
          className="btn"
          onClick={() => add({ productId: id, title, price, unit, imageSrc }, qty)}
          style={{ marginLeft: 8 }}
        >
          Añadir
        </button>
      </div>
    </div>
  );
};

export const Products = () => {
 const { totalItems } = useCart();

 useEffect(() => {
  document.title = "Productos — HuertoHogar";
 }, []);

 return (
  <div>
   {}

   {}

   <main>
    <section className="productos-lista">
     <h2>Todos los productos</h2>
     
     <div className="galeria">
      {productsData.map((p) => (
       <ProductCard
        key={p.id}
        id={p.id}
        title={p.title}
        price={p.price}
        unit={p.unit}
        imageSrc={p.imageSrc}
       />
      ))}
     </div>
    </section>
   </main>
  </div>
 );
};