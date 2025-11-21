import FooterContenido from '../molecules/footerContenido';
import Copyright from '../atoms/Copyright';
import '../../styles/organisms/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <FooterContenido />
      <Copyright />
    </footer>
  );
};

export default Footer;