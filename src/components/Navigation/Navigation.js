import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.scss';

import ShoppingCartIcon from '../../components/ShoppingCartIcon/ShoppingCartIcon';

const Navigation = (props) => (
  <div className={classes.Navigation}>
    <ul>      
      {props.links.map((link,i) => (
        <li key={i}>
          <NavLink to={link.to} exact={link.exact}  activeStyle={{color: "yellow"}}>
            {link.label}
          </NavLink>
        </li>
      ))}      
      <ShoppingCartIcon />
    </ul>
  </div>
);

export default Navigation;