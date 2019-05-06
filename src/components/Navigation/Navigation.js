import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.scss';
import {connect} from 'react-redux';
import ShoppingCartIcon from '../../components/ShoppingCartIcon/ShoppingCartIcon';

import * as actionCreators from '../../store/actions/index';

import {withRouter} from 'react-router-dom';

import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';

import Quantity from '../../components/Quantity/Quantity';

class Navigation extends Component {

  shoppingCartClickedHandler = () => {    
    this.props.showShoppingCart();
  }

  closeModalHandler = () => {
    this.props.hideShoppingCart()
  }

  removeItemHandler = i => {    
    this.props.removeItemFromCart(i);
  }

  addQuantityHandler = (i) => {    
    this.props.addQuantity(i);
  }

  subQuantityHandler = (i) => {    
    this.props.subQuantity(i);
  }

  orderHandler = () => {
    console.log('order handling function');    

    if (!this.props.isAuthenticated) {     
      // check if the user is logged in, if not redirect it to the login page
      this.props.hideShoppingCart();
      this.props.history.push('/login');
    }else{
      // if the user is logged in then send the http request with the data added to the shopping cart
      console.log('we are about to send a request and confirm your order!')
      this.props.hideShoppingCart();
      this.props.history.push('/receipt');      
    }
    
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
                        <td className={classes.tdQuantity}>
                          <Quantity 
                            qNum={el.quantity} 
                            subQuantity={()=>this.subQuantityHandler(i)} 
                            addQuantity={()=>this.addQuantityHandler(i)}
                          />
                        </td>
                        <td className={classes.removeBtn} onClick={() => this.removeItemHandler(i)}>remove</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>            
            <h3 style={{textAlign: "center", padding: 20}}>Subtotal : {this.props.subTotalPrice} $</h3>               
            <Button btnType="Button--Success" clicked={this.orderHandler}>ORDER</Button>
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
    subTotalPrice: state.dom.subTotalPrice,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showShoppingCart: () => dispatch(actionCreators.showCart()),
    hideShoppingCart: () => dispatch(actionCreators.hideCart()),
    removeItemFromCart: (i) => dispatch(actionCreators.removeFromCart(i)),
    addQuantity: (i) => dispatch(actionCreators.addItemNumber(i)),
    subQuantity: (i) => dispatch(actionCreators.subItemNumber(i)),
    // checkIfLoggedIn: () => dispatch(actionCreators.authCheckState()),
    onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Navigation));