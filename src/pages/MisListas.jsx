import { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { useListas } from '../context/ListasContext';
import ListaCard from '../components/molecules/ListaCard';
import '../styles/pages/MisListas.css';

function MisListas() {
  const { listas, loading, createLista, updateLista, deleteLista } = useListas();
  const [showModal, setShowModal] = useState(false);
  const [editingLista, setEditingLista] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });
  const [error, setError] = useState('');

  const handleShowModal = (lista = null) => {
    if (lista) {
      setEditingLista(lista);
      setFormData({
        nombre: lista.nombre,
        descripcion: lista.descripción || ''
      });
    } else {
      setEditingLista(null);
      setFormData({
        nombre: '',
        descripcion: ''
      });
    }
    setShowModal(true);
    setError('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingLista(null);
    setFormData({ nombre: '', descripcion: '' });
    setError('');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nombre.trim()) {
      setError('El nombre de la lista es requerido');
      return;
    }

    let result;
    if (editingLista) {
      result = await updateLista(
        editingLista.id,
        formData.nombre,
        formData.descripcion
      );
    } else {
      result = await createLista(formData.nombre, formData.descripcion);
    }

    if (result.success) {
      handleCloseModal();
    } else {
      setError(result.error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta lista?')) {
      return;
    }

    const result = await deleteLista(id);
    if (!result.success) {
      alert('Error al eliminar la lista: ' + result.error);
    }
  };

  if (loading && listas.length === 0) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Cargando tus listas...</p>
        </div>
      </Container>
    );
  }

  return (
    <div className="mis-listas-page">
      <Container>
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="page-title">🎁 Mis Listas de Deseos</h1>
                <p className="text-muted">
                  Organiza tus productos favoritos en listas personalizadas
                </p>
              </div>
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => handleShowModal()}
                className="create-lista-btn"
              >
                ➕ Nueva Lista
              </Button>
            </div>
          </Col>
        </Row>

        {listas.length === 0 ? (
          <Row>
            <Col>
              <Card className="empty-state">
                <Card.Body className="text-center py-5">
                  <div className="empty-icon">📋</div>
                  <h3>No tienes listas aún</h3>
                  <p className="text-muted">
                    Crea tu primera lista para empezar a guardar tus productos favoritos
                  </p>
                  <Button 
                    variant="primary" 
                    onClick={() => handleShowModal()}
                    className="mt-3"
                  >
                    Crear Mi Primera Lista
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <Row>
            {listas.map(lista => (
              <Col key={lista.id} md={6} lg={4} className="mb-4">
                <ListaCard 
                  lista={lista}
                  onEdit={() => handleShowModal(lista)}
                  onDelete={() => handleDelete(lista.id)}
                />
              </Col>
            ))}
          </Row>
        )}

        {/* Modal para crear/editar lista */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingLista ? '✏️ Editar Lista' : '➕ Nueva Lista'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre de la Lista *</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Cumpleaños de María, Navidad 2024..."
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Descripción (opcional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  placeholder="Describe el propósito de esta lista..."
                />
              </Form.Group>

              <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={handleCloseModal}>
                  Cancelar
                </Button>
                <Button variant="primary" type="submit" disabled={loading}>
                  {editingLista ? 'Actualizar' : 'Crear'}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default MisListas;