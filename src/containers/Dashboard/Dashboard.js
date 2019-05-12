import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import classes from './Dashboard.module.scss';

// import components
import Orders from './Orders/Orders';

class Dashboard extends Component {

    componentDidMount() {
        if(this.props.userId){
            this.props.onTryAutoSignup();
            this.props.setUserOrders();
        }
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
        onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
        setUserOrders: () => dispatch(actionCreators.setUserOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);