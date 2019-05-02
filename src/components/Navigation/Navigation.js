import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.scss';
import {connect} from 'react-redux';
import ShoppingCartIcon from '../../components/ShoppingCartIcon/ShoppingCartIcon';

import * as actionCreators from '../../store/actions/index';

import Modal from '../../components/UI/Modal/Modal';

class Navigation extends Component {

  constructor(props){
    super(props)
  }

  shoppingCartClickedHandler = () => {
    console.log('shpping cart icon clicked!!!');    
    this.props.showShoppingCart();
  }

  render(){

    let modal = null;

    if(this.props.showCartModal){
      modal = (
        <Modal>
          <h1>SHOPPING CART</h1>
        </Modal>
      )
    }

    return (
      <div className={classes.Navigation}>
        {modal}
        <ul>      
          {this.props.links.map((link,i) => (
            <li key={i}>
              <NavLink to={link.to} exact={link.exact}  activeStyle={{color: "yellow"}}>
                {link.label}
              </NavLink>
            </li>
          ))}
          <ShoppingCartIcon clicked={this.shoppingCartClickedHandler}/>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    itemsAddedToShoppingCart: state.dom.cartItems,
    showCartModal: state.dom.showCart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showShoppingCart: () => dispatch(actionCreators.showCart()),
    hideShoppingCart: () => dispatch(actionCreators.hideCart()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navigation);