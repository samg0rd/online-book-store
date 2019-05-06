import React, { Component } from 'react';
import {connect} from 'react-redux';

import Button from '../../components/UI/Button/Button';

class Receipt extends Component {
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
                <Button btnType="Button--Success" clicked={this.orderHandler}>CONFIRM AND PAY</Button>
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

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Receipt);