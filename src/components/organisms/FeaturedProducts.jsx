import { Container, Row, Col } from 'react-bootstrap';
import '../../styles/organisms/FeaturedProducts.css';
import { products } from '../../data/productData';
import ProductCard from '../molecules/ProductCard';

const FeaturedProducts = () => {

  return (
    <section className="featured-products">
      <Container>
        <h1 className="section-title">Productos destacados</h1>
        <Row className="g-4">
          {products.map(product => (
            <Col key={product.id} xs={12} md={4}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturedProducts;