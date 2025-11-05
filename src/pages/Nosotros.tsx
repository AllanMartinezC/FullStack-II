import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// Asegúrate de importar la imagen
import frutasYVerdurasImg from '../assets/img/frutas-y-verduras.jpg'; 
// Si tu Footer es un componente, asegúrate de importarlo
// import { Footer } from '../components/Footer'; 

export const Nosotros = () => {
    useEffect(() => {
        document.title = 'HuertoHogar — Nosotros';
        
        if (typeof window !== 'undefined' && typeof (window as any).renderAuthArea === 'function') {
            (window as any).renderAuthArea();
        }
        if (typeof window !== 'undefined' && typeof (window as any).updateCartBadge === 'function') {
            (window as any).updateCartBadge();
        }
    }, []);

    return (
        <div className="page-container">
            {/* 🛑 AQUÍ DEBE IR EL HEADER / NAVBAR GLOBAL DE TU APP SI LO TIENES */}

            <main>
                <section
                    className="nosotros"
                    style={{ maxWidth: 1000, margin: '40px auto', padding: 20 }}
                >
                    <h2
                        className="nosotros-heading"
                        style={{ textAlign: 'center', marginBottom: 20, color: '#2E8B57' }}
                    >
                        Sobre HuertoHogar
                    </h2>

                    <p style={{ lineHeight: 1.6, textAlign: 'justify', marginBottom: 30 }}>
                        <strong>HuertoHogar</strong> es una tienda online dedicada a llevar la frescura y calidad de los productos
                        del campo directamente a la puerta de nuestros clientes en Chile. Con más de 6 años de experiencia,
                        operamos en más de 9 puntos a lo largo del país, incluyendo ciudades clave como Santiago, Puerto Montt,
                        Villarica, Nacimiento, Viña del Mar, Valparaíso y Concepción. Nuestra misión es conectar a las familias
                        chilenas con el campo, promoviendo un estilo de vida saludable y sostenible.
                    </p>

                    <section
                        className="nosotros-mision"
                        style={{ maxWidth: 1000, margin: '0 auto', padding: 20 }}
                    >
                        <h3 style={{ marginBottom: 12 }}>Misión</h3>
                        <p style={{ lineHeight: 1.6, textAlign: 'justify' }}>
                            Nuestra misión es proporcionar productos frescos y de calidad directamente desde el campo hasta la puerta
                            de nuestros clientes, garantizando la frescura y el sabor en cada entrega. Nos comprometemos a fomentar
                            una conexión más cercana entre los consumidores y los agricultores locales, apoyando prácticas agrícolas
                            sostenibles y promoviendo una alimentación saludable en todos los hogares chilenos.
                        </p>
                    </section>
                    
                    {/* 🛑 AQUÍ SE INSERTA LA IMAGEN */}
                    <div style={{ textAlign: 'center', margin: '30px 0' }}> {/* Contenedor para centrar la imagen */}
                        <img 
                            src={frutasYVerdurasImg} 
                            alt="Variedad de frutas y verduras frescas de HuertoHogar" 
                            style={{ 
                                maxWidth: '100%',     // Asegura que no se desborde en móviles
                                height: 'auto',        // Mantiene la proporción
                                borderRadius: '12px',  // Bordes redondeados
                                boxShadow: '0 8px 20px rgba(0,0,0,0.1)', // Sombra sutil
                                border: '1px solid #e0e0e0' // Borde suave
                            }} 
                        />
                    </div>

                </section>
            </main>
            
    
        </div>
    );
};

export default Nosotros;