import { useEffect, useState } from "react";
import { getProductos, deleteProducto, createProducto, updateProducto, getCategorias } from "../services/productoService";
import type { Producto } from "../types";

export const AdminDashboard = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [formProd, setFormProd] = useState({
    nombre: "",
    precio: 0,
    imageUrl: "/images/placeholder.png",
    categoriaId: "" 
  });

  const IMAGE_BASE_URL = "http://localhost:8080";

  const cargarDatos = async () => {
    try {
      const [prodsData, catsData] = await Promise.all([getProductos(), getCategorias()]);
      setProductos(prodsData);
      setCategorias(catsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Panel Admin — HuertoHogar";
    cargarDatos();
  }, []);


  // 1. Eliminar
  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;
    try {
      await deleteProducto(id);
      setProductos(productos.filter(p => p.id !== id));
      alert("✅ Producto eliminado");
    } catch (err) {
      alert("❌ Error al eliminar.");
    }
  };

  // 2. Preparar Edición (Abrir modal con datos)
  const handleEdit = (producto: Producto) => {
    if (!producto.id) return;

    setEditingId(producto.id); 
    setFormProd({
        nombre: producto.nombre,
        precio: producto.precio,
        imageUrl: producto.imageUrl,
        categoriaId: producto.categoria?.id?.toString() || "" 
    });
    setShowModal(true);
  };

  // 3. Abrir Modal para Crear (Limpio)
  const openCreateModal = () => {
    setEditingId(null); 
    setFormProd({ nombre: "", precio: 0, imageUrl: "/images/placeholder.png", categoriaId: "" });
    setShowModal(true);
  };

  // 4. Guardar (Crear o Actualizar según corresponda)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formProd.categoriaId) {
        alert("Selecciona una categoría");
        return;
    }

    try {
        const productoEnviar = {
            nombre: formProd.nombre,
            precio: Number(formProd.precio),
            imageUrl: formProd.imageUrl,
            categoria: { id: Number(formProd.categoriaId) }
        };

        const categoriaCompleta = categorias.find(c => c.id === Number(formProd.categoriaId));

        if (editingId) {
            // --- MODO EDICIÓN (PUT) ---
            const actualizado = await updateProducto(editingId, productoEnviar as any);
            
            // Parchamos el objeto actualizado con el nombre de la categoría correcto
            const productoFinal = { ...actualizado, categoria: categoriaCompleta || actualizado.categoria };

            // Actualizamos la lista localmente
            setProductos(productos.map(p => (p.id === editingId ? productoFinal : p)));
            alert("✅ Producto actualizado correctamente");

        } else {
            // --- MODO CREACIÓN (POST) ---
            const creado = await createProducto(productoEnviar as any);
            
            // Parchamos el objeto creado con el nombre de la categoría correcto
            const productoFinal = { ...creado, categoria: categoriaCompleta || creado.categoria };

            setProductos([...productos, productoFinal]);
            alert("✅ Producto creado exitosamente");
        }

        setShowModal(false);

    } catch (error) {
        console.error(error);
        alert("Error al guardar. Revisa la consola.");
    }
  };

  if (loading) return <div style={{ padding: "4rem", textAlign:"center", color: "#666" }}>Cargando panel...</div>;

  return (
    <div className="page-container" style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div>
            <h1 style={{ color: "#2f9d55", margin: 0 }}>Panel de Administración</h1>
            <p style={{ color: "#666", margin: "5px 0 0" }}>Gestiona tu inventario completo.</p>
        </div>
        <button 
            className="btn-primary"
            style={{ 
                padding: "12px 24px", 
                backgroundColor: "#2f9d55", 
                color: "white", 
                border: "none", 
                borderRadius: "8px", 
                cursor: "pointer", 
                fontWeight: "bold",
                boxShadow: "0 4px 6px rgba(47, 157, 85, 0.2)"
            }}
            onClick={openCreateModal} 
        >
            + Nuevo Producto
        </button>
      </div>

      {/* TABLA */}
      <div style={{ overflowX: "auto", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", borderRadius: "12px", backgroundColor: "white", border: "1px solid #eee" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f9fafb", textAlign: "left", color: "#4b5563" }}>
              <th style={{ padding: "16px" }}>ID</th>
              <th style={{ padding: "16px" }}>Imagen</th>
              <th style={{ padding: "16px" }}>Nombre</th>
              <th style={{ padding: "16px" }}>Precio</th>
              <th style={{ padding: "16px" }}>Categoría</th>
              <th style={{ padding: "16px", textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "16px", color: "#6b7280" }}>#{p.id}</td>
                <td style={{ padding: "16px" }}>
                  <img 
                    src={p.imageUrl && p.imageUrl.startsWith("http") ? p.imageUrl : `${IMAGE_BASE_URL}${p.imageUrl}`} 
                    alt={p.nombre} 
                    style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "8px", border: "1px solid #eee" }}
                    onError={(e) => (e.currentTarget as HTMLImageElement).src = "https://via.placeholder.com/48?text=Img"}
                  />
                </td>
                <td style={{ padding: "16px", fontWeight: "600", color: "#111827" }}>{p.nombre}</td>
                <td style={{ padding: "16px", color: "#2f9d55", fontWeight: "bold" }}>${p.precio.toLocaleString()}</td>
                <td style={{ padding: "16px" }}>
                    <span style={{ backgroundColor: "#ecfdf5", color: "#065f46", padding: "4px 10px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "500" }}>
                        {p.categoria?.nombre || "N/A"}
                    </span>
                </td>
                <td style={{ padding: "16px", textAlign: "center" }}>
                  {/* Botón EDITAR */}
                  <button 
                    onClick={() => handleEdit(p)}
                    style={{ 
                        backgroundColor: "#fbbf24", 
                        color: "white", 
                        border: "none", 
                        padding: "8px 12px", 
                        borderRadius: "6px", 
                        cursor: "pointer",
                        marginRight: "8px",
                        transition: "background 0.2s"
                    }}
                    title="Editar producto"
                  >
                    ✏️
                  </button>
                  {/* Botón ELIMINAR */}
                  <button 
                    onClick={() => p.id && handleDelete(p.id)}
                    style={{ 
                        backgroundColor: "#fee2e2", 
                        color: "#dc2626", 
                        border: "none", 
                        padding: "8px 12px", 
                        borderRadius: "6px", 
                        cursor: "pointer",
                        transition: "background 0.2s"
                    }}
                    title="Eliminar producto"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL (CREAR / EDITAR) --- */}
      {showModal && (
        <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999,
            backdropFilter: "blur(2px)"
        }}>
            <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "12px", width: "100%", maxWidth: "450px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
                {/* Título dinámico */}
                <h2 style={{ marginTop: 0, color: editingId ? "#f59e0b" : "#2f9d55", marginBottom: "20px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
                    {editingId ? "✏️ Editar Producto" : "🌱 Nuevo Producto"}
                </h2>
                
                <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    
                    <div>
                        <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "0.9rem", color: "#374151" }}>Nombre:</label>
                        <input type="text" required style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px" }} 
                            value={formProd.nombre} onChange={e => setFormProd({...formProd, nombre: e.target.value})} />
                    </div>

                    <div style={{ display: "flex", gap: "15px" }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "0.9rem", color: "#374151" }}>Precio:</label>
                            <input type="number" required min="1" style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px" }} 
                                value={formProd.precio} onChange={e => setFormProd({...formProd, precio: Number(e.target.value)})} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "0.9rem", color: "#374151" }}>Categoría:</label>
                            <select required style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px", backgroundColor: "white" }}
                                value={formProd.categoriaId} onChange={e => setFormProd({...formProd, categoriaId: e.target.value})}
                            >
                                <option value="">Seleccionar...</option>
                                {categorias.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "0.9rem", color: "#374151" }}>Imagen (URL):</label>
                        <input type="text" style={{ width: "100%", padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px" }} 
                            value={formProd.imageUrl} onChange={e => setFormProd({...formProd, imageUrl: e.target.value})} />
                    </div>

                    <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                        <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: "12px", backgroundColor: "white", color: "#374151", border: "1px solid #d1d5db", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}>
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            style={{ 
                                flex: 1, 
                                padding: "12px", 
                                backgroundColor: editingId ? "#f59e0b" : "#2f9d55", 
                                color: "white", 
                                border: "none", 
                                borderRadius: "6px", 
                                cursor: "pointer", 
                                fontWeight: "600" 
                            }}
                        >
                            {editingId ? "Actualizar" : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

    </div>
  );
};