import React from "react";
import { Message } from "semantic-ui-react";
import ForgotPasswordForm from "../forms/ForgotPasswordForm";

class ForgotPasswordPage extends React.Component {
  state = {
    success: false
  };

  submit = data =>
    this.setState({ success: true })

  render() {
    return (
      <div className="ui container">
        <div className="ui centered grid">
          <div className="six wide column">
            <div className='loginContainer'>
              <h1>Forgot password</h1>
              {this.state.success ? (
                <Message>Email has been sent.</Message>
              ) : (
                <ForgotPasswordForm submit={this.submit} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPasswordPage;
