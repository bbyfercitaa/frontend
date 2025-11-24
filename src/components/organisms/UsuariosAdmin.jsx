import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert, Spinner, Badge } from 'react-bootstrap';
import { usuariosAPI } from '../../data/api';

function UsuariosAdmin({ onUpdate }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    activo: true
  });

  useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = async () => {
    try {
      setLoading(true);
      const data = await usuariosAPI.getAll();
      setUsuarios(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar usuarios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (usuario = null) => {
    if (usuario) {
      setEditingUsuario(usuario);
      setFormData({
        nombre: usuario.nombre || '',
        correo: usuario.correo || '',
        contrasena: '', 
        activo: usuario.activo ?? true
      });
    } else {
      setEditingUsuario(null);
      setFormData({
        nombre: '',
        correo: '',
        contrasena: '',
        activo: true
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUsuario(null);
    setFormData({
      nombre: '',
      correo: '',
      contrasena: '',
      activo: true
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
      const usuarioData = {
        nombre: formData.nombre,
        correo: formData.correo,
        activo: formData.activo,
        fechaRegistro: editingUsuario?.fechaRegistro || new Date().toISOString().split('T')[0]
      };

      if (!editingUsuario || formData.contrasena) {
        usuarioData.contrasena = formData.contrasena;
      }

      if (editingUsuario) {
        await usuariosAPI.update(editingUsuario.id, usuarioData);
        alert('✅ Usuario actualizado correctamente');
      } else {
        await usuariosAPI.register(usuarioData);
        alert('✅ Usuario creado correctamente');
      }

      handleCloseModal();
      loadUsuarios();
      if (onUpdate) onUpdate();
    } catch (err) {
      alert('❌ Error al guardar el usuario: ' + err.message);
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) {
      return;
    }

    try {
      await usuariosAPI.delete(id);
      alert('✅ Usuario eliminado correctamente');
      loadUsuarios();
      if (onUpdate) onUpdate();
    } catch (err) {
      alert('❌ Error al eliminar el usuario: ' + err.message);
      console.error(err);
    }
  };

  const toggleActivo = async (usuario) => {
    try {
      await usuariosAPI.update(usuario.id, {
        ...usuario,
        activo: !usuario.activo
      });
      loadUsuarios();
      if (onUpdate) onUpdate();
    } catch (err) {
      alert('❌ Error al actualizar el estado: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Cargando usuarios...</p>
      </div>
    );
  }

  return (
    <div className="usuarios-admin">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Gestión de Usuarios</h3>
        <Button variant="success" onClick={() => handleShowModal()}>
          ➕ Nuevo Usuario
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Fecha Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No hay usuarios registrados
                </td>
              </tr>
            ) : (
              usuarios.map(usuario => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.correo}</td>
                  <td>
                    <Badge bg="info">
                      {usuario.rol?.nombre || 'USER'}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg={usuario.activo ? 'success' : 'danger'}>
                      {usuario.activo ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </td>
                  <td>{usuario.fechaRegistro || '-'}</td>
                  <td>
                    <Button 
                      size="sm" 
                      variant="info" 
                      className="me-2"
                      onClick={() => handleShowModal(usuario)}
                    >
                      ✏️ Editar
                    </Button>
                    <Button 
                      size="sm" 
                      variant={usuario.activo ? 'warning' : 'success'}
                      className="me-2"
                      onClick={() => toggleActivo(usuario)}
                    >
                      {usuario.activo ? '🔒' : '🔓'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="danger"
                      onClick={() => handleDelete(usuario.id)}
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingUsuario ? '✏️ Editar Usuario' : '➕ Nuevo Usuario'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre Completo *</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Juan Pérez"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo Electrónico *</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
                placeholder="usuario@ejemplo.com"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Contraseña {editingUsuario ? '(dejar vacío para no cambiar)' : '*'}
              </Form.Label>
              <Form.Control
                type="password"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                required={!editingUsuario}
                placeholder="••••••••"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="activo"
                label="Usuario activo"
                checked={formData.activo}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                {editingUsuario ? 'Actualizar' : 'Crear'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UsuariosAdmin;