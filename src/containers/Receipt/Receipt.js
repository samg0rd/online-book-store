import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import classes from './Receipt.module.scss';
import Button from '../../components/UI/Button/Button';

class Receipt extends Component {

    confirmOrderHandler = () => {
        console.log('confirmOrderHandler');        
    }

    cancelOrderHandler = () => {
        console.log('cancelOrderHandler');        
        this.props.cancelOrder();
        this.props.history.push('/');      
    }

    render() {
        return (            
            <div>

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
                    <Button btnType="Button--Success" clicked={this.confirmOrderHandler}>CONFIRM AND PAY</Button>                
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        addedCartItems: state.dom.cartItems,
        subTotalPrice: state.dom.subTotalPrice,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cancelOrder: () => dispatch(actionCreators.cancelOrderConfirmation())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Receipt);