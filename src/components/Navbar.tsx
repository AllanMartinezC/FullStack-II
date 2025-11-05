import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
// 1. Importar useState para manejar el estado del menú
import { useState } from "react"; 

export const Navbar = () => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  
  
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

 
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  
  return (
    <header
      className="navbar-container" 
      style={{
        backgroundColor: "#2f9d55", 
        padding: "0.6rem 1.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        position: "relative",
        zIndex: 1000,
      }}
    >
      <div className="navbar-content" style={{ display: "flex", width: "100%", maxWidth: "1200px", alignItems: "center", justifyContent: "space-between" }}>
        
        {/* Logo */}
        <div className="navbar-logo">
          <Link
            to="/"
            className="brand"
            style={{ color: "white", textDecoration: "none", fontWeight: "bold", fontSize: "1.4rem" }}
          >
            🍎 HuertoHogar
          </Link>
        </div>

        {}
        {}
        <div className="navbar-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {}
        <nav
          className={`navbar-links ${isMenuOpen ? 'active' : ''}`} 
          
        >
          <Link to="/" onClick={toggleMenu}>HOME</Link>
          <Link to="/productos" onClick={toggleMenu}>PRODUCTOS</Link>
          <Link to="/categorias" onClick={toggleMenu}>CATEGORIAS</Link>
          <Link to="/nosotros" onClick={toggleMenu}>NOSOTROS</Link>
          <Link to="/blogs" onClick={toggleMenu}>BLOGS</Link>
          <Link to="/contacto" onClick={toggleMenu}>CONTACTO</Link>
        </nav>

        {}
        <div
          className="navbar-actions" 
          
        >
          {/* Carrito */}
          <Link
            to="/carrito"
            className="cart-link"
          >
            🛒 Carrito ({totalItems})
          </Link>

          {/* Si el usuario está logueado... */}
          {user ? (
            <div className="user-info">
              <span className="user-name">
                Bienvenido {user.split("@")[0]}
              </span>
              <button
                onClick={logout}
                className="logout-btn"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="auth-link">
                Iniciar sesión
              </Link>
              <Link to="/registro" className="auth-link">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};