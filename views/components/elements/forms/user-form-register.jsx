import React from 'react';
import Load from '../../utilities/load.jsx';
import Fetcher from "../../utilities/fetcher.jsx";
import Inputs from "../../utilities/inputs.jsx";
import {Link, browserHistory} from 'react-router';
import {DataForm, DataChild} from "../../utilities/data-form.jsx";
let _ = require("lodash");

class UserFormRegister extends React.Component {

    constructor(props){
        super(props);
        let token = this.props.token;
        this.state = {
            token: token,
            url: token ? `/api/v1/users/register?token=${token}` : `/api/v1/users/register`,
            loading: false,
            success: false,
        };
        this.handleResponse = this.handleResponse.bind(this);
    }

    handleResponse(response){
        console.log("inside handle response", response);
        if(!response.error){
            localStorage.setItem("permissions", response.permissions);
            this.setState({success: true});
            // console.log("LOCATION!", that.props.location);
            if(this.props.location.state && this.props.location.state.fromLogin){
                return browserHistory.go(-2);
            }
            browserHistory.goBack();
        }
    }

    render () {

        if(this.state.loading){
            return ( <Load/> );
        }else if(this.state.success){
            browserHistory.push("/");
        }else{
            //TODO: Add validation functions and pass into DataForm as props
            return (
                <div className="sign-up">
                    <DataForm handleResponse={this.handleResponse} url={this.state.url} method={'POST'}>

                        {/*<img className="login-brand" src="/assets/logos/brand-logo-dark.png"/>*/}
                        {this.state.token ?
                            <div>
                                <h3 className="m-b-20">Finish Your Invitation</h3>
                                <p>Please enter your information to finish the invitation</p>
                            </div> :
                            <div>
                                <h3 className="m-b-20">Sign up</h3>
                                <p>Please enter your email address and password to create your account</p>
                            </div>
                        }
                        <div className="form-group">
                            <label className="control-label">Name</label>
                            <input type="text" name="name" className="form-control"/>
                            <span className="bmd-help">Please enter your name</span>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Phone Number</label>
                            <input type="text" name="phone" className="form-control"/>
                            <span className="bmd-help">Please enter your phone number</span>
                        </div>
                        {!this.state.token &&
                        <div className="form-group">
                            <label className="control-label">Email address</label>
                            <input type="email" name="email" className="form-control"/>
                            <span className="bmd-help">Please enter your email</span>
                        </div>
                        }
                        <div className="form-group">
                            <label className="control-label">Password</label>
                            <input type="password" name="password" className="form-control"/>
                            <span className="bmd-help">Please enter your password</span>
                        </div>
                        <div className="agreement-checkbox checkbox">
                            <label>
                                <input name="agree" type="checkbox"/>
                                By clicking on create account, you agree to our terms of service and that you have read our privacy policy,
                                including our cookie use policy
                            </label>
                        </div>

                        {!this.state.token ?
                            <div>
                                <button className="btn btn-raised btn-lg btn-primary btn-block" type="submit" value="submit">Sign Up</button>
                                <p className="sign-up-link p-t-15">I have an account <Link className="sign-up-link" to="login">Login Here</Link></p>
                            </div> :

                            <button className="btn btn-raised btn-lg btn-primary btn-block" type="submit" value="submit">Finish</button>
                        }
                        <p className="copyright">&copy; Copyright 2017</p>

                    </DataForm>
                </div>
            );
        }
    }
}

export default UserFormRegister;
