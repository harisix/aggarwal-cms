import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../forms/LoginForm";

class LoginPage extends React.Component {
  submit = data =>
    this.props.history.push("/dashboard");

  render() {
    return (
      <div className="ui container">
        <div className="ui centered grid">
          <div className="six wide column">
            <div className='loginContainer'>
				<span className="logo_login"><img src='http://www.sathyauidev.com/agarwal/static/media/logo.deef22df.png' alt="" width='40' /></span>
              <h1>Login page</h1>
              <LoginForm submit={this.submit} />
              <Link className="pull-right" style={{marginTop:'-27px'}} to="/forgot_password">Forgot Password?</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
