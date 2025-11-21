import { Container, Row, Col } from 'react-bootstrap';
import '../../styles/organisms/Collaborators.css';
import { collaborators } from '../../data/collaboratorsData';

const Collaborators = () => {
  const handleImageError = (e, collaboratorName) => {
    console.error(`Error loading image for ${collaboratorName}`);
    e.target.onerror = null; // Prevenir bucle infinito
    // Intentar cargar la imagen directamente desde assets
    e.target.src = new URL(`../../assets/${collaboratorName}.webp`, import.meta.url).href;
  };

  return (
    <section className="collaborators">
      <Container>
        <h1 className="section-title">Colaboradores</h1>
        <Row className="justify-content-center align-items-center">
          {collaborators.map(collaborator => (
            <Col key={collaborator.id} xs={12} sm={6} md={4} className="text-center mb-4">
              <a 
                href={collaborator.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="collaborator-link"
              >
                <div className="collaborator-card">
                  <img 
                    src={collaborator.image} 
                    alt={collaborator.name} 
                    className="collaborator-image"
                    onError={(e) => handleImageError(e, collaborator.name)}
                    loading="lazy"
                />
              </div>
              </a>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Collaborators;