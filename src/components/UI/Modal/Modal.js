import React from 'react';
import classes from './Modal.module.scss';

import Backdrop from './Backdrop';
// import Button from '../Button/Button';

const Modal = props => {
  return (
    <>
      <Backdrop hide={props.closeModal}/>
      <div className={classes.Modal}>        
        {props.children}
        <button className={classes.closeBtn} onClick={props.closeModal}>close</button>        
      </div>     
    </>
  );
};

export default Modal;