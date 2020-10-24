import React, { useContext, useState } from "react"
import { Form, Input, Button, Typography, Alert } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import Title from "antd/lib/typography/Title";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { Link, Redirect } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useContext(UserContext)
    const [error, setError] = useState(false)

    const onFinish = (values) => {
        axios.post(`https://backendexample.sanbersy.com/api/user-login`, {
            email: values.email,
            password: values.password
        })
            .then(res => {
                setUser({
                    email: values.email,
                    password: values.password,
                    token: res.data.token
                })

                localStorage.setItem("user", JSON.stringify({
                    email: values.email,
                    password: values.password,
                    token: res.data.token
                }))
            })
            .catch(error => {
                if (error.response.data.error === 'invalid_credentials') {
                    setError(true)
                }
            })
    };

    const redirect = () => {
        if (user !== null) {
            return <Redirect to="/" />;
        }
    }

    return (
        <>
            {redirect()}
            <Typography style={{ textAlign: "center", marginBottom: 40 }}>
                <Title>Login</Title>
            </Typography>
            <Form
                name="normal_login"
                className="form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
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
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="form-button">
                        Log in
                    </Button>
                    Or <Link to="/register">Register now!</Link>
                </Form.Item>

                {
                    error &&
                    <Alert
                        message="User doesn't exist / Wrong password !"
                        type="error"
                        showIcon
                    />
                }

            </Form>


        </>
    )
}

export default Login
