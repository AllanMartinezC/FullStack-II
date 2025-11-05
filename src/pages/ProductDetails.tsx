import { useParams, Link } from "react-router-dom";
import { useState } from "react"; 
import { productsData } from "../data/ProductsData";
import { Footer } from "../components/Footer";
import { useCart } from "../context/CartContext"; 

export const ProductDetail = () => {
    const { id } = useParams();
    const product = productsData.find(p => p.id === Number(id));
    const { add } = useCart(); 

    
    const [quantity, setQuantity] = useState(1); 
    
    const handleAddToCart = () => {
        if (product) {
            const itemToAdd = {
                productId: product.id,
                title: product.title,
                price: product.price,
                unit: product.unit,
                imageSrc: product.imageSrc,
            };

            add(itemToAdd, quantity);
            console.log(`¡${quantity} unidad(es) de ${product.title} añadidas al carrito!`); 
        }
    };

    const increment = () => setQuantity(prev => prev + 1);
    const decrement = () => setQuantity(prev => Math.max(1, prev - 1));

    if (!product) {
        
        return (
            <div className="detalle-wrap" style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Producto no encontrado</h2>
                <Link to="/productos" style={{ color: '#5dbb63', textDecoration: 'underline' }}>Volver a Productos</Link>
                <Footer />
            </div>
        );
    }

    // --- Componente Principal ---
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9f9f9' }}>
            
            {}
            <nav className="breadcrumb p-4 text-sm font-medium bg-white" style={{ 
                color: '#344e41',
                borderBottom: '1px solid #e5e7eb',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
            }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <Link to="/" style={{ textDecoration: 'none', color: '#4aa056', transition: 'color 0.2s' }}>Home</Link> 
                    <span className="mx-2 text-gray-400">/</span>
                    <Link to="/productos" style={{ textDecoration: 'none', color: '#4aa056', transition: 'color 0.2s' }}>Productos</Link> 
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="font-bold text-gray-700">{product.title}</span>
                </div>
            </nav>

            <main className="flex-grow">
                {}
                <section className="detalle-wrap">
                    
                    {}
                    <div className="detalle-content">
                        
                        {/* 1. Columna de Imagen */}
                        <div className="detalle-img-wrapper">
                            <img
                                className="detalle-img"
                                src={product.imageSrc}
                                alt={product.title}
                            />
                        </div>

                        {/* 2. Columna de Información */}
                        <div className="detalle-info">
                            
                            {/* Título y Categoría */}
                            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', color: '#2c7a38' }}>{product.title}</h1>
                            <p className="detalle-cat" style={{ color: '#4aa056', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                                {product.category}
                            </p>
                            
                            {/* Precio y Stock Destacado */}
                            <div className="price-stock-box">
                                <p className="detalle-precio" style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '0.25rem', color: '#4aa056' }}>
                                    ${product.price} 
                                    <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#6b7280', marginLeft: '0.5rem' }}> / {product.unit ?? "unidad"}</span>
                                </p>
                                {product.stock !== undefined && product.stock !== null && (
                                    <p style={{ fontSize: '1rem', fontWeight: '600', color: Number(product.stock) > 0 ? '#10b981' : '#ef4444' }}>
                                        Stock: {product.stock} disponibles
                                    </p>
                                )}
                            </div>

                            {/* Descripción */}
                            {product.description && (
                                <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#374151', borderBottom: '2px solid #ccc', paddingBottom: '5px' }}>Detalles del Producto</h3>
                                    <p className="detalle-desc" style={{ color: '#4b5563', lineHeight: '1.6', fontSize: '1.1rem' }}>{product.description}</p>
                                </div>
                            )}

                            {/* CONTADOR Y BOTÓN DE CARRITO */}
                            <div className="detalle-cta" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#374151', marginRight: '0.5rem' }}>Cantidad:</span>
                                    
                                    {/* Contador de Cantidad (manteniendo el estilo CSS base) */}
                                    <div className="qty-controls" style={{ gap: '0' }}> 
                                        <button onClick={decrement} disabled={quantity <= 1}>−</button>
                                        <input type="number" min={1} value={quantity} readOnly 
                                            style={{ width: '50px', height: '36px', padding: '0', border: '1px solid #cfd4dc', textAlign: 'center' }} 
                                        />
                                        <button onClick={increment}>+</button>
                                    </div>
                                </div>

                                {/* Botones CTA */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
                                    <button
                                        className="btn-add-to-cart"
                                        style={{ flex: 2 }} /* Ajustamos el flexbox */
                                        onClick={handleAddToCart}
                                    >
                                        🛒 Añadir {quantity} {product.unit ? "a(s)" : ""} al carrito
                                    </button>
                                    
                                    <Link to="/productos" 
                                        className="btn-outline"
                                        style={{ flex: 1, padding: '15px 20px', textAlign: 'center' }} /* Ajustamos el flexbox */
                                    >
                                        Volver a Productos
                                    </Link>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
};

export default ProductDetail;