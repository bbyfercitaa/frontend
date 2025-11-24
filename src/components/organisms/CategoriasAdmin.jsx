import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert, Spinner, Row, Col } from 'react-bootstrap';

// API placeholder - ajustar cuando esté implementada en el backend
const categoriasAPI = {
  async getAll() {
    const response = await fetch('https://queledoy-backend-7ejz.onrender.com/api/v1/categorias');
    if (!response.ok) throw new Error('Error al cargar categorías');
    return await response.json();
  },
  async create(categoria) {
    const response = await fetch('https://queledoy-backend-7ejz.onrender.com/api/v1/categorias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoria)
    });
    if (!response.ok) throw new Error('Error al crear categoría');
    return await response.json();
  },
  async update(id, categoria) {
    const response = await fetch(`https://queledoy-backend-7ejz.onrender.com/api/v1/categorias/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoria)
    });
    if (!response.ok) throw new Error('Error al actualizar categoría');
    return await response.json();
  },
  async delete(id) {
    const response = await fetch(`https://queledoy-backend-7ejz.onrender.com/api/v1/categorias/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Error al eliminar categoría');
    return true;
  }
};

function CategoriasAdmin() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState(null);
  const [formData, setFormData] = useState({
    nombre: ''
  });

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      setLoading(true);
      const data = await categoriasAPI.getAll();
      setCategorias(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar categorías');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (categoria = null) => {
    if (categoria) {
      setEditingCategoria(categoria);
      setFormData({
        nombre: categoria.nombre || ''
      });
    } else {
      setEditingCategoria(null);
      setFormData({
        nombre: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategoria(null);
    setFormData({ nombre: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingCategoria) {
        await categoriasAPI.update(editingCategoria.id, formData);
        alert('✅ Categoría actualizada correctamente');
      } else {
        await categoriasAPI.create(formData);
        alert('✅ Categoría creada correctamente');
      }

      handleCloseModal();
      loadCategorias();
    } catch (err) {
      alert('❌ Error al guardar la categoría: ' + err.message);
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      return;
    }

    try {
      await categoriasAPI.delete(id);
      alert('✅ Categoría eliminada correctamente');
      loadCategorias();
    } catch (err) {
      alert('❌ Error al eliminar la categoría: ' + err.message);
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Cargando categorías...</p>
      </div>
    );
  }

  return (
    <div className="categorias-admin">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Gestión de Categorías</h3>
        <Button variant="success" onClick={() => handleShowModal()}>
          ➕ Nueva Categoría
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {categorias.length === 0 ? (
          <Col>
            <Alert variant="info">No hay categorías registradas</Alert>
          </Col>
        ) : (
          <Col>
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {categorias.map(categoria => (
                    <tr key={categoria.id}>
                      <td>{categoria.id}</td>
                      <td>{categoria.nombre}</td>
                      <td>
                        <Button 
                          size="sm" 
                          variant="info" 
                          className="me-2"
                          onClick={() => handleShowModal(categoria)}
                        >
                          ✏️ Editar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="danger"
                          onClick={() => handleDelete(categoria.id)}
                        >
                          🗑️ Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        )}
      </Row>

      {/* Modal para crear/editar categoría */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingCategoria ? '✏️ Editar Categoría' : '➕ Nueva Categoría'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de la Categoría *</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Ej: Electrónica, Ropa, Hogar..."
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                {editingCategoria ? 'Actualizar' : 'Crear'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CategoriasAdmin;