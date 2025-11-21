import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../../styles/molecules/ProductCard.css';

const ProductCard = ({ product }) => {
  const openExternal = (url) => {
    if (!url) return; // o mostrar feedback
    const normalized = url.startsWith('http') ? url : `https://${url}`;
    window.open(normalized, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="h-100">
      <div className="product-image-container">
        <Card.Img 
          variant="top" 
          src={product.url_producto || product.url_imagen || product.url || product.image || '/placeholder-image.jpg'}
          alt={product.nombre || product.name || product.nombre_producto}
          loading="lazy"
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg'; // Imagen por defecto si falla
          }}
        />
      </div>
      <Card.Body>
        <Card.Title>{product.nombre || product.name || product.nombre_producto}</Card.Title>
        <Card.Text>{product.descripcion || product.description || product.descripcion_producto}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <span>{product.precio && `$${product.precio}`}</span>
          <Button
            variant="primary"
            onClick={() => openExternal(product.link_mercado || product.link || '#')}
            disabled={!product.link_mercado && !product.link}
          >
            Ver en Mercado Libre
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;