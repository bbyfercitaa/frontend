import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

function MissionSection({ mission }) {
  return (
    <Row className="mt-5">
      <Col lg={8} className="mx-auto text-center">
        <h1 className="mb-4">Nuestra Misión</h1>
        <p className="mission-text">
          {mission}
        </p>
      </Col>
    </Row>
  );
}

MissionSection.propTypes = {
  mission: PropTypes.string.isRequired
};

export default MissionSection;