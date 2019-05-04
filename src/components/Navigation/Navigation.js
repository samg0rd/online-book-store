import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.scss';
import {connect} from 'react-redux';
import ShoppingCartIcon from '../../components/ShoppingCartIcon/ShoppingCartIcon';

import * as actionCreators from '../../store/actions/index';

import Modal from '../../components/UI/Modal/Modal';

import Quantity from '../../components/Quantity/Quantity';

class Navigation extends Component {

  constructor(props){
    super(props)
  }

  shoppingCartClickedHandler = () => {    
    this.props.showShoppingCart();
  }

  closeModalHandler = () => {
    this.props.hideShoppingCart()
  }

  removeItemHandler = i => {    
    this.props.removeItemFromCart(i);
  }

  addQuantityHandler = () => {
    console.log('ADD boogh');    
  }

  subQuantityHandler = () => {
    console.log('SUB doogh!');
    
  }

  render(){

    let modal = null;

    let modalContent = (
      <div className={classes.shoppingCart}>
        <h2 style={{textAlign: "center"}}>your shopping cart is empty</h2>
      </div>
    )

    if(this.props.addedCartItems.length > 0){
      modalContent = (
        <div className={classes.shoppingCart}>
          <h2 style={{textAlign: "center"}}>SHOPPING CART</h2>


            <table>
              <tbody>
                <tr>
                  <th>title</th>
                  <th>author</th>
                  <th>price</th>
                  <th>quantity</th>           
                </tr>
                {
                  this.props.addedCartItems.map((el,i)=>{                  
                    return (                
                      <tr key={i}>
                        <td><strong>{el.name}</strong></td>
                        <td><strong>{el.author}</strong></td>
                        <td><strong>{el.price}</strong></td>
                        {/* <td className={classes.tdQuantity}><div>-</div> <strong>{el.quantity}</strong> <div>+</div></td> */}
                        <td className={classes.tdQuantity}><Quantity qNum={el.quantity} subQuantity={this.subQuantityHandler} addQuantity={this.addQuantityHandler}/></td>
                        <td className={classes.removeBtn} onClick={() => this.removeItemHandler(i)}>remove</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>    

            <h3 style={{textAlign: "center", padding: 20}}>Subtotal : {this.props.subTotalPrice} $</h3>      
        </div>
      )
    }


    if(this.props.showCartModal){
      modal = (
        <Modal closeModal={this.closeModalHandler}>
          {modalContent}
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
    showCartModal: state.dom.showCart,
    addedCartItems: state.dom.cartItems,
    subTotalPrice: state.dom.subTotalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showShoppingCart: () => dispatch(actionCreators.showCart()),
    hideShoppingCart: () => dispatch(actionCreators.hideCart()),
    removeItemFromCart: (i) => dispatch(actionCreators.removeFromCart(i))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navigation);