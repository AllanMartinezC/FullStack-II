// src/pages/CategoryProducts.tsx
import { useParams, Link } from "react-router-dom";
import { productsData } from "../data/ProductsData";
import { sameCategory } from "../components/slug"; 
import { useEffect } from "react"; 

export const CategoryProducts = () => {
    const { category = "" } = useParams();
    const decoded = decodeURIComponent(category);

    const items = productsData.filter(p => sameCategory(p.category, decoded));
    
    // Cambiar el título dinámicamente
    useEffect(() => {
        document.title = `HuertoHogar — Productos en ${decoded}`;
    }, [decoded]);


    return (
      
        <div className="page-container">
            
            {}

            {}
            <nav className="breadcrumb" style={{maxWidth: 1000, margin: "16px auto 0", padding: "0 20px"}}>
                <Link to="/">Home</Link> / <Link to="/productos">Productos</Link> / <span style={{fontWeight: 'bold'}}>{decoded}</span>
            </nav>

            <main>
                <section className="productos-lista" style={{maxWidth: 1000, margin: "20px auto 40px", padding: "0 20px"}}>
                    <h2 style={{textTransform: "capitalize", fontSize: "2rem", marginBottom: "20px", color: "#4aa056"}}>
                        Productos — {decoded}
                    </h2>

                    {items.length === 0 ? (
                        <div style={{marginTop: 20}}>
                            <p>No encontramos productos en “{decoded}”.</p>
                            <p>
                                <Link to="/categorias" style={{color: "#5dbb63"}}>Volver a Categorías</Link> ·{" "}
                                <Link to="/productos" style={{color: "#5dbb63"}}>Ver todos los productos</Link>
                            </p>
                        </div>
                    ) : (
                        
                        <div className="galeria" style={{marginTop: 20}}>
                            {items.map(p => (
                             
                                <div key={p.id} className="producto">
                                    <Link to={`/detalle/${p.id}`}>
                                        {}
                                        <img src={p.imageSrc} alt={p.title} /> 
                                        
                                        {}
                                        <h3>{p.title}</h3> 
                                    </Link>
                                    
                                    {}
                                    <p className="precio">${p.price} / {p.unit}</p> 
                                    
                                    {p.stock !== undefined && p.stock !== null && (
                                        <p className="Stock" style={{color: Number(p.stock) > 0 ? '#10b981' : '#618d69ff'}}>
                                            Stock {p.stock} disponibles
                                        </p>
                                    )}
                                    <Link to={`/detalle/${p.id}`} className="btn">Ver Producto</Link>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
                     
        </div>
    );
};

export default CategoryProducts;