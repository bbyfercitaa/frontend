import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Tabs, Tab } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { productosAPI, usuariosAPI } from '../../data/api';
import ProductosAdmin from '../organisms/admin/ProductosAdmin';
import UsuariosAdmin from '../organisms/admin/UsuariosAdmin';
import CategoriasAdmin from '../organisms/admin/CategoriasAdmin';
import '../../styles/pages/AdminDashboard.css';

function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProductos: 0,
    totalUsuarios: 0,
    productosActivos: 0,
    usuariosActivos: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const [productos, usuarios] = await Promise.all([
        productosAPI.getAll(),
        usuariosAPI.getAll().catch(() => []) 
      ]);

      setStats({
        totalProductos: productos.length,
        totalUsuarios: usuarios.length,
        productosActivos: productos.filter(p => p.activo).length,
        usuariosActivos: usuarios.filter(u => u.activo).length
      });
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <Container fluid>
        <Row className="mb-4">
          <Col>
            <h1 className="admin-title">
              Panel de Administración
            </h1>
            <p className="text-muted">
              Bienvenido, <strong>{user?.nombre}</strong>
            </p>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={3} sm={6} className="mb-3">
            <Card className="stat-card stat-card-primary">
              <Card.Body>
                <h2 className="stat-number">{stats.totalProductos}</h2>
                <p className="stat-label">Total Productos</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <Card className="stat-card stat-card-success">
              <Card.Body>
                <h3 className="stat-number">{stats.productosActivos}</h3>
                <p className="stat-label">Productos Activos</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <Card className="stat-card stat-card-info">
              <Card.Body>
                <h4 className="stat-number">{stats.totalUsuarios}</h4>
                <p className="stat-label">Total Usuarios</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <Card className="stat-card stat-card-warning">
              <Card.Body>
                <h5 className="stat-number">{stats.usuariosActivos}</h5>
                <p className="stat-label">Usuarios Activos</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="admin-content-card">
              <Card.Body>
                <Tabs defaultActiveKey="productos" className="mb-3" variant="pills">
                  <Tab eventKey="productos" title="Productos">
                    <ProductosAdmin onUpdate={loadStats} />
                  </Tab>
                  <Tab eventKey="usuarios" title="Usuarios">
                    <UsuariosAdmin onUpdate={loadStats} />
                  </Tab>
                  <Tab eventKey="categorias" title="Categorías">
                    <CategoriasAdmin />
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminDashboard;