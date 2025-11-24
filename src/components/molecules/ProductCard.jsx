import { Card, Badge } from 'react-bootstrap';
import { useState } from 'react';
import ViewMoreButton from '../atoms/ViewMoreButton';
import AddToListaButton from '../atoms/AddToListaButton';
import '../../styles/molecules/ProductCard.css';

const ProductCard = ({ product = {} }) => {
  const [imageError, setImageError] = useState(false);

  // Normalizar datos del producto en una sola estructura
  const normalized = {
    id: product.id ?? product._id ?? String(Math.random()).slice(2),
    name:
      product.nombre_producto ??
      product.nombre ??
      product.name ??
      'Producto sin nombre',
    description:
      product.descripcion_producto ??
      product.descripcion ??
      product.description ??
      'Sin descripción disponible',
    price: product.precio ?? product.price ?? 0,
    image:
      product.url_imagen ??
      product.imagenes?.imagen?.url ??
      product.image ??
      product.url ??
      null,
    rawLink: product.link_mercado ?? product.link ?? product.url ?? null,
    category: product.categoria ?? product.category ?? 'General',
    stock: product.stock ?? 0,
    activo: product.activo ?? true,
    destacado: product.destacado ?? false,
  };

  const handleImageError = () => setImageError(true);

  const getImageUrl = () => {
    if (imageError || !normalized.image) {
      return `https://via.placeholder.com/400x400/4DB6AC/FFFFFF?text=${encodeURIComponent(
        (normalized.name || 'Producto').substring(0, 20)
      )}`;
    }
    return normalized.image;
  };
  const getValidUrl = (raw) => {
    if (!raw) return null;
    try {
      // añadir protocolo si falta
      const url = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
      // validación básica
      const parsed = new URL(url);
      return parsed.href;
    } catch {
      return null;
    }
  };
  const validUrl = getValidUrl(normalized.rawLink);
  return (
    <Card className="product-card">
      <div className="product-badges">
        {normalized.destacado && (
          <Badge bg="warning" className="badge-destacado">
            ⭐ Destacado
          </Badge>
        )}
        {!normalized.activo && (
          <Badge bg="danger" className="badge-inactivo">
            No disponible
          </Badge>
        )}
        {normalized.stock === 0 && normalized.activo && (
          <Badge bg="secondary" className="badge-sin-stock">
            Sin stock
          </Badge>
        )}
      </div>
      <div className="product-image-container">
        <Card.Img
          variant="top"
          src={getImageUrl()}
          alt={normalized.name}
          loading="lazy"
          onError={handleImageError}
          className="product-image"
        />
      </div>
      <Card.Body className="product-card-body">
        <div className="product-category">
          <Badge bg="info" pill className="category-badge">
            {normalized.category}
          </Badge>
        </div>
        <Card.Title className="product-title" title={normalized.name}>
          {normalized.name}
        </Card.Title>
        <Card.Text className="product-description">
          {normalized.description.length > 100
            ? `${normalized.description.substring(0, 100)}...`
            : normalized.description}
        </Card.Text>
        <div className="product-info">
          {Number(normalized.price) > 0 && (
            <div className="product-price">
              <span className="price-label">Precio:</span>
              <span className="price-value">
                ${Number(normalized.price).toLocaleString('es-CL')}
              </span>
            </div>
          )}
          {Number(normalized.stock) > 0 && (
            <div className="product-stock">
              <span className="stock-icon">📦</span>
              <span className="stock-value">{normalized.stock} disponibles</span>
            </div>
          )}
        </div>
        <div className="product-actions">
          {validUrl ? (
            <ViewMoreButton link={validUrl} />
          ) : (
            <div className="no-link-message">
              <small className="text-muted">Sin enlace disponible</small>
            </div>
          )}

          <div className="mt-2">
            <AddToListaButton producto={normalized} />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
