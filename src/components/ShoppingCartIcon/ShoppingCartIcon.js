import React, { Component } from 'react';
import {connect} from 'react-redux';

import classes from './ShoppingCartIcon.module.scss';

import cartIcon from '../../assets/iconfinder_Basket_877012.png';

class ShoppingCart extends Component {

    // constructor(props){
    //     super(props)
    // }

    render() {
        return (            
            <li className={classes.cart} onClick={this.props.clicked}>
                <img src={cartIcon} alt="cart icon"/>
                <p className={classes.cart__number}><strong>{this.props.cartNumber}</strong></p>
            </li>
        );
    }
}

const mapStateToProps = state => {
    return {
        cartNumber: state.dom.cartNum
    }
}

export default connect(mapStateToProps)(ShoppingCart);