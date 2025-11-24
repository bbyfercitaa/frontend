import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert, Spinner, Badge } from 'react-bootstrap';
import { productosAPI } from '../../data/api';

function ProductosAdmin({ onUpdate }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProducto, setEditingProducto] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    url: '',
    precio: '',
    descripcion: '',
    stock: '',
    activo: true,
    destacado: false
  });

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    try {
      setLoading(true);
      const data = await productosAPI.getAll();
      setProductos(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (producto = null) => {
    if (producto) {
      setEditingProducto(producto);
      setFormData({
        nombre: producto.nombre_producto || '',
        url: producto.link_mercado || '',
        precio: producto.precio || '',
        descripcion: producto.descripcion_producto || '',
        stock: producto.stock || '',
        activo: producto.activo ?? true,
        destacado: producto.destacado ?? false
      });
    } else {
      setEditingProducto(null);
      setFormData({
        nombre: '',
        url: '',
        precio: '',
        descripcion: '',
        stock: '',
        activo: true,
        destacado: false
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProducto(null);
    setFormData({
      nombre: '',
      url: '',
      precio: '',
      descripcion: '',
      stock: '',
      activo: true,
      destacado: false
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const productoData = {
        nombre: formData.nombre,
        url: formData.url,
        precio: parseFloat(formData.precio),
        descripcion: formData.descripcion,
        stock: parseInt(formData.stock),
        activo: formData.activo,
        destacado: formData.destacado
      };

      if (editingProducto) {
        await productosAPI.update(editingProducto.id, productoData);
        alert('✅ Producto actualizado correctamente');
      } else {
        await productosAPI.create(productoData);
        alert('✅ Producto creado correctamente');
      }

      handleCloseModal();
      loadProductos();
      if (onUpdate) onUpdate();
    } catch (err) {
      alert('❌ Error al guardar el producto: ' + err.message);
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) {
      return;
    }

    try {
      await productosAPI.delete(id);
      alert('✅ Producto eliminado correctamente');
      loadProductos();
      if (onUpdate) onUpdate();
    } catch (err) {
      alert('❌ Error al eliminar el producto: ' + err.message);
      console.error(err);
    }
  };

  const toggleActivo = async (producto) => {
    try {
      await productosAPI.update(producto.id, {
        ...producto,
        activo: !producto.activo
      });
      loadProductos();
      if (onUpdate) onUpdate();
    } catch (err) {
      alert('❌ Error al actualizar el estado: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="productos-admin">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Gestión de Productos</h3>
        <Button variant="success" onClick={() => handleShowModal()}>
          ➕ Nuevo Producto
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Destacado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No hay productos registrados
                </td>
              </tr>
            ) : (
              productos.map(producto => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre_producto}</td>
                  <td>${producto.precio?.toLocaleString('es-CL')}</td>
                  <td>{producto.stock}</td>
                  <td>
                    <Badge bg={producto.activo ? 'success' : 'danger'}>
                      {producto.activo ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </td>
                  <td>
                    {producto.destacado ? '⭐' : '—'}
                  </td>
                  <td>
                    <Button 
                      size="sm" 
                      variant="info" 
                      className="me-2"
                      onClick={() => handleShowModal(producto)}
                    >
                      ✏️ Editar
                    </Button>
                    <Button 
                      size="sm" 
                      variant={producto.activo ? 'warning' : 'success'}
                      className="me-2"
                      onClick={() => toggleActivo(producto)}
                    >
                      {producto.activo ? '🔒' : '🔓'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="danger"
                      onClick={() => handleDelete(producto.id)}
                    >
                      🗑️
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Modal para crear/editar producto */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProducto ? '✏️ Editar Producto' : '➕ Nuevo Producto'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Producto *</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Ej: iPhone 15 Pro"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL de Mercado Libre *</Form.Label>
              <Form.Control
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                required
                placeholder="https://www.mercadolibre.cl/..."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio *</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="999990"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock *</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                placeholder="10"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
                placeholder="Descripción detallada del producto..."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="activo"
                label="Producto activo"
                checked={formData.activo}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="destacado"
                label="Producto destacado (aparece en inicio)"
                checked={formData.destacado}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                {editingProducto ? 'Actualizar' : 'Crear'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProductosAdmin;