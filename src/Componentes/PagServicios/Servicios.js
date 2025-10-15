import React from "react";
import Header from '../header/Header';
import Footer from '../Footer/Footer';
import '../Principal/Principal.css';

const serviciosData = [
  {
    nombre: "Mantenimiento de Hardware",
    descripcion: "Revisión, limpieza y reparación de componentes físicos de tu computadora.",
    imagen: "https://softwareg.com.au/cdn/shop/articles/911-computer-hardware-maintenance.png?v=1707736023"
  },
  {
    nombre: "Mantenimiento de Software",
    descripcion: "Instalación, actualización y optimización de sistemas operativos y aplicaciones.",
    imagen: "https://cdn.prod.website-files.com/6360d0b8798bc2249104a104/65f202dbb0b5471ffa6eccf0_mantenimiento%20del%20software.jpg"
  },
  {
  
    nombre: "Asesoría Tecnológica",
    descripcion: "Recomendaciones y soluciones para optimizar tu infraestructura tecnológica.",
    imagen: "https://asesoriasercotec.cl/wp-content/uploads/elementor/thumbs/Empresas-tecnologicas-qz4t6888zkuzp9kaf89pjs7jetlhymhnrimdochqq0.webp"
  }
];

const Servicios = () => {
  return (
    <div>
      <Header />

      <main className="main-section">
        <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Nuestros Servicios</h1>

        <div className="servicios-container">
          {serviciosData.map((servicio, index) => (
            <div key={index} className="servicio-card">
              <img src={servicio.imagen} alt={servicio.nombre} className="servicio-imagen" />
              <h3>{servicio.nombre}</h3>
              <p>{servicio.descripcion}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Servicios;
