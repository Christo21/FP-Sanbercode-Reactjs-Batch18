import React, { useState } from "react"
// import { UserContext } from "../context/UserContext"
import { Form, Input, Button, Typography, Alert } from 'antd';
import Title from "antd/lib/typography/Title";
import axios from "axios";

const ChangePassword = () => {
    //   const [, setUser] = useContext(UserContext)
    const [error, setError] = useState(false)
    const [form] = Form.useForm();

    const formItemLayout = {
        labelCol: {
            sm: {
                span: 10,
            }
        },
        wrapperCol: {
            sm: {
                span: 8,
            }
        },
    };

    const tailFormItemLayout = {
        wrapperCol: {
            sm: {
                span: 8,
                offset: 10,
            },
        },
    };

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        // setUser({username: input.username})

        axios.post(`https://backendexample.sanbersy.com/api/change-password`, {
            token: '',
            current_password: values.current_password,
            new_password: values.new_password,
            new_confirm_password: values.new_confirm_password
        })
            .then(res => {
                console.log("Res : " + res)
            })
            .catch(error => {
                console.log(error.response.data)
                if (error.response.data.error !== null) {
                    setError(true)
                }
                // } else if (error.request) {
                //     console.log('Error Request : ', error.request);
                // } else {
                //     console.log('Error Message : ', error.message);
                // }
                // console.log('Error Config : ', error.config);
            })

        // localStorage.setItem("user", JSON.stringify({ username: values.username, password: values.password }))
    };

    return (
        <>
            <Typography style={{ textAlign: "center", marginBottom: 40 }}>
                <Title>Change Password</Title>
            </Typography>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >

                <Form.Item
                    name="current_password"
                    label="Current Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your current password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="new_password"
                    label="New Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your new password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="new_confirm_password"
                    label="Confirm New Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your new password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('new_password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        ChangePassword
                </Button>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    {
                        error &&
                        <Alert
                            message="The email has already been taken."
                            type="error"
                            showIcon
                        />
                    }
                </Form.Item>
                
            </Form>
        </>
    )
}

export default ChangePassword