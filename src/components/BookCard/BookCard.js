import React from 'react';
import classes from './BookCard.module.scss';

import bookImg from '../../assets/book2.jpg';

const BookCard = props => {
  return (      
    <div className={classes.BookCard} onClick={props.selected}>
      <div className={classes.BookCard__imgPlaceHolder}>
        <img src={bookImg}/>
      </div>
      <div className={classes.BookCard__content}>
        <p><strong>{props.name}</strong></p>
        <p><strong>{props.author}</strong></p>
        <p><strong>{props.price}$</strong></p>
      </div>
    </div>
  );
};

export default BookCard;