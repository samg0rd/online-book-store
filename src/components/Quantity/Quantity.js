import React from 'react';
import classes from './Quantity.module.scss';

const Quantity = props => {

    return (
        <div className={classes.quantity}>
            <div className={classes.quantity__sign} onClick={props.subQuantity}>-</div>            
            <div className={classes.quantity__number}><strong> {props.qNum} </strong></div>             
            <div className={classes.quantity__sign} onClick={props.addQuantity}>+</div>
        </div>
    );    
    
}

export default Quantity;