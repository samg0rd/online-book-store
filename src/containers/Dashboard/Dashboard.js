import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import classes from './Dashboard.module.scss';

// import * as firebase from 'firebase';
import db from '../../configFirebase';

// import components
import Orders from './Orders/Orders';

class Dashboard extends Component {

    componentDidMount() {
        if(this.props.userId){
            this.props.onTryAutoSignup();
        }
        
        // SET USER INFO START  
        
        const ordersRef = db.ref('orders');

        const currentUserId = this.props.userId;

        const anotherOrdersRef = ordersRef.child('user').equalTo(currentUserId);

        ordersRef.on('value', function(snapshot){

            const relatedData = snapshot.val();        
            let keysArray = Object.keys(relatedData);            

            let userPurchases = [];            

            keysArray.forEach(orderId => {                                                
                if(currentUserId === relatedData[orderId].user.userId){
                    userPurchases.push(relatedData[orderId]);
                }
            });

            console.log('userPurchases ------> ', userPurchases);
            
        })
                

        console.log('anotherOrdersRef ---> ',anotherOrdersRef);
        
        // SET USER INFO END

    }
    
    

    render() {
        return (
            <div className={classes.dashboard}>
                <div className={classes.dashboard__userInfoBar}>
                    <p>userFirstName: {this.props.userFirstName}</p>
                    <p>userLastName: {this.props.userLastName}</p>
                </div> 
                <div className={classes.dashboard__section}>
                    <div className={classes.dashboard__side}>
                        <ul className={classes.dashboard__menu}>
                            <li>تنظیمات کاربری</li>
                            <li>خرید ها</li>
                            <li>اجاره ها</li>
                        </ul>                        
                    </div>
                    <div className={classes.dashboard__main}>
                        <Orders />
                    </div>                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userFirstName: state.user.firstName,
        userLastName: state.user.lastName,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch( actionCreators.authCheckState() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);