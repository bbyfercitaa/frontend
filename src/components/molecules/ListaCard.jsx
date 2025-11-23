import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../styles/molecules/ListaCard.css';

function ListaCard({ lista, onEdit, onDelete }) {
  const productosCount = lista.productos?.length || 0;

  return (
    <Card className="lista-card">
      <Card.Body>
        <div className="lista-header">
          <h3 className="lista-title">{lista.nombre}</h3>
          <Badge bg="primary" className="productos-badge">
            {productosCount} {productosCount === 1 ? 'producto' : 'productos'}
          </Badge>
        </div>

        {lista.descripción && (
          <p className="lista-descripcion">{lista.descripción}</p>
        )}

        {/* Preview de productos */}
        {productosCount > 0 && (
          <div className="productos-preview">
            {lista.productos.slice(0, 3).map((producto, index) => (
              <div key={index} className="producto-mini">
                <img 
                  src={producto.url_imagen || 'https://via.placeholder.com/60'} 
                  alt={producto.nombre_producto}
                />
              </div>
            ))}
            {productosCount > 3 && (
              <div className="producto-mini more">
                +{productosCount - 3}
              </div>
            )}
          </div>
        )}

        <div className="lista-actions">
          <Link to={`/listas/${lista.id}`} className="btn btn-primary btn-sm">
            👁️ Ver Lista
          </Link>
          <Button 
            variant="outline-secondary" 
            size="sm"
            onClick={onEdit}
          >
            ✏️ Editar
          </Button>
          <Button 
            variant="outline-danger" 
            size="sm"
            onClick={onDelete}
          >
            🗑️
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ListaCard;