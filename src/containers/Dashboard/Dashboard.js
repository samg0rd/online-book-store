import React, { Component } from 'react';
import {connect} from 'react-redux';

import classes from './Dashboard.module.scss';

class Dashboard extends Component {
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
                    <div className={classes.dashboard__main}>main</div>                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userFirstName: state.user.firstName,
        userLastName: state.user.lastName
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);