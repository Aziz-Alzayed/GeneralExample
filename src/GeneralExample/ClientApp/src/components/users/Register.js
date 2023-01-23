import React, { useState } from "react";
import {
    Button,
    Form,
    Input,
    Alert,
} from 'antd';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
function Register() {
    const [succeed, setSucceed] = useState(false);
    const [errorRespond, setErrorRespond] = useState(false);
    const prepareFormData = (data) => {
        return {
            UserName: data.userName.trim(),
            FullName: data.fullName.trim(),
            Email: data.email.trim(),
            Password: data.password.trim(),
            ConfirmPassword: data.confirmPassword.trim()
        };
    }
    const handleClose = () => {
        setSucceed(false);
        setErrorRespond(false);
    };
    const registerUser = (data) => {

        var data = JSON.stringify(prepareFormData(data));

        fetch('users/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: data
        })
            .then(checkStatus);
    }

    const checkStatus = (res) => {
        if (res.status >= 200 && res.status < 300) {
            setSucceed(true);
        } else {
            let error = new Error(res.statusTest);
            console.log(error);
            setErrorRespond(true);
        }
    }
    return (
        <>
            {succeed && <Alert message="Successed, now you can login!" type="success" afterClose={handleClose} showIcon closable/>}
            {errorRespond && <Alert message="Error something went wrong!" type="error" afterClose={handleClose} showIcon closable/>}
            <Form
                {...formItemLayout}
                name="register"
                onFinish={registerUser}
                style={{ maxWidth: 600 }}
                scrollToFirstError
            >
                <Form.Item
                    name="userName"
                    label="UserName"
                    tooltip="What do you want others to call you?"
                    rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="fullName"
                    label="FullName"
                    tooltip="What do you want others to call you?"
                    rules={[{ required: true, message: 'Please input your fullName!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default Register;