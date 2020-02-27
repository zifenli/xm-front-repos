import React from 'react';
import PropTypes from 'prop-types';

const PubBook = (props) => {
  const { book } = props;

  return <div>PubBook</div>;
};

PubBook.propTypes = {
  book: PropTypes.object,
  actionBtns: PropTypes.object,
}

export default PubBook;
