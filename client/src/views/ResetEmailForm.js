import React, { Component } from "react";
import {Style} from './Style';

class ResetEmailForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(event) {
        event.preventDefault();   

        //validate the current password
        
    }
  
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Style>
            <div className="container">                
                <div className="box">   
                    <h1>Update you email</h1>             
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('currentPassword', {
                        rules: [{ required: true, message: 'Please input your current password' }],
                    })(
                    <Input 
                        size="large"
                        name="currentPassword" 
                        type="password"
                        placeholder="Current password" />    
                    )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('newEmail', {
                    rules: [{ required: true, message: 'Please input your new email' }],
                })(
                    <Input 
                        size="large"
                        name="newEmail" 
                        type="email" 
                        placeholder="New email"  />                        
                )}
                </FormItem>
                <FormItem>
                    <Button type="secondary" htmlType="submit" size="large" className="login-form-button">Save</Button>
                </FormItem>
            </Form>
                </div>              
            </div>
            </Style> 
        );
    }
  }
  
  export default withRouter(ResetEmailForm)