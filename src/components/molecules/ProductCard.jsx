import { Card } from 'react-bootstrap';
import ViewMoreButton from '../atoms/ViewMoreButton';
import '../../styles/molecules/ProductCard.css';

const ProductCard = ({ product }) => {
  console.log('🔍 Producto recibido en ProductCard:', product);

  // Función para limpiar y validar URLs
  const getValidUrl = (url) => {
    if (!url) return null;
    
    // Si la URL no empieza con http, agregarla
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    
    return url;
  };

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
           product.image || 
           product.url_producto ||
           'https://via.placeholder.com/300x300?text=Sin+Imagen',
    
    // Link a Mercado Libre
    link: getValidUrl(
      product.link_mercado || 
      product.link || 
      product.url
    ) || 'https://www.mercadolibre.cl',
    
    // Categoría
    category: product.categoria || product.category || 'Sin categoría'
  };

  console.log('✅ Datos procesados del producto:', productData);

  // Manejar error de carga de imagen
  const handleImageError = (e) => {
    console.error('❌ Error cargando imagen:', productData.image);
    e.target.src = 'https://via.placeholder.com/300x300?text=Error+Cargando+Imagen';
  };

  // Manejar click en el botón (debugging)
  const handleLinkClick = (e) => {
    console.log('🔗 Link clickeado:', productData.link);
    
    // Verificar si el link es válido
    if (!productData.link || 
        productData.link === '#' || 
        productData.link === 'https://www.mercadolibre.cl') {
      console.warn('⚠️ Link inválido o por defecto');
      alert('Este producto no tiene un link de Mercado Libre configurado');
      e.preventDefault();
    }
  };

  return (
    <Card className="product-card">
      <div className="product-image-container">
        <Card.Img 
          variant="top" 
          src={productData.image} 
          alt={productData.name}
          loading="lazy"
          onError={handleImageError}
        />
      </div>
      <Card.Body className="text-center">
        <Card.Title className="h4 mb-3">{productData.name}</Card.Title>
        <Card.Text className="text-muted">{productData.description}</Card.Text>
        
        {productData.price > 0 && (
          <div className="mb-3">
            <strong className="text-primary fs-5">
              ${typeof productData.price === 'number' 
                ? productData.price.toLocaleString('es-CL') 
                : productData.price}
            </strong>
          </div>
        )}
        
        <div onClick={handleLinkClick}>
          <ViewMoreButton link={productData.link} />
        </div>
        
        {/* Badge de debugging (opcional, puedes quitarlo en producción) */}
        {process.env.NODE_ENV === 'development' && (
          <small className="text-muted d-block mt-2">
            ID: {productData.id} | Cat: {productData.category}
          </small>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;