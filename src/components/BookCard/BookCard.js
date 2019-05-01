import React from 'react';
import classes from './BookCard.module.scss';

const BookCard = props => {
    return (
        <div className={classes.BookCard} onClick={props.selected}>
            <p><strong>Title</strong> : {props.name}</p>
            <p><strong>Author</strong> : {props.author}</p>
        </div>
    );
};

export default BookCard;