import React, { useState } from 'react';
import Header from '../header/Header';
import Footer from '../Footer/Footer';
import '../Principal/Principal.css';
import { FaFacebook, FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';

const Contacto = () => {
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Gracias, ${formData.nombre}. Tu mensaje ha sido enviado.`);
    setFormData({ nombre: '', email: '', mensaje: '' });
  };

  return (
    <div className="contacto-container">
      <Header />

      <main className="main-section contacto-main">
        <h1>Contáctanos</h1>
        <p style={{ textAlign: 'center', marginBottom: '30px' }}>
          Elige la forma más cómoda para comunicarte con nosotros
        </p>

        <div className="contact-cards">
          <div className="contact-card">
            <FaWhatsapp size={40} color="#25D366" />
            <h3>WhatsApp</h3>
            <p><a href="https://wa.me/50250115060" target="_blank" rel="noopener noreferrer">+502 5011 5060</a></p>
          </div>

          <div className="contact-card">
            <FaFacebook size={40} color="#4267B2" />
            <h3>Facebook</h3>
            <p><a href="https://www.facebook.com/share/1F9vBpDwC7/?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">/SupportIT</a></p>
          </div>

          <div className="contact-card">
            <FaEnvelope size={40} color="#D44638" />
            <h3>Email</h3>
            <p><a href="mailto:supportitgt@gmail.com">supportitgt@gmail.com</a></p>
          </div>

          <div className="contact-card">
            <FaPhone size={40} color="#004080" />
            <h3>Teléfono</h3>
            <p><a href="tel:+50212345678">+502 5011 5060</a></p>
          </div>
        </div>

        <h2 style={{ marginTop: '50px', textAlign: 'center' }}>Formulario de Contacto</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required />
          <textarea name="mensaje" placeholder="Escribe tu mensaje..." value={formData.mensaje} onChange={handleChange} required />
          <button type="submit">Enviar</button>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Contacto;
