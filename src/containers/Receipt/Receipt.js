import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import classes from './Receipt.module.scss';
import Button from '../../components/UI/Button/Button';
import Loading from '../../components/UI/Loading/Loading';

class Receipt extends Component {  

    confirmOrderHandler = () => {        
        // put the order (whatever it is) as the first argument in the below function (and get it from the state stored in redux)
        // put the token as the second argument        
        const order = {
            items: this.props.itemsToPurchase,
            totalPrice: this.props.subTotalPrice,
            user: {
                userId: this.props.userId,
                firstName: this.props.userFirstName,
                lastName: this.props.userLastName
            }
        }
        console.log('ORDER TO PURCHASE --> ', order);
        this.props.purchaseOrder(order,this.props.token, this.props.history);
    }

    cancelOrderHandler = () => {
        console.log('cancelOrderHandler');        
        this.props.cancelOrder();
        this.props.history.push('/');      
    }

    render() {
        let errMessage = null;
        if(this.props.errorOnPurchase){
            errMessage = <p>{this.props.errorOnPurchase}</p>
        }
        return (            
            <div>

                {errMessage}

                <h2 style={{textAlign: "center"}}>PRE CONFIRM ORDER RECEIPT</h2>       
    
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
                                        <td>
                                            {el.quantity}                            
                                        </td>                            
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>            
                <h3 style={{textAlign: "center", padding: 20}}>Subtotal : {this.props.subTotalPrice} $</h3>                
                <div className={classes.btnHolder}>
                    <Button btnType="Button--Danger" clicked={this.cancelOrderHandler}>CANCEL THE ORDER</Button>
                    <Button btnType="Button--Success" clicked={this.confirmOrderHandler} disabled={this.props.purchaseStart ? true : false } >CONFIRM AND PAY</Button>                          
                </div>                
                {
                    this.props.purchaseStart ? <Loading /> : null                    
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        addedCartItems: state.dom.cartItems,
        subTotalPrice: state.dom.subTotalPrice,
        token: state.auth.token,
        itemsToPurchase: state.dom.cartItems,
        purchaseStart: state.dom.purchaseStart,
        errorOnPurchase: state.dom.errorOnPurchase,
        userFirstName: state.user.firstName,
        userLastName: state.user.lastName,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cancelOrder: () => dispatch(actionCreators.cancelOrderConfirmation()),
        purchaseOrder: (orderData, token, router) => dispatch(actionCreators.confirmOrderConfirmation(orderData, token, router))
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Receipt));