import MegaOffer from '../components/organisms/MegaOffer';
import FeaturedProducts from '../components/organisms/FeaturedProducts';
import Collaborators from '../components/organisms/Collaborators';
import '../styles/pages/Home.css';

function Home() {
  return (
    <div>
      <MegaOffer />
      <FeaturedProducts />
      <Collaborators />
    </div>
  );
}


export default Home;