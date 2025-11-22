import '../../styles/atoms/ViewMoreButton.css';

const ViewMoreButton = ({ link }) => {
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="view-more"
    >
      Ver donde comprar
    </a>
  );
};

export default ViewMoreButton;
