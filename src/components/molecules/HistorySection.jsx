import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

function HistorySection({ paragraphs }) {
  return (
    <Row className="mb-5">
      <Col lg={8} className="mx-auto">
        {paragraphs.map((text, index) => (
          <p key={index} className="history-text">
            {text}
          </p>
        ))}
      </Col>
    </Row>
  );
}

HistorySection.propTypes = {
  paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default HistorySection;