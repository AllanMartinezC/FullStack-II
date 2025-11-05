import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';

// NOTA: El componente se llama Blogs.
export const Blogs = () => {
   useEffect(() => {
      document.title = 'HuertoHogar — Blog'; // Puedes cambiar esto a 'HuertoHogar — Nosotros' si corresponde

      // Opcional: funciones globales si existen
      // @ts-ignore
      if (typeof window !== 'undefined' && typeof (window as any).renderAuthArea === 'function') {
         // @ts-ignore
         (window as any).renderAuthArea();
      }
      // @ts-ignore
      if (typeof window !== 'undefined' && typeof (window as any).updateCartBadge === 'function') {
         // @ts-ignore
         (window as any).updateCartBadge();
      }
   }, []);

   return (
      <div>
         {}
         {}

         <main>
            {/* ====== BLOG ====== */}
            <section className="blog-section">
               <h2 className="blog-heading">NOTICIAS IMPORTANTES</h2>

               {}
               <article className="blog-card">
                  <div className="blog-content">
                     <h3 className="blog-title">CASO CURIOSO #1</h3>
                     <p className="blog-excerpt">
                        Guía rápida para identificar frutas de temporada y reconocer signos de frescura
                        en el punto de venta. Consejos prácticos aplicados a manzanas, naranjas y plátanos.
                     </p>
                     <Link className="btn-outline" to="/posts/caso-1">VER CASO</Link>
                  </div>
                  <figure className="blog-media">
                     <img
                        src="src\assets\img\temporada_SEPTIEMBRE-F.jpg"
                        alt="Guía visual: frutas de temporada"
                     />
                  </figure>
               </article>

               {}
               <article className="blog-card">
                  <div className="blog-content">
                     <h3 className="blog-title">CASO CURIOSO #2</h3>
                     <p className="blog-excerpt">
                        Cómo elegimos proveedores locales: criterios de trazabilidad, prácticas sustentables
                        y controles de calidad antes de que tus productos lleguen a casa.
                     </p>
                     <Link className="btn-outline" to="/posts/caso-2">VER CASO</Link>
                  </div>
                  <figure className="blog-media">
                     <img
                        src="src\assets\img\proveedores-gastronomicos-1.png"
                        alt="Visita a proveedor local del huerto"
                     />
                  </figure>
               </article>

               {/* Tarjeta 3 */}
               <article className="blog-card">
                  <div className="blog-content">
                     <h3 className="blog-title">CASO CURIOSO #3</h3>
                     <p className="blog-excerpt">
                        Recetas de aprovechamiento con verduras de temporada: ideas simples para reducir
                        desperdicios y optimizar tu presupuesto semanal.
                     </p>
                     <Link className="btn-outline" to="/posts/caso-3">VER CASO</Link>
                  </div>
                  <figure className="blog-media">
                     <img
                        src="src\assets\img\frutas-y-verduras.jpg"
                        alt="Recetas de aprovechamiento del huerto"
                     />
                  </figure>
               </article>
            </section>
            {/* ====== /BLOG ====== */}

            {/* <Footer /> <-- ELIMINADO PARA EVITAR DUPLICIDAD */}
         </main>

      </div>
   );
};

export default Blogs;
