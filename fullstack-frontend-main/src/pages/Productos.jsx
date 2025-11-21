import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Spinner, Alert } from 'react-bootstrap';
import ProductCard from '../components/molecules/ProductCard';
import '../styles/pages/Productos.css';
import { productosAPI } from '../data/api';

function Productos() {
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        console.log('🔄 Intentando cargar productos...');
        
        const productosAPI_data = await productosAPI.getAll();
        console.log('✅ Productos recibidos:', productosAPI_data);
        
        // Mapear los productos del backend al formato del frontend
        const productosMapeados = productosAPI_data.map(producto => {
          console.log('📦 Producto individual:', producto);
          return {
            id: producto.id,
            name: producto.nombre_producto || producto.nombre,
            price: producto.precio,
            description: producto.descripcion_producto || producto.descripcion,
            image: producto.url_imagen || producto.url,
            link: producto.link_mercado || '#',
            category: producto.categoria
          };
        });
        
        console.log('🎯 Productos mapeados:', productosMapeados);
        setProductos(productosMapeados);
        setError(null);
      } catch (err) {
        console.error('❌ Error completo:', err);
        console.error('❌ Error message:', err.message);
        console.error('❌ Error stack:', err.stack);
        
        setError(`Error al conectar con el servidor: ${err.message}`);
        
        // Fallback a datos estáticos
        console.log('🔄 Cargando datos de ejemplo...');
        const { products } = await import('../data/products.js');
        setProductos(products);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setMaxPrice(value === '' ? 0 : Number(value));
  };

  const filteredProducts = productos.filter(product => 
    (product.price || 0) <= maxPrice
  );

  if (loading) {
    return (
      <div className="products-page">
        <Container className="text-center py-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Cargando productos...</span>
          </Spinner>
          <p className="mt-3">Conectando con el servidor...</p>
          <small className="text-muted">
            https://queledoy-backend-7ejz.onrender.com
          </small>
        </Container>
      </div>
    );
  }

  return (
    <div className="products-page">
      <Container>
        <h1 className="text-center mb-5">Nuestros Productos</h1>
        
        {error && (
          <Alert variant="warning" className="mb-4">
            <Alert.Heading>⚠️ Aviso de Conexión</Alert.Heading>
            <p>{error}</p>
            <hr />
            <p className="mb-0">
              <strong>Mostrando productos de ejemplo.</strong> 
              Verifica que tu backend esté funcionando correctamente.
            </p>
          </Alert>
        )}
        
        <div className="price-filter-container mb-4">
          <h2 className="filter-title">Filtrar por precio</h2>
          <div className="price-input-container">
            <Form.Label>¿Cuál es tu presupuesto máximo?</Form.Label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <Form.Control
                type="text"
                value={maxPrice}
                onChange={handlePriceChange}
                placeholder="Ingresa tu presupuesto"
                className="price-input"
              />
            </div>
          </div>
        </div>
        
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <Col key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))
          ) : productos.length === 0 ? (
            <Col xs={12}>
              <Alert variant="info" className="text-center">
                <h4>🛒 No hay productos disponibles</h4>
                <p>Aún no se han agregado productos a la base de datos.</p>
                <small className="text-muted">
                  Agrega productos desde tu backend en: 
                  <br />
                  POST https://queledoy-backend-7ejz.onrender.com/api/v1/productos
                </small>
              </Alert>
            </Col>
          ) : (
            <Col xs={12}>
              <div className="no-products-message">
                No hay productos disponibles en este rango de precio
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Productos;