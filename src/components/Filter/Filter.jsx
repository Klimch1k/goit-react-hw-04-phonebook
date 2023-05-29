import PropTypes from 'prop-types';

const Filter = ({ formFilter, filter }) => {
  return (
    <>
      <input type="text" name="filter" value={filter} onInput={formFilter} />
    </>
  );
};

export default Filter;

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  formFilter: PropTypes.func.isRequired,
};
