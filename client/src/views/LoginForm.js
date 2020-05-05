import React, { Component } from "react";
import { login } from '../utils/api';
import { Link} from 'react-router-dom';
import { withRouter } from 'react-router';

import { ACCESS_TOKEN } from '../constants';

import { Form, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;

class LoginForm extends Component {
  constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
      const { history } = this.props;
      event.preventDefault();   
      this.props.form.validateFields((err, values) => {
          if (!err) {
              const loginRequest = Object.assign({}, values);

              login(loginRequest)
              .then(response => {
                  localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                  history.push("/");
                  window.location.reload();
              }).catch(error => {
                  if(error){
                        window.alert("Your Username or Password is incorrect. Please try again!");
                        localStorage.clear()
                        window.location.reload()                                         
                  }
              });
          }
      });
  }

  render() {
      const { getFieldDecorator } = this.props.form;
      return (
          <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                  {getFieldDecorator('usernameOrEmail', {
                      rules: [{ required: true, message: 'Please input your username or email!' }],
                  })(
                  <Input 
                      //prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      size="large"
                      name="usernameOrEmail" 
                      prefix={<Icon type="user" />}
                      placeholder="Username or Email" />    
                  )}
              </FormItem>
              <FormItem>
              {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                  <Input 
                      prefix={<Icon type="lock" />}
                      size="large"
                      name="password" 
                      type="password" 
                      placeholder="Password"  />                        
              )}
              </FormItem>
              <FormItem>
                  <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
                  Don't have an account yet? <Link to="/register">Sign up!</Link>
              </FormItem>
          </Form>
      );
  }
}

export default withRouter(LoginForm)
