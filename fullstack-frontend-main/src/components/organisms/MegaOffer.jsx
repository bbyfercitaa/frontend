import { Container } from 'react-bootstrap';
import Offers from '../molecules/offers';
import { offers } from '../../data/offersData';
import '../../styles/organisms/MegaOffer.css';

function MegaOffer() {
  return (
    <div className="mega-offer-section">
      <Container>
        <div className="mega-offer-slider">
          {[...offers, ...offers].map((offer, index) => (
            <div key={index} className="mega-offer-slide">
              <Offers offer={offer} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default MegaOffer;