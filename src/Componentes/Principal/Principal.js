// OEAProgram.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import '../Principal/Principal.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OEAProgram = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('https://pg2-backend-1.onrender.com/productos')
      .then(res => res.json())
      .then(data => setProductos(data.slice(0, 10))) // Límite de productos cargados
      .catch(err => console.error("Error cargando productos:", err));
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const sliderSettings = {
    dots: true,
    infinite: productos.length > 3, // Evita bucle si hay menos de 3 productos
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="oea-container">
      {/* Header */}
      <header className="header" style={{ backgroundColor: '#000000ff', color: 'white' }}>
        <div className="header-left">
          <span className="sat-title">SUPPORT IT</span>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="/" style={{ color: 'white' }}>Inicio</a></li>
            <li><a href="/servicios" style={{ color: 'white' }}>Servicios</a></li>
            <li><a href="/contacto" style={{ color: 'white' }}>Contacto</a></li>
          </ul>
        </nav>
        <div className="header-right">
          <button
            className="btn-login"
            onClick={handleLoginClick}
            style={{
              backgroundColor: '#FFD700',
              color: '#004080',
              padding: '8px 16px',
              borderRadius: '5px',
              fontWeight: 'bold'
            }}>
            Login
          </button>
        </div>
      </header>

      {/* Main Section */}
      <main className="main-section" style={{ background: 'linear-gradient(to bottom, #004080, #0066cc)', color: 'white', padding: '60px 20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2rem', fontWeight: 'bold' }}>
          Nuestros Productos Destacados
        </h1>

        {productos.length > 0 ? (
          <div className="carousel-container">
            <Slider {...sliderSettings}>
              {productos.map(producto => (
                <div key={producto.id} className="producto-card">
                  <div className="producto-content">
                    <img
                      src={producto.imagen || 'https://via.placeholder.com/300x200?text=Sin+Imagen'}
                      alt={producto.nombre}
                      className="producto-imagen"
                    />
                    <h3>{producto.nombre}</h3>
                    <p className="precio">Q{producto.precio}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <p style={{ textAlign: 'center' }}>Cargando productos...</p>
        )}
      </main>

      {/* Footer */}
      <footer className="footer-banner" style={{ backgroundColor: '#004080', color: 'white', padding: '20px', textAlign: 'center' }}>
        <div className="footer-content">
          <div className="declaration">
            <span className="icon">@</span> SUPPORT IT Derechos reservados
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OEAProgram;
