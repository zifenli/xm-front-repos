import React from 'react';
import PropTypes from 'prop-types';

const WebBook = (props) => {
  const { book } = props;

  return <div>WebBook</div>;
};

WebBook.propTypes = {
  book: PropTypes.object,
  actionBtns: PropTypes.object,
}

export default WebBook;
