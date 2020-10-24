import React, { useState } from "react"
import { Form, Input, Button, Typography, Alert } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import Title from "antd/lib/typography/Title";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
    const [error, setError] = useState(null)
    const [form] = Form.useForm();

    const onFinish = (values) => {
        axios.post(`https://backendexample.sanbersy.com/api/register`, {
            name: values.name,
            email: values.email,
            password: values.password
        })
            .then(res => {
                setError(false)
                form.setFieldsValue({
                    name: "",
                    email: "",
                    password: "",
                    confirm: ""
                })
            })
            .catch(error => {
                if (error.response.data.error !== null) {
                    setError(true)
                    form.setFieldsValue({
                        name: "",
                        email: "",
                        password: "",
                        confirm: ""
                    })
                }
            })
    };

    return (
        <>
            <Typography style={{ textAlign: "center", marginBottom: 40 }}>
                <Title>Register</Title>
            </Typography>
            <Form
                form={form}
                className="form"
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >

                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Name" />
                </Form.Item>

                <Form.Item
                    name="email"
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
                    <Input prefix={<MailOutlined />} type="email" placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        {
                            min: 6,
                            message: 'The password must be at least 6 characters.'
                        }
                    ]}
                    hasFeedback
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit" className="form-button">
                        Register
                    </Button>
                    Or <Link to="/login">Login Now</Link>
                </Form.Item>

                {
                    error && error !== null &&
                    <Alert
                        message="The email has already been taken."
                        type="error"
                        showIcon
                    />
                }
                {
                    !error && error !== null &&
                    <Alert
                        message="Registration Success, please Login."
                        type="success"
                        showIcon
                    />
                }
            </Form>
        </>
    )
}

export default Register