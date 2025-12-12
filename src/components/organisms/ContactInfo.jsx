import '../../../src/styles/pages/Contactos.css';

function ContactInfo() {
  return (
    <div className="contact-info">
      <h1>Información de Contacto</h1>
      <ul className="contact-list">
        <li>
          <i className="bi bi-geo-alt-fill"></i>
          <span>123 Calle Principal, Ciudad</span>
        </li>
        <li>
          <i className="bi bi-telephone-fill"></i>
          <span>+56 9 1234 5678</span>
        </li>
        <li>
          <i className="bi bi-envelope-fill"></i>
          <span>contacto@tutienda.com</span>
        </li>
        <li>
          <i className="bi bi-clock-fill"></i>
          <span>Lun - Vie: 9:00 - 18:00</span>
        </li>
      </ul>
    </div>
  );
}

export default ContactInfo;