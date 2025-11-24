import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { useListas } from '../context/ListasContext';
import { listasAPI } from '../data/api';
import ProductCard from '../components/molecules/ProductCard';
import '../styles/pages/ListaDetalle.css';

function ListaDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { removeProductoFromLista } = useListas();
  const [lista, setLista] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadLista();
  }, [id]);

  const loadLista = async () => {
    try {
      setLoading(true);
      const data = await listasAPI.getById(id);
      setLista(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar la lista');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProducto = async (productoId) => {
    if (!window.confirm('¿Remover este producto de la lista?')) {
      return;
    }

    const result = await removeProductoFromLista(id, productoId);
    if (result.success) {
      // Recargar la lista
      loadLista();
    } else {
      alert('Error al remover el producto');
    }
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Cargando lista...</p>
        </div>
      </Container>
    );
  }

  if (error || !lista) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          {error || 'Lista no encontrada'}
        </Alert>
        <Button variant="primary" onClick={() => navigate('/mis-listas')}>
          Volver a Mis Listas
        </Button>
      </Container>
    );
  }

  const productosCount = lista.productos?.length || 0;

  return (
    <div className="lista-detalle-page">
      <Container>
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <Button 
              variant="link" 
              onClick={() => navigate('/mis-listas')}
              className="mb-3"
            >
              ← Volver a Mis Listas
            </Button>
            
            <div className="lista-header-info">
              <h1 className="lista-title">{lista.nombre}</h1>
              {lista.descripción && (
                <p className="lista-descripcion">{lista.descripción}</p>
              )}
              <div className="lista-meta">
                <span className="productos-count">
                  📦 {productosCount} {productosCount === 1 ? 'producto' : 'productos'}
                </span>
              </div>
            </div>
          </Col>
        </Row>

        {/* Productos */}
        {productosCount === 0 ? (
          <Row>
            <Col>
              <Alert variant="info" className="empty-lista">
                <h4>Lista vacía</h4>
                <p>Aún no has agregado productos a esta lista.</p>
                <Link to="/productos" className="btn btn-primary">
                  Explorar Productos
                </Link>
              </Alert>
            </Col>
          </Row>
        ) : (
          <Row>
            {lista.productos.map(producto => (
              <Col key={producto.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <div className="producto-lista-wrapper">
                  <ProductCard product={producto} />
                  <Button 
                    variant="danger" 
                    size="sm" 
                    className="remove-btn"
                    onClick={() => handleRemoveProducto(producto.id)}
                  >
                    🗑️ Remover
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
        )}

        {/* Footer */}
        <Row className="mt-4">
          <Col className="text-center">
            <Link to="/productos" className="btn btn-outline-primary">
              ➕ Agregar Más Productos
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ListaDetalle;