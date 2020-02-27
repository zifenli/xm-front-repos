import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import style from './style.module.scss';

const FreeBook = (props) => {
  const { book, tags } = props;

  const getScoreItems = (items) => items.map((item, index) => <span key={item.name}>
    { item.name }得分{Number(item.value).toFixed(1)}分{index === items.length-1 ? '' : '、'}</span>);

  return <div className={style.left}>
    <h3 className={style.header}>
      <span>{book.bookTitle}</span>
    </h3>
    <div className={style.bookInfo}>
      <div className={style.coverWrap}>
        <img src={book.bookCoverRemote} style={{width: '160px', height: '236px'}}/>
        {/* <ImageAdaptive image={book.bookCoverRemote} config={{ desWidth: 160, desHeight: 236 }} /> */}
      </div>
      <div className={style.textWrap}>
        <div className={style.basicInfo}>
          <p>作者：{book.author}</p>
          {book.category && <p>类别：{book.category} </p>}
          {book.bookTags && <p>标签：{book.bookTags} </p>}
          {book.publisher && <p>出版社：{book.publisher}{book.pubDate ? ` / ${moment(book.pubDate).format('YYYY-MM-DD')}` : ''}</p>}
          {/* {!!book.wordNumber && <p>字数：约{number2txt(book.wordNumber)}字 </p>} */}
          {!!book.wordNumber && <p>字数：约{book.wordNumber}字 </p>}
          {!!book.language && <p>语种：{book.language} </p>}
          {book.isbn13 && <p>ISBN：{book.isbn13}</p>}
          {tags}
        </div>
        <div className={style.scoreInfo}>
          <div className={style.scores}>
            <div className={style.ranks}>
              {
                book.recRank.free && <div style={{ marginRight: '12px' }}>
                  <p>综合排名</p>
                  <p><span style={{ fontSize: '32px', color: '#BF2C24' }}>{book.recRank.free}</span>&nbsp;名</p>
                </div>
              }
            </div>
            {
              !!book.recScoreMap.length && <p>综合评分：{ getScoreItems(book.recScoreArray) }</p>
            }
          </div>
          <div className={style.btnWrap}>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  </div>;
};

FreeBook.propTypes = {
  book: PropTypes.object,
  actionBtns: PropTypes.object,
}

export default FreeBook;
