import { useState } from 'react';
import { Button, Dropdown, Modal, Form } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useListas } from '../../context/ListasContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/atoms/AddToListaButton.css';

function AddToListaButton({ producto }) {
  const { isAuthenticated } = useAuth();
  const { listas, addProductoToLista, createLista, isProductoInLista } = useListas();
  const navigate = useNavigate();
  
  const [showNewListaModal, setShowNewListaModal] = useState(false);
  const [newListaName, setNewListaName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddToLista = async (listaId) => {
    if (!isAuthenticated()) {
      alert('Debes iniciar sesión para usar las listas');
      navigate('/inicio-sesion');
      return;
    }

    setLoading(true);
    const result = await addProductoToLista(listaId, producto);
    setLoading(false);

    if (result.success) {
      alert('✅ Producto agregado a la lista');
    } else {
      alert('❌ ' + result.error);
    }
  };

  const handleCreateAndAdd = async () => {
    if (!newListaName.trim()) {
      alert('Ingresa un nombre para la lista');
      return;
    }

    setLoading(true);
    const result = await createLista(newListaName, '');
    
    if (result.success) {
      await addProductoToLista(result.lista.id, producto);
      setShowNewListaModal(false);
      setNewListaName('');
      alert('✅ Lista creada y producto agregado');
    } else {
      alert('❌ ' + result.error);
    }
    setLoading(false);
  };

  if (!isAuthenticated()) {
    return (
      <Button 
        variant="outline-secondary" 
        size="sm"
        onClick={() => navigate('/inicio-sesion')}
        className="add-to-lista-btn"
      >
        💝 Guardar
      </Button>
    );
  }

  const enLista = isProductoInLista(producto.id);

  return (
    <>
      <Dropdown className="add-to-lista-dropdown">
        <Dropdown.Toggle 
          variant={enLista ? "success" : "outline-primary"}
          size="sm"
          disabled={loading}
          className="add-to-lista-btn"
        >
          {enLista ? '✅ En Lista' : '💝 Agregar a Lista'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {listas.length === 0 ? (
            <Dropdown.Item onClick={() => setShowNewListaModal(true)}>
              ➕ Crear Nueva Lista
            </Dropdown.Item>
          ) : (
            <>
              {listas.map(lista => (
                <Dropdown.Item 
                  key={lista.id}
                  onClick={() => handleAddToLista(lista.id)}
                  disabled={isProductoInLista(producto.id, lista.id)}
                >
                  {isProductoInLista(producto.id, lista.id) ? '✅' : '📋'} {lista.nombre}
                </Dropdown.Item>
              ))}
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => setShowNewListaModal(true)}>
                ➕ Crear Nueva Lista
              </Dropdown.Item>
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>

      {/* Modal para crear nueva lista */}
      <Modal show={showNewListaModal} onHide={() => setShowNewListaModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>➕ Nueva Lista</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre de la Lista</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Cumpleaños de María"
                value={newListaName}
                onChange={(e) => setNewListaName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNewListaModal(false)}>
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            onClick={handleCreateAndAdd}
            disabled={loading || !newListaName.trim()}
          >
            Crear y Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddToListaButton;