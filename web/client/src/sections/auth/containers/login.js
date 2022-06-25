'use strict';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Input, Form, Row, Col, message } from 'antd';
import { login } from '../actions/auth';
import './style.less';

const FormItem = Form.Item;

const Login = props => {
    const { dispatch, user, error, isRequesting } = props
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [inputChanged, setInputChanged] = useState(false)

    useEffect(() => {

    }, [])

    useEffect(() => {
        if (error) {
            message.error(error);
            setPassword('')
        }
    }, [error])

    useEffect(() => {
        if (user && user.authorized) {
            dispatch(push('/gtp'));
        }
    }, [user])

    const enterHandler = e => {
        if (e.key === 'Enter') {
            setInputChanged(false)
            dispatch(login(username, password));
        }
    };

    const handleLogin = () => {
        setInputChanged(false)
        dispatch(login(username, password))
    }


    return (
        <div className='login'>
            <div className='loginBox'>
                <h1>Peter's Demon</h1>
                <Form onKeyDown={enterHandler}>

                    <FormItem>
                        <div className='loginFormTit'>用户名</div>
                        <Input
                            className='loginInp'
                            type="text"
                            value={username}
                            // placeholder="用户名"
                            onChange={e => {
                                setUserName(e.target.value)
                                setInputChanged(true)
                            }}
                        />
                    </FormItem>
                    <div className='loginFormTit'>密码</div>
                    <FormItem>
                        <Input
                            className='loginInp'
                            type="password"
                            value={password}
                            // placeholder="密码"
                            onChange={e => {
                                setPassword(e.target.value)
                                setInputChanged(true)
                            }}
                        />
                    </FormItem>
                </Form>
                <Button type="primary" className='loginBtn' loading={isRequesting} onClick={handleLogin}>登录</Button>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    const { auth } = state;
    return {
        user: auth.user,
        error: auth.error,
        isRequesting: auth.isRequesting
    }
}

export default connect(mapStateToProps)(Login);