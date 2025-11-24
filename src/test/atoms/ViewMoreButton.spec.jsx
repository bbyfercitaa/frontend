import React from 'react';
import { render, screen } from '@testing-library/react';
import ViewMoreButton from '../../components/atoms/ViewMoreButton';

describe('ViewMoreButton Component', () => {
  let link;
  const mockProps = {
    link: 'https://example.com/product'
  };

  beforeEach(() => {
    render(<ViewMoreButton link={mockProps.link} />);
    link = screen.getByText('Ver en Mercado Libre');
  });

  it('should render the view more button', () => {
    const link = screen.getByText('Ver en Mercado Libre');
    expect(link).toBeTruthy();
  });

  it('should have correct href attribute', () => {
    const link = screen.getByText('Ver en Mercado Libre');
    expect(link.getAttribute('href')).toBe(mockProps.link);
  });

  it('should open in new tab', () => {
    const link = screen.getByText('Ver en Mercado Libre');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('should have correct styling classes', () => {
    const link = screen.getByText('Ver en Mercado Libre');
    expect(link.classList.contains('view-more')).toBe(true);
  });
});