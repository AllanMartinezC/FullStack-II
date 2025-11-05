// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";

import { Products } from "./pages/Products";

import { Blogs } from "./pages/Blogs";

import { Categorias } from "./pages/Categorias";

import { Nosotros } from "./pages/Nosotros";

import { Contacto } from "./pages/Contacto";

import { Carrito } from "./pages/Carrito";

import Login from "./pages/Login";

import  Registro  from "./pages/Registro";

import { ProductDetail } from "./pages/ProductDetails";

import { CategoryProducts } from "./pages/ProductsCategory";

import { Navbar } from "./components/Navbar";

import { Footer } from "./components/Footer";



function App() {

  return (

    <Router>

      {/* Navbar visible siempre */}

      <Navbar />



      {}

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/productos" element={<Products />} />

        <Route path="/blogs" element={<Blogs />} />

        <Route path="/categorias" element={<Categorias />} />

        <Route path="/nosotros" element={<Nosotros />} />

        <Route path="/contacto" element={<Contacto />} />

        <Route path="/carrito" element={<Carrito />} />

        <Route path="/login" element={<Login />} />

        <Route path="/registro" element={<Registro />} />

        <Route path="/productos/:category" element={<CategoryProducts />} />

        <Route path="/detalle/:id" element={<ProductDetail />} />

      </Routes>



      {/* Footer visible siempre */}

      <Footer />

    </Router>

  );

}



export default App;