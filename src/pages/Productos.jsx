import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Alert, InputGroup, Button } from 'react-bootstrap';
import ProductCard from '../components/molecules/ProductCard';
import ProductCardSkeleton from '../components/molecules/ProductCardSkeleton';
import { productosAPI } from '../data/api';
import '../styles/pages/Productos.css';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtros
  const [maxPrice, setMaxPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // Categorías únicas
  const [categorias, setCategorias] = useState([]);

  // Cargar productos al montar
  useEffect(() => {
    const cargarProductos = async () => {
      setLoading(true);
      try {
        const productosAPI_data = await productosAPI.getAll();
        console.log('🔍 Datos recibidos del backend:', productosAPI_data);

        const productosMapeados = productosAPI_data.map(producto => ({
          id: producto.id ?? producto._id ?? String(Math.random()).slice(2),
          name: producto.nombre || producto.nombre_producto || producto.name || '',
          price: producto.precio ?? producto.price ?? 0,
          description: producto.descripcion || producto.descripcion_producto || producto.description || '',
          image: producto.url || producto.image || '',
          link: producto.link_mercado || producto.link || '',
          category: producto.categoria || producto.category || 'General',
          destacado: producto.destacado ?? false
        }));

        setProductos(productosMapeados);
        setProductosFiltrados(productosMapeados);
        setCategorias([...new Set(productosMapeados.map(p => p.category).filter(Boolean))]);
        setError(null);
      } catch (err) {
        console.error('Error al cargar productos desde API:', err);
        // Fallback a datos locales si existe
        try {
          const { products } = await import('../data/products.js');
          setProductos(products);
          setProductosFiltrados(products);
          setCategorias([...new Set(products.map(p => p.category).filter(Boolean))]);
          setError('Usando datos locales de ejemplo.');
        } catch (e) {
          console.error('No hay datos locales disponibles:', e);
          setProductos([]);
          setProductosFiltrados([]);
          setCategorias([]);
          setError('No se pudieron cargar los productos.');
        }
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  // Aplicar filtros cuando cambian productos o criterios
  useEffect(() => {
    const aplicarFiltros = () => {
      let resultado = [...productos];

      // Búsqueda (name, description, category)
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        resultado = resultado.filter(p =>
          (p.name || '').toLowerCase().includes(term) ||
          (p.description || '').toLowerCase().includes(term) ||
          (p.category || '').toLowerCase().includes(term)
        );
      }

      // Filtrar por precio
      if (maxPrice && Number(maxPrice) > 0) {
        resultado = resultado.filter(p => (Number(p.price) || 0) <= Number(maxPrice));
      }

      // Filtrar por categoría
      if (selectedCategory !== 'all') {
        resultado = resultado.filter(p => (p.category || 'General') === selectedCategory);
      }

      // Ordenar
      switch (sortBy) {
        case 'price-asc':
          resultado.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
          break;
        case 'price-desc':
          resultado.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
          break;
        case 'name-asc':
          resultado.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
          break;
        case 'name-desc':
          resultado.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
          break;
        default:
          resultado.sort((a, b) => {
            if (a.destacado && !b.destacado) return -1;
            if (!a.destacado && b.destacado) return 1;
            return 0;
          });
      }

      setProductosFiltrados(resultado);
    };

    aplicarFiltros();
  }, [productos, searchTerm, maxPrice, selectedCategory, sortBy]);

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setMaxPrice(value === '' ? '' : value);
  };

  const limpiarFiltros = () => {
    setMaxPrice('');
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('default');
  };

  return (
    <div className="productos-page">
      <Container>
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h1 className="page-title">🛍️ Nuestros Productos</h1>
            <p className="page-subtitle">
              Encuentra el regalo perfecto entre nuestra selección
            </p>
          </Col>
        </Row>

        {/* Filtros */}
        <Row className="mb-4">
          <Col>
            <div className="filters-container">
              <Row className="g-3">
                {/* Búsqueda */}
                <Col md={6} lg={4}>
                  <Form.Group>
                    <Form.Label className="filter-label">🔍 Buscar</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                      />
                      {searchTerm && (
                        <Button
                          variant="outline-secondary"
                          onClick={() => setSearchTerm('')}
                        >
                          ✕
                        </Button>
                      )}
                    </InputGroup>
                  </Form.Group>
                </Col>

                {/* Categoría */}
                <Col md={6} lg={3}>
                  <Form.Group>
                    <Form.Label className="filter-label">🏷️ Categoría</Form.Label>
                    <Form.Select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="category-select"
                    >
                      <option value="all">Todas</option>
                      {categorias.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* Precio máximo */}
                <Col md={6} lg={2}>
                  <Form.Group>
                    <Form.Label className="filter-label">💰 Precio Máx.</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Sin límite"
                        value={maxPrice}
                        onChange={handlePriceChange}
                        className="price-input"
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>

                {/* Ordenar */}
                <Col md={6} lg={2}>
                  <Form.Group>
                    <Form.Label className="filter-label">📊 Ordenar</Form.Label>
                    <Form.Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="sort-select"
                    >
                      <option value="default">Destacados</option>
                      <option value="price-asc">Precio: Menor a Mayor</option>
                      <option value="price-desc">Precio: Mayor a Menor</option>
                      <option value="name-asc">Nombre: A-Z</option>
                      <option value="name-desc">Nombre: Z-A</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* Botón limpiar */}
                <Col md={12} lg={1} className="d-flex align-items-end">
                  <Button
                    variant="outline-danger"
                    onClick={limpiarFiltros}
                    className="w-100 clear-btn"
                  >
                    🗑️
                  </Button>
                </Col>
              </Row>

              {/* Contador de resultados */}
              <div className="results-count mt-3">
                {loading ? (
                  <span>Cargando productos...</span>
                ) : (
                  <span>
                    📦 {productosFiltrados.length} {productosFiltrados.length === 1 ? 'producto encontrado' : 'productos encontrados'}
                  </span>
                )}
              </div>
            </div>
          </Col>
        </Row>

        {/* Error */}
        {error && (
          <Row className="mb-4">
            <Col>
              <Alert variant="warning" className="error-alert">
                <Alert.Heading>⚠️ Aviso</Alert.Heading>
                {error}
              </Alert>
            </Col>
          </Row>
        )}

        {/* Grid de productos */}
        <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
          {loading ? (
            // Skeletons mientras carga
            Array.from({ length: 8 }).map((_, index) => (
              <Col key={index}>
                <ProductCardSkeleton />
              </Col>
            ))
          ) : productosFiltrados.length === 0 ? (
            // Sin resultados
            <Col xs={12}>
              <div className="no-products">
                <div className="no-products-icon">🔍</div>
                <h3>No se encontraron productos</h3>
                <p>Intenta ajustar los filtros o buscar algo diferente</p>
                <Button variant="primary" onClick={limpiarFiltros}>
                  Limpiar Filtros
                </Button>
              </div>
            </Col>
          ) : (
            // Productos
            productosFiltrados.map(producto => (
              <Col key={producto.id}>
                <ProductCard product={producto} />
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Productos;
