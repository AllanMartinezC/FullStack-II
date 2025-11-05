import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { productsData } from "../data/ProductsData";
import { toSlug } from "../components/slug"; 

export const Categorias = () => {
    useEffect(() => {
        document.title = "HuertoHogar — Categorías";
        
        if (typeof window !== "undefined" && typeof (window as any).updateCartBadge === "function") {
            (window as any).updateCartBadge();
        }
    }, []);

    const categorias = useMemo(() => {
        const map = new Map<string, { name: string; image: string | null; count: number }>();
        for (const p of productsData) {
            const key = p.category;
            if (!map.has(key)) {
                map.set(key, { name: key, image: p.imageSrc ?? null, count: 1 });
            } else {
                const ref = map.get(key)!;
                ref.count += 1;
                
                if (!ref.image && p.imageSrc) ref.image = p.imageSrc;
            }
        }
        return Array.from(map.values());
    }, []);

    return (

        <div className="page-container"> 
            {}
            
            <main>
                <section className="categorias-section">
                    <h2 className="categorias-heading">
                        Categorías de HuertoHogar
                    </h2>

                    {}
                    <div className="categorias-galeria">
  {categorias.map(cat => (
    <article key={cat.name} className="categoria-card">
      {/* 🔹 El enlace principal solo envuelve la imagen, el título y el texto */}
      <Link to={`/productos/${toSlug(cat.name)}`} className="categoria-link">
        <img
          src={cat.image ?? "/imagenes/placeholder.png"} 
          alt={cat.name}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/imagenes/placeholder.png";
          }}
        />
        <h3>{cat.name}</h3>
        <p>{cat.count} producto{cat.count !== 1 ? "s" : ""}</p>
      </Link>

      {/* 🔹 Botón fuera del link principal */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        <Link to={`/productos/${toSlug(cat.name)}`} className="btn-outline">
          Ver productos
        </Link>
      </div>
    </article>
  ))}
</div>

                </section>
            </main>
            
            {}
           
        </div>
    );
};

export default Categorias;