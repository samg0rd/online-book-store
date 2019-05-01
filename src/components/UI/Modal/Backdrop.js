import React from 'react';
import classes from './Modal.module.scss';

const Backdrop = props => {
  return (
    <div className={classes.backDrop} onClick={props.hide}></div>
  );
};

export default Backdrop;