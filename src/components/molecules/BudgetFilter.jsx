import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './BudgetFilter.css';

function BudgetFilter({ onBudgetChange }) {
  return (
    <div className="budget-filter">
      <h1>¿Cuál es tu presupuesto?</h1>
      <Form.Group className="mb-4">
        <Form.Label>Selecciona tu presupuesto máximo:</Form.Label>
        <Form.Range
          min={0}
          max={2000}
          step={100}
          onChange={(e) => onBudgetChange(Number(e.target.value))}
          className="custom-range"
        />
        <div className="range-labels">
          <span>$0</span>
          <span>$500</span>
          <span>$1000</span>
          <span>$1500</span>
          <span>$2000</span>
        </div>
      </Form.Group>
    </div>
  );
}

BudgetFilter.propTypes = {
  onBudgetChange: PropTypes.func.isRequired
};

export default BudgetFilter;