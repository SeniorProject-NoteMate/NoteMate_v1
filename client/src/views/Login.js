import React, { Component } from "react";
import {Style} from './Style';
import LoginForm from './LoginForm'

import { Form } from 'antd';

class Login extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm)
        return ( 
            <Style>
            <div className="container">                
                <div className="box">   
                    <h1 class="center">LOGIN</h1>      
                    <AntWrappedLoginForm/>
                </div>              
            </div>
            </Style> 
        )
    }
}

export default Login