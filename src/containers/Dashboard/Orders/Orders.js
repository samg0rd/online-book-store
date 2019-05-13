import React,{Component} from 'react';
import {connect} from 'react-redux'; 

import classes from './Order.module.scss';

class Orders extends Component{
    render(){
        return (
            <div>
                {
                    this.props.userOrders ? this.props.userOrders.map((el,i)=>{
                        return (
                            <div key={i} className={classes.userOrder}>
                                {
                                    el.items.map((el,index)=>{
                                        return (
                                            <div key={index}>
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