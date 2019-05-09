import React from 'react';

import classes from './Button.module.scss';

const button = (props) => (
    <button
        disabled={props.disabled}        
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}
        style={props.customStyles}
    >
        {props.children}
    </button>
);

export default button;