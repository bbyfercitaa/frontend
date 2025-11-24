import falabellaImg from '../assets/falabella.webp';
import mercadolibreImg from '../assets/Mercado-Libre-1.webp';
import parisImg from '../assets/logo paris.webp';

// Configuración de imágenes con rutas actualizadas
// Asegurarnos de que todas las imágenes estén disponibles
const images = {
  falabella: falabellaImg,
  mercadolibre: mercadolibreImg,
  paris: new URL('../assets/logo paris.webp', import.meta.url).href
};

console.log('Imágenes cargadas:', images);

export const collaborators = [
  {
    id: 1,
    name: 'Falabella',
    image: falabellaImg,
    link: 'https://www.falabella.com.ar'
  },
  {
    id: 2,
    name: 'Mercado Libre',
    image: mercadolibreImg,
    link: 'https://www.mercadolibre.com.ar'
  },
  {
    id: 3,
    name: 'Paris',
    image: images.paris,
    link: 'https://www.paris.cl'
  }
];