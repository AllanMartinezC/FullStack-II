import React from 'react'
import { Footer } from '../components/Footer';

export const Home = () => {
 return (
    <div>
      {/* Barra superior */}
      <header className="topbar">
        <div className="logo">
          <a href="index.html" className="brand">🍎 HuertoHogar</a>
        </div>

        <nav className="menu">
          <a href="index.html">HOME</a> |
          <a href="productos.html">PRODUCTOS</a> |
          <a href="categorias.html">CATEGORIAS</a> |
          <a href="nosotros.html">NOSOTROS</a> |
          <a href="blogs.html">BLOGS</a> |
          <a href="contacto.html">CONTACTO</a>
        </nav>

        <div className="topbar-right">
          <a href="carrito.html" className="cart-link">🛒 Carrito (<span id="cart-count">0</span>)</a>
          <div id="auth-area"></div>
        </div>
      </header>

      {/* Sub-barra de login */}
      <div className="login-bar">
        <a href="login.html">Iniciar Sesión</a> |
        <a href="registro.html">Registrarse</a>
      </div>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-text">
            <h1>HuertoHogar</h1>
            <p>HuertoHogar es una tienda online dedicada a llevar la frescura y calidad de los productos del campo directamente a la puerta de nuestros clientes en Chile.</p>
            <a href="productos.html" className="btn">Ver Productos</a>
          </div>
          <div className="hero-img">
            <img src="imagenes/Huerto.jpeg" alt="Foto-Huerto" />
          </div>
        </section>

        {/* Productos Destacados */}
        <section className="productos-destacados">
          <h2>Nuestros Productos</h2>
          <div className="galeria">
            <div className="producto">
              <a href="manzana_fuji.html" className="producto-link">
                <img src="imagenes/manzana_fuji.jpg" alt="Manzanas Fuji" />
                <h5>FR001 - Manzanas Fuji</h5>
              </a>
              <p className="atributo">Precio Kilo</p>
              <p className="precio">$1.200</p>
              <p className="Stock">Stock 150 KL</p>
              <a href="manzana_fuji.html" className="btn">Ver Producto</a>
            </div>

            <div className="producto">
              <a href="naranja_valencia.html" className="producto-link">
                <img src="imagenes/naranjas_valencia.jpg" alt="Naranjas Valencia" />
                <h5>FR002 - Naranjas Valencia</h5>
              </a>
              <p className="atributo">Precio Kilo</p>
              <p className="precio">$1.000</p>
              <p className="Stock">Stock 200 KL</p>
              <a href="naranja_valencia.html" className="btn">Ver Producto</a>
            </div>

            <div className="producto">
              <a href="platano.html" className="producto-link">
                <img src="imagenes/Cavendish_Banannas.jpg" alt="Plátanos Cavendish" />
                <h5>FR003 - Plátanos Cavendish</h5>
              </a>
              <p className="atributo">Precio Kilo</p>
              <p className="precio">$800</p>
              <p className="Stock">Stock 250 KL</p>
              <a href="platano_.html" className="btn">Ver Producto</a>
            </div>

            <div className="producto">
              <img src="imagenes/zanahoria.jpg" alt="Producto 4" />
              <h5>VR001 - Zanahorias Orgánicas</h5>
              <p className="atributo">Precio Kilo</p>
              <p className="precio">$900</p>
              <p className="Stock">Stock 100 KL</p>
            </div>

            <div className="producto">
              <img src="imagenes/espinacas.png" alt="Producto 5" />
              <h5>VR002 - Espinacas Frescas</h5>
              <p className="atributo">Precio Bolsa</p>
              <p className="precio">$700</p>
              <p className="Stock">Stock 80 bolsas</p>
            </div>

            <div className="producto">
              <img src="imagenes/pimientos.jpg" alt="Producto 6" />
              <h5>VR003 - Pimientos Tricolores</h5>
              <p className="atributo">Precio Kilo</p>
              <p className="precio">$1.500</p>
              <p className="Stock">Stock 120 KL</p>
            </div>

            <div className="producto">
              <img src="imagenes/miel-organica.jpg" alt="Producto 7" />
              <h5>PO001 - Miel Orgánica</h5>
              <p className="atributo">Precio Frasco</p>
              <p className="precio">$5.000</p>
              <p className="Stock">Stock 50 Frascos</p>
            </div>

            <div className="producto">
              <img src="imagenes/quinua-organica.jpg" alt="Producto 8" />
              <h5>PO003 - Quinua Orgánica</h5>
              <p className="atributo">Precio Kilo</p>
              <p className="precio">$2.100</p>
              <p className="Stock">Stock 80 KL</p>
            </div>

            <div className="producto">
              <img src="imagenes/leche-entera.jpg" alt="Producto 9" />
              <h5>PL001 - Leche Entera</h5>
              <p className="atributo">Precio Litro</p>
              <p className="precio">$1.250</p>
              <p className="Stock">Stock 90 Lt</p>
            </div>
          </div>
        </section>
        <><Footer/>       </>
      </main>

      {/* Pie de página */}
      <footer>
      
      </footer>
    </div>
  );
}

export default Home;
