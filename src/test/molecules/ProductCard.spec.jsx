import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../../components/molecules/ProductCard';
import { AuthProvider } from '../../context/AuthContext';
import { ListasProvider } from '../../context/ListasContext';

const Wrapper = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>
      <ListasProvider>
        {children}
      </ListasProvider>
    </AuthProvider>
  </BrowserRouter>
);

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    nombre_producto: 'iPhone 15 Pro',
    descripcion_producto: 'El último modelo de Apple',
    precio: 999990,
    url_imagen: 'https://example.com/iphone.jpg',
    link_mercado: 'https://www.mercadolibre.cl/iphone',
    categoria: 'Smartphones',
    stock: 10,
    activo: true,
    destacado: true
  };

  it('debe renderizar correctamente', () => {
    render(
      <Wrapper>
        <ProductCard product={mockProduct} />
      </Wrapper>
    );

    expect(screen.getByText('iPhone 15 Pro')).toBeTruthy();
    expect(screen.getByText(/El último modelo de Apple/)).toBeTruthy();
  });

  it('debe mostrar el precio formateado', () => {
    render(
      <Wrapper>
        <ProductCard product={mockProduct} />
      </Wrapper>
    );

    expect(screen.getByText(/999.990/)).toBeTruthy();
  });

  it('debe mostrar badge de destacado', () => {
    render(
      <Wrapper>
        <ProductCard product={mockProduct} />
      </Wrapper>
    );

    expect(screen.getByText('⭐ Destacado')).toBeTruthy();
  });

  it('debe mostrar badge de sin stock cuando stock es 0', () => {
    const productSinStock = { ...mockProduct, stock: 0 };
    
    render(
      <Wrapper>
        <ProductCard product={productSinStock} />
      </Wrapper>
    );

    expect(screen.getByText('Sin stock')).toBeTruthy();
  });

  it('debe mostrar la categoría', () => {
    render(
      <Wrapper>
        <ProductCard product={mockProduct} />
      </Wrapper>
    );

    expect(screen.getByText('Smartphones')).toBeTruthy();
  });

  it('debe mostrar cantidad de stock', () => {
    render(
      <Wrapper>
        <ProductCard product={mockProduct} />
      </Wrapper>
    );

    expect(screen.getByText('10 disponibles')).toBeTruthy();
  });

  it('debe renderizar imagen con atributo alt correcto', () => {
    render(
      <Wrapper>
        <ProductCard product={mockProduct} />
      </Wrapper>
    );

    const img = screen.getByAltText('iPhone 15 Pro');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBeTruthy();
  });

  it('debe usar imagen placeholder cuando falla la carga', async () => {
    render(
      <Wrapper>
        <ProductCard product={mockProduct} />
      </Wrapper>
    );

    const img = screen.getByAltText('iPhone 15 Pro');
    
    // Simular error de carga
    fireEvent.error(img);

    await waitFor(() => {
      expect(img.getAttribute('src')).toContain('placeholder');
    });
  });

  it('debe renderizar botón "Ver donde comprar"', () => {
    render(
      <Wrapper>
        <ProductCard product={mockProduct} />
      </Wrapper>
    );

    expect(screen.getByText('Ver donde comprar')).toBeTruthy();
  });

  it('debe manejar productos con datos mínimos', () => {
    const minimalProduct = {
      id: 2,
      nombre_producto: 'Producto Básico'
    };

    render(
      <Wrapper>
        <ProductCard product={minimalProduct} />
      </Wrapper>
    );

    expect(screen.getByText('Producto Básico')).toBeTruthy();
    expect(screen.getByText('Sin descripción')).toBeTruthy();
  });

  it('debe mostrar badge de "No disponible" cuando activo es false', () => {
    const inactiveProduct = { ...mockProduct, activo: false };
    
    render(
      <Wrapper>
        <ProductCard product={inactiveProduct} />
      </Wrapper>
    );

    expect(screen.getByText('No disponible')).toBeTruthy();
  });

  it('debe truncar descripción larga', () => {
    const longDescription = 'A'.repeat(150);
    const productWithLongDesc = {
      ...mockProduct,
      descripcion_producto: longDescription
    };

    render(
      <Wrapper>
        <ProductCard product={productWithLongDesc} />
      </Wrapper>
    );

    const description = screen.getByText(/A{100}\.\.\./);
    expect(description).toBeTruthy();
  });

  it('debe aplicar clase CSS de hover', () => {
    const { container } = render(
      <Wrapper>
        <ProductCard product={mockProduct} />
      </Wrapper>
    );

    const card = container.querySelector('.product-card');
    expect(card).toBeTruthy();
    expect(card.classList.contains('product-card')).toBe(true);
  });
});