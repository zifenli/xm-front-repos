import React from 'react';
import PropTypes from 'prop-types';
import FreeBook from './FreeBook';
import WebBook from './WebBook';
import PubBook from './PubBook';
import style from './style.module.scss';

const App = (props) => {
  const { book, tags, customStyle } = props;

  if (!book) return '';

  return <div className={style.bookDetail}>
    {
      book.cprType === 1 && <FreeBook book={book} tags={tags} customStyle={customStyle}>{props.children}</FreeBook>
    }
    {
      book.cprType === 2 && <WebBook book={book} tags={tags} customStyle={customStyle}>{props.children}</WebBook>
    }
    {
      book.cprType === 3 && <PubBook book={book} tags={tags} customStyle={customStyle}>{props.children}</PubBook>
    }
  </div>;
};

App.propTypes = {
  book: PropTypes.object,
  tags: PropTypes.object,
  style: PropTypes.object,
}

App.defaultProps = {
  book: null,
  customStyle: {
    mainColor: '#F2C24',
  }
}

export default App;
