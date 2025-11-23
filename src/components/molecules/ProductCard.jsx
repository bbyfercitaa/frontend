import { Card, Badge } from 'react-bootstrap';
import { useState } from 'react';
import ViewMoreButton from '../atoms/ViewMoreButton';
import AddToListaButton from '../atoms/AddToListaButton';
import '../../styles/molecules/ProductCard.css';

const ProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false);

  // Normalizar datos del producto
  const productData = {
    id: product.id,
    nombre: product.nombre_producto || product.nombre || product.name || 'Producto sin nombre',
    descripcion: product.descripcion_producto || product.descripcion || product.description || 'Sin descripción',
    precio: product.precio || product.price || 0,
    imagen: product.url_imagen || product.image || null,
    link: product.link_mercado || product.link || product.url || '#',
    categoria: product.categoria || product.category || 'General',
    stock: product.stock || 0,
    activo: product.activo ?? true,
    destacado: product.destacado ?? false
  };

  // Imagen con fallback
  const getImageUrl = () => {
    if (imageError || !productData.imagen) {
      return `https://via.placeholder.com/400x400/4DB6AC/FFFFFF?text=${encodeURIComponent(productData.nombre.substring(0, 20))}`;
    }
    return productData.imagen;
  };

  // Validar y limpiar URL
  const getValidUrl = () => {
    const url = productData.link;
    if (!url || url === '#') return null;
    
    // Si no tiene protocolo, agregarlo
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  };

<<<<<<< HEAD
  // Mapeo robusto de datos del producto
  const productData = {
    id: product.id,
    
    // Nombre: priorizar diferentes campos posibles
    name: product.nombre_producto || 
          product.nombre || 
          product.name || 
          'Producto sin nombre',
    
    // Descripción
    description: product.descripcion_producto || 
                 product.descripcion || 
                 product.description || 
                 'Sin descripción disponible',
    
    // Precio
    price: product.precio || product.price || 0,
    
    // URL de imagen con múltiples fallbacks
    image: product.url_imagen || 
           product.imagenes?.imagen?.url ||
           product.image || 
           'https://via.placeholder.com/300x300?text=Sin+Imagen',
    
    // Link a Mercado Libre
    link: getValidUrl(
      product.link || 
      product.url
    ) || 'https://www.mercadolibre.cl',
    
    // Categoría
    category: product.categoria || product.category || 'Sin categoría'
=======
  const handleImageError = () => {
    setImageError(true);
>>>>>>> 67eb31e (Agregando listas y roles)
  };

  const validUrl = getValidUrl();

  return (
    <Card className="product-card">
      {/* Badges superiores */}
      <div className="product-badges">
        {productData.destacado && (
          <Badge bg="warning" className="badge-destacado">
            ⭐ Destacado
          </Badge>
        )}
        {!productData.activo && (
          <Badge bg="danger" className="badge-inactivo">
            No disponible
          </Badge>
        )}
        {productData.stock === 0 && productData.activo && (
          <Badge bg="secondary" className="badge-sin-stock">
            Sin stock
          </Badge>
        )}
      </div>

      {/* Imagen del producto */}
      <div className="product-image-container">
        <Card.Img 
          variant="top" 
          src={getImageUrl()} 
          alt={productData.nombre}
          loading="lazy"
          onError={handleImageError}
          className="product-image"
        />
      </div>

      {/* Contenido */}
      <Card.Body className="product-card-body">
        {/* Categoría */}
        <div className="product-category">
          <Badge bg="info" pill className="category-badge">
            {productData.categoria}
          </Badge>
        </div>

        {/* Título */}
        <Card.Title className="product-title" title={productData.nombre}>
          {productData.nombre}
        </Card.Title>

        {/* Descripción */}
        <Card.Text className="product-description">
          {productData.descripcion.length > 100 
            ? `${productData.descripcion.substring(0, 100)}...` 
            : productData.descripcion}
        </Card.Text>

        {/* Precio y Stock */}
        <div className="product-info">
          {productData.precio > 0 && (
            <div className="product-price">
              <span className="price-label">Precio:</span>
              <span className="price-value">
                ${productData.precio.toLocaleString('es-CL')}
              </span>
            </div>
          )}
          {productData.stock > 0 && (
            <div className="product-stock">
              <span className="stock-icon">📦</span>
              <span className="stock-value">{productData.stock} disponibles</span>
            </div>
          )}
        </div>

        {/* Botones de acción */}
        <div className="product-actions">
          {validUrl ? (
            <ViewMoreButton link={validUrl} />
          ) : (
            <div className="no-link-message">
              <small className="text-muted">Sin enlace disponible</small>
            </div>
          )}
          
          <div className="mt-2">
            <AddToListaButton producto={productData} />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
