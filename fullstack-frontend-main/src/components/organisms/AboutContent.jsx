import HistorySection from '../molecules/HistorySection';
import MissionSection from '../molecules/MissionSection';
import '../../styles/organisms/AboutContent.css';

function AboutContent() {
  const historyParagraphs = [
    'Fundada en 2020, nuestra empresa nació con una visión clara: revolucionar la forma en que las personas compran productos electrónicos. Todo comenzó en un pequeño local en el centro de la ciudad, donde nuestro fundador comenzó vendiendo accesorios para celulares.',
    'Con el paso de los años, y gracias a la confianza de nuestros clientes, fuimos expandiendo nuestro catálogo y mejorando nuestros servicios. La pandemia nos impulsó a dar el salto al mundo digital, transformando por completo nuestro modelo de negocio.',
    'Hoy, tres años después, nos enorgullece ser una de las tiendas en línea más confiables del país, con más de 10,000 clientes satisfechos y un catálogo que incluye los últimos avances en tecnología.',
    'Nuestro compromiso sigue siendo el mismo que el primer día: ofrecer productos de calidad, brindar un servicio excepcional y mantenernos a la vanguardia de las tendencias tecnológicas.'
  ];

  const missionText = 'Facilitar el acceso a la tecnología de última generación, ofreciendo productos de calidad a precios competitivos, respaldados por un servicio al cliente excepcional.';

  return (
    <div className="content-section">
      <h1 className="text-center mb-5">Nuestra Historia</h1>
      <HistorySection paragraphs={historyParagraphs} />
      <MissionSection mission={missionText} />
    </div>
  );
}

export default AboutContent;