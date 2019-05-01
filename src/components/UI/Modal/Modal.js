import React from 'react';
import classes from './Modal.module.scss';

const Modal = props => {
    return (
        <div className={classes.backDrop}>
            <div className={classes.Modal}>
                <p><strong>Title</strong> : {props.name}</p>
                <p><strong>Author</strong> : {props.author}</p>
                <button onClick={props.closeModal}>close</button>
            </div>
        </div>
    );
};

export default Modal;