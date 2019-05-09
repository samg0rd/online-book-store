import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classes from './Auth.module.scss';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            firstname: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'firstname'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2
                },
                valid: false,
                touched: false
            },
            lastname: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'lastname'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2
                },
                valid: false,
                touched: false
            },
        },
        isSignup: false,
        showFakeInfo: false
    }

    componentDidMount() {
        if (this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity ( value, rules ) {
        let isValid = true;
        if ( !rules ) {
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            }
        };
        this.setState( { controls: updatedControls } );
    }

    submitHandler = ( event ) => {
      event.preventDefault();
      if(this.isSignup){
        this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.controls.firstname.value, this.state.controls.lastname.value, this.state.isSignup, this.props.history , this.props.isLoggedInbeforePurchase);
      }else{
        this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, null, null, this.state.isSignup, this.props.history, this.props.isLoggedInbeforePurchase);
      }
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }

    toggleFakeInfoHandler = () => {        
        this.setState((prevState)=>{
            return {
                ...prevState,
                showFakeInfo: !prevState.showFakeInfo
            }
        })        
    }

    render () {

        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }
        
        let signInFormArray = [];
        let signUpFormArray = [];
        let form = null;

        formElementsArray.map(formElement => {
            signUpFormArray.push(formElement);
            if(formElement.id === "email" || formElement.id === "password"){
                signInFormArray.push(formElement)
            }
        });

        if(this.state.isSignup){
            form = signUpFormArray.map(formElement => {
                return (
                    <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
                )
            }) 
        }else{
            form = signInFormArray.map(formElement => {
                return (
                    <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
                )
            }) 
        }        
                        

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className={classes.Auth}>                
                {authRedirect}
                {errorMessage}     
                <form className={classes.Auth__form} onSubmit={this.submitHandler}>
                    {
                     this.props.isLoggedInbeforePurchase ? <h3>لطفا پیش از خرید به حساب کاربری خود وارد شوید</h3> : null
                    }                    
                    <h2>                    
                        {this.state.isSignup ? 'ثبت نام' : 'ورود'}
                    </h2>
                    <div className={classes.Auth__showFakeInfo} onClick={this.toggleFakeInfoHandler}>
                        show fake signin email and password                   
                    </div>
                    <div className={this.state.showFakeInfo ? [classes.Auth__fakeInfo, classes.Auth__fakeInfo__expand].join(' ') : classes.Auth__fakeInfo}>
                        <p><span>email : </span> booboo@boo.boo</p>
                        <p><span>password : </span> 123456789</p>
                    </div>
                    {form}
                    <Button btnType="Button--Success">SUBMIT</Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Button--Danger">برو به {this.state.isSignup ? 'ورود' : 'ثبت نام'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        isLoggedInbeforePurchase: state.dom.onOrderNotLoggedin
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, firstname, lastname, isSignup, route, isLoggedInbeforePurchase ) => dispatch( actions.auth( email, password, firstname, lastname, isSignup, route, isLoggedInbeforePurchase ) ),
        // onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( Auth ));