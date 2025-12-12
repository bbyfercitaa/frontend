import React from 'react';

const FooterContenido = () => {
    return (
        <div className="footer-content-wrapper">
            <div className="footer-shape"></div>
            <div className="footer-content">
                <div className="footer-section">
                    <h1>¿Qué le doy?</h1>
                    <p>
                        Encuentra el regalo perfecto para tus seres queridos con nuestra 
                        amplia selección de productos y ofertas especiales.
                    </p>
                </div>
                <div className="footer-section">
                    <h2>Enlaces Rápidos</h2>
                    <ul className="footer-links">
                        <li><a href="/">Inicio</a></li>
                        <li><a href="/contactos">Contactos</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Contacto</h3>
                    <ul className="footer-links">
                        <li>Dirección: Calle Principal #123</li>
                        <li>Teléfono: (123) 456-7890</li>
                        <li>Email: info@queledoy.com</li>
                        <li>Horario: Lun-Vie: 9am - 6pm</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FooterContenido;