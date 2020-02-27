import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import style from './style.module.scss';

const PubBook = (props) => {
  const { book, tags } = props;
  const getScoreItems = (items) => items.map((item, index) => <span key={item.name}>
    { (item.type === 'hot_pub_trail' || item.type === 'new_pub_trail') ? `${item.name}${book.category}` : item.name }得分{Number(item.value).toFixed(1)}分{index === items.length - 1 ? '' : '、'}</span>);

  return <div className={style.left}>
  <h3 className={style.header}>
    <span>{book.bookTitle}</span>
    {/* && <CopyRightTag cprGrade={book.cprGrade} /> */}
    {book.cprGrade}
  </h3>
  <div className={style.bookInfo}>
    <div className={style.coverWrap}>
      <img src={book.bookCoverRemote} style={{width: '160px', height: '236px'}}/>
      {/* <ImageAdaptive image={book.bookCoverRemote} config={{ desWidth: 160, desHeight: 236 }}/> */}
    </div>
    <div className={style.textWrap}>
      <div className={style.basicInfo}>
        <p>作者：{book.author}</p>
        { book.category && <p>类别：{book.category} </p> }
        { book.bookTags && <p>标签：{book.bookTags} </p> }
        { book.publisher && <p>出版社：{book.publisher}{ book.pubDate ? ` / ${moment(book.pubDate).format('YYYY-MM-DD')}` : '' }</p> }
        { !!book.wordNumber && <p>字数：约{number2txt(book.wordNumber)}字 </p> }
        { !!book.language && book.sourceTypeCode === 1 && <p>语种：{book.language} </p> }
        { !!book.source && book.sourceTypeCode === 2 && <p>来源站点：{book.source}</p> }
        { book.isbn13 && <p>ISBN：{book.isbn13}</p> }
        {tags}
      </div>
      <div className={style.scoreInfo}>
        <div className={style.scores}>
          <div className={style.ranks}>
            {
              (book.recRank.hot_pub || book.recRank.new_pub) && <div style={{ marginRight: '12px' }}>
                <p>综合排名</p>
                <p><span style={{ fontSize: '32px', color: '#BF2C24' }}>{book.recRank.hot_pub || book.recRank.new_pub || book.recRank.surge_pub}</span>&nbsp;名</p>
              </div>
            }
            <div>
              <p>{book.recRank.hot_pub_trail || book.recRank.new_pub_trail}</p>
              {book.recRank.surge_pub && <p>飙升榜第{book.recRank.surge_pub}名</p> }
            </div>
          </div>
          <div>
            { !!book.doubanScore && <p>豆瓣评分：{book.doubanScore}分</p> }
            { !!parseInt(book.comment, 10) && <p>豆瓣评论数：{book.comment}条</p> }
            { !!parseInt(book.commentJd, 10) && <p>京东评论数：{book.commentJd}条</p> }
            { !!parseInt(book.commentDang, 10) && <p>当当评论数：{book.commentDang}条</p> }
            { !!book.recScoreMap.length && <p>综合评分：{ getScoreItems(book.recScoreArray) }</p> }
          </div>
        </div>
        {props.children}
      </div>
    </div>
  </div>
</div>;
};

PubBook.propTypes = {
  book: PropTypes.object,
}

export default PubBook;
