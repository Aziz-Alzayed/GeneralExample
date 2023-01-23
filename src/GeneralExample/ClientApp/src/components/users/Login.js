import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from 'antd';
import { setAccessToken, setUser, isLoggedIn } from '../../utils/Helpers';


function Login() {
    const [form] = Form.useForm();
    const [userData, setUserDate] = useState({
        userName: '',
        password: '',
        loggedIn: isLoggedIn()
    });
    const onFinish = (value) => {
        var data = JSON.stringify(prepareFormData(value));

        // Send POST request with data submited from form
        fetch('users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: data
        })
            .then(checkStatus);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleOnChange = (event) => {
        setUserDate({ ...userData, [event.target.id]: event.target.value });
    }
    const prepareFormData = (data) => {
        return {
            UserName: data.userName.trim(),
            Password: data.password.trim()
        };
    }

    const checkStatus = (res) => {
        if (res.status >= 200 && res.status < 300) {
            form.resetFields();
            setAccessToken(res.access_token);
            setUser(userData.userName);
            setUserDate({ loggedIn: true });
            window.location.reload(false);
        } else {
            let error = new Error(res.statusTest);
            console.log(error);
        }
    }

    return (
            <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                scrollToFirstError

            >
                <Form.Item
                    label="Username"
                    name="userName"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input onChange={handleOnChange} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password onChange={handleOnChange} />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
    );
}

export default Login;