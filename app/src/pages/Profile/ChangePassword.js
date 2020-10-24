import React, { useContext, useState } from "react"
import { Form, Input, Button, Typography, Alert } from 'antd';
import Title from "antd/lib/typography/Title";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const ChangePassword = () => {
    const [user,] = useContext(UserContext)
    const [error, setError] = useState(null)
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
        let current_password = values.current_password
        let new_password = values.new_password
        let new_confirm_password = values.new_confirm_password

        axios.post(`https://backendexample.sanbersy.com/api/change-password`,
            { current_password, new_password, new_confirm_password },
            { headers: { "Authorization": `Bearer ${user.token}` } })
            .then(() => {
                setError(false)
                form.setFieldsValue({
                    current_password: "",
                    new_password: "",
                    new_confirm_password: ""
                })
            })
            .catch(error => {
                if (error.response.data.error !== null) {
                    setError(true)
                }
                form.setFieldsValue({
                    current_password: "",
                    new_password: "",
                    new_confirm_password: ""
                })
            })
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
                        {
                            min: 6,
                            message: 'The password must be at least 6 characters.'
                        }
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
                        error && error !== null &&
                        <Alert
                            message="The Current Password is Wrong !"
                            type="error"
                            showIcon
                        />
                    }
                    {
                        !error && error !== null &&
                        <Alert
                            message="Password Change Successfully."
                            type="success"
                            showIcon
                        />
                    }
                </Form.Item>

            </Form>
        </>
    )
}

export default ChangePassword