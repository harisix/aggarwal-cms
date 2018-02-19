import React from "react";
import { Message } from "semantic-ui-react";
import ResetPasswordForm from "../forms/ResetPasswordForm";

class ResetPasswordPage extends React.Component {
  state = {
    loading: true,
    success: false
  };

  componentDidMount() {
    this.setState({ loading: false, success: true })
  }

  submit = data =>
    this.props.history.push("/login");

  render() {
    const { loading, success } = this.state;

    return (
      <div className="ui container">
    <div className="ui centered grid">
      <div className="six wide column">
      <div className='loginContainer'>
      <h1>Reset password</h1>
        {loading && <Message>Loading</Message>}
        {!loading &&
        success && <ResetPasswordForm submit={this.submit} />}
        {!loading && !success && <Message>Invalid Token</Message>}
      </div>
      </div>
      </div>
      </div>
    );
  }
}

export default ResetPasswordPage;
