import React from 'react';
import PropTypes from 'prop-types';
import FreeBook from './FreeBook';
import WebBook from './WebBook';
import PubBook from './PubBook';
import style from './style.module.scss';

const App = (props) => {
  const { book, tags } = props;

  if (!book) return '';

  return <div className={style.bookDetail}>
    {
      book.cprType === 1 && <FreeBook book={book} tags={tags}>{props.children}</FreeBook>
    }
    {
      book.cprType === 2 && <WebBook book={book} tags={tags}>{props.children}</WebBook>
    }
    {
      book.cprType === 3 && <PubBook book={book} tags={tags}>{props.children}</PubBook>
    }
  </div>;
};

App.propTypes = {
  book: PropTypes.object,
  tags: PropTypes.object,
}

App.defaultProps = {
  book: null,
}

export default App;
