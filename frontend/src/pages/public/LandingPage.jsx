import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'
import '../../styles/LandingPage.css';
import { useEffect } from 'react';

export default function LandingPage() {

  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home')
    }
  }, [])

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Transforma tu forma de trabajar</h1>
          <p className="hero-subtitle">La plataforma todo en uno para gestión de proyectos y trabajo en equipo</p>
          <Link className="cta-button" to={'/login'}>Comenzar gratis</Link>

        </div>
        <div className="hero-image">
          <img src="https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg" alt="" className='dashboard-preview' />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Potencia tu productividad</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Gestión de Tareas</h3>
            <p>Crea, asigna y prioriza tareas con nuestro sistema intuitivo</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Colaboración en Equipo</h3>
            <p>Comunicación integrada y seguimiento de progreso en tiempo real</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Reportes Detallados</h3>
            <p>Métricas y análisis para optimizar tu flujo de trabajo</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Integraciones</h3>
            <p>Conecta con tus herramientas favoritas (Slack, Google Workspace, GitHub)</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Empieza hoy mismo</h2>
        <p>Únete a miles de equipos que ya están trabajando de manera más inteligente</p>
        <Link className="cta-button" to={'/login'}>Crea tu cuenta gratis</Link>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>Lo que dicen nuestros usuarios</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"La mejor herramienta de gestión que hemos usado. Incrementó nuestra productividad en un 40%"</p>
            <div className="author">- Carlos Pérez, CTO Tech Solutions</div>
          </div>
          <div className="testimonial-card">
            <p>"La implementación fue sencilla y la adopción por el equipo fue inmediata. ¡Altamente recomendado!"</p>
            <div className="author">- Ana Martínez, Gerente de Proyectos</div>
          </div>
        </div>
      </section>
    </div>
  );
}