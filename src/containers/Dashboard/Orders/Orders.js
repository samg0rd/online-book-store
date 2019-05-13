import React,{Component} from 'react';
import {connect} from 'react-redux'; 

import classes from './Order.module.scss';

class Orders extends Component{
    render(){
        return (
            <div>
                {
                    this.props.userOrders ? this.props.userOrders.map(el=>{
                        return (
                            <div className={classes.userOrder}>
                                {
                                    el.items.map(el=>{
                                        return (
                                            <div>
                                                <span>{el.name}</span> : <span>{el.author}</span> --- <span>{el.price} $</span> --- <span>تعداد :‌ {el.quantity}</span>
                                            </div>
                                        )
                                    })
                                } 
                                <div>قیمت کل :‌ {el.totalPrice}</div>                                                            
                            </div>                            
                        )                        
                    }) : null 
                }                
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        userOrders: state.user.userOrders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders);