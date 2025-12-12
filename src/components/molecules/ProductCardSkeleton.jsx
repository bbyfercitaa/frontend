import { Card } from 'react-bootstrap';
import '../../styles/molecules/ProductCardSkeleton.css';

const ProductCardSkeleton = () => {
  return (
    <Card className="product-card-skeleton">
      <div className="skeleton-image"></div>
      <Card.Body>
        <div className="skeleton-category"></div>
        <div className="skeleton-title"></div>
        <div className="skeleton-title-short"></div>
        <div className="skeleton-description"></div>
        <div className="skeleton-description"></div>
        <div className="skeleton-description-short"></div>
        <div className="skeleton-info">
          <div className="skeleton-price"></div>
          <div className="skeleton-stock"></div>
        </div>
        <div className="skeleton-button"></div>
        <div className="skeleton-button"></div>
      </Card.Body>
    </Card>
  );
};

export default ProductCardSkeleton;