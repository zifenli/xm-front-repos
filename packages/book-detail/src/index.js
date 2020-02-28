import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FreeBook from './FreeBook';
import WebBook from './WebBook';
import PubBook from './PubBook';
import style from './style.module.scss';

const formatItems = (items) => {
  if (!items.length) return {};

  return items.reduce((sum, item) => ({
    ...sum,
    [item.type]: [item.value],
  }), {});
}

const  sourceTypes = [
  { type: 'free', name: '公版' },
  { type: 'webArticle', name: '网文' },
  { type: 'publish',  name: '出版' },
  { type: 'surge_pub', name: '飙升榜' },
  { type: 'new_pub', name: '出版新品综合' },
  { type: 'new_pub_s', name: '出版新品实时' },
  { type: 'new_pub_trail', name: '出版新品' },
  { type: 'hot_pub', name: '出版热销综合' },
  { type: 'hot_pub_s', name: '出版热销实时' },
  { type: 'hot_pub_trail', name: '出版热销' },
  { type: 'new_web', name: '网文新品综合' },
  { type: 'hot_web', name: '网文热销综合' }
]

const webScoreMap = {
  clickMonthNum: '月点击数',
  clickNum: '点击数',
  popularity: '人气/收藏',
  recommendMonthNum: '月收藏',
  recommendNum: '收藏',
}

const bookFormatter = book => {
  if (book) {
    const onlineLitScoreMap = JSON.parse(book.onlineLitScoreMap || '{}');
    let onlineLitScores = []; // 网文的评分信息

    if (onlineLitScoreMap) {
      Object.keys(onlineLitScoreMap).forEach(key => {
        if (Object.keys(webScoreMap).includes(key) && onlineLitScoreMap[key]) {
          onlineLitScores.push({ name: webScoreMap[key], value: onlineLitScoreMap[key] });
        }
      });
    }

    return {
      ...book,
      recRank: formatItems(JSON.parse(book.recRankMap || '[]')),
      recScore: formatItems(JSON.parse(book.recScoreMap || '[]')),
      recRankMap: JSON.parse(book.recRankMap || '[]'),
      recScoreMap: JSON.parse(book.recScoreMap || '[]'),
      recScoreArray: JSON.parse(book.recScoreMap || '[]').map(item => ({
        ...item,
        name: (sourceTypes.find(item2 => item2.type === item.type) || {}).name
      })).filter(item => item.name),
      onlineLitScores,
      cprType: book.sourceTypeCode,
    }
  }
}

const App = (props) => {
  const { tags, customStyle } = props;
  let { book } = props;
  book = bookFormatter(book);

  return book && <div className={style.bookDetail}>
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
