import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import classes from './Dashboard.module.scss';

// import components
import Orders from './Orders/Orders';
import Rental from './Rental/Rental';
import UserInfoSettings from './userInfoEdit/UserInfoEdit';

class Dashboard extends Component {

    componentDidMount() {
        if(this.props.userId){
            this.props.onTryAutoSignup();
            this.props.setUserOrders();
        }
    }

    showSettingsHandler = () => {        
        this.props.showUserSettings()
    }

    showOrdersHandler = () => {        
        this.props.showUserOrders();
    }

    showRentalsHandler = () => {        
        this.props.showUserRentals();
    }
    
    render() {

        let content = null;

        if(this.props.showOrders){            
            content = <Orders />
        }
        if(this.props.showRentals){                        
            content = <Rental />
        }
        if(this.props.showSettings){            
            content = <UserInfoSettings />
        }

        return (
            <div className={classes.dashboard}>
                <div className={classes.dashboard__userInfoBar}>
                    <p>userFirstName: {this.props.userFirstName}</p>
                    <p>userLastName: {this.props.userLastName}</p>
                </div> 
                <div className={classes.dashboard__section}>
                    <div className={classes.dashboard__side}>
                        <ul className={classes.dashboard__menu}>
                            <li onClick={this.showSettingsHandler}>تنظیمات کاربری</li>
                            <li onClick={this.showOrdersHandler}>خرید ها</li>
                            <li onClick={this.showRentalsHandler}>اجاره ها</li>
                        </ul>
                    </div>
                    <div className={classes.dashboard__main}>
                        { content }
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
        userId: state.auth.userId,
        showOrders: state.dashboard.showOrders,
        showRentals: state.dashboard.showRentals,
        showSettings: state.dashboard.showUserSettings
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
        setUserOrders: () => dispatch(actionCreators.setUserOrders()),
        showUserOrders: () => dispatch(actionCreators.showUserOrders()),
        showUserRentals: () => dispatch(actionCreators.showUserRentals()),
        showUserSettings: ()=> dispatch(actionCreators.showUserSettings())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);