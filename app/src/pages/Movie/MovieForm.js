import React, { useContext, useEffect, useState } from "react"
import { Form, Input, Button, Typography, DatePicker } from 'antd';
import Title from "antd/lib/typography/Title";
import axios from "axios";
import moment from "moment";
import { UserContext } from "../../context/UserContext";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { MovieContext } from "../../context/MovieContext";

const MovieForms = (props) => {
    const [user,] = useContext(UserContext)
    const [movies, setMovies] = useContext(MovieContext)
    const [data, setData] = useState(false)
    const [form] = Form.useForm()
    const [submit, setSubmit] = useState(false)

    const formItemLayout = {
        labelCol: {
            sm: {
                span: 8,
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
                offset: 8,
            },
        },
    };

    useEffect(() => {
        let id = props.match.params.id
        if (!data && typeof id !== 'undefined') {
            axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`)
                .then(res => {
                    form.setFieldsValue({
                        title: res.data.title,
                        description: res.data.description,
                        year: moment(res.data.year, 'YYYY'),
                        duration: res.data.duration,
                        genre: res.data.genre,
                        rating: res.data.rating,
                        image_url: res.data.image_url
                    })
                    setData(true)
                })
        }
    }, [form, data, setData, props.match.params.id])

    const onFinish = (values) => {
        let id = props.match.params.id

        let title = values.title
        let description = values.description
        let year = moment(values.year).year()
        let duration = values.duration
        let genre = values.genre
        let rating = values.rating
        let image_url = values.image_url

        if (typeof id !== 'undefined') {
            axios.put(`https://backendexample.sanbersy.com/api/data-movie/${id}`,
                { title, description, year, duration, genre, rating, image_url },
                { headers: { "Authorization": `Bearer ${user.token}` } })
                .then(() => {
                    let index = movies.findIndex(el => el.id === parseInt(id))
                    let newMovies = [...movies]
                    newMovies[index] = {
                        id, title, description, year, duration, genre, rating, image_url
                    }
                    setMovies(newMovies)
                    setSubmit(true)
                })
        } else {
            axios.post(`https://backendexample.sanbersy.com/api/data-movie`,
                { title, description, year, duration, genre, rating, image_url },
                { headers: { "Authorization": `Bearer ${user.token}` } })
                .then((res) => {
                    setMovies([...movies, {
                        id: res.data.id,
                        title, description, year, duration, genre, rating, image_url
                    }])
                    setSubmit(true)
                })
        }
    };

    const redirect = () => {
        if (submit === true) {
            return <Redirect to="/Movie/Data" />;
        }
    }

    return (
        <>
            {redirect()}
            <Typography style={{ textAlign: "center", marginBottom: 40 }}>
                <Title>
                    {typeof props.match.params.id !== 'undefined' && "Edit Movie"}
                    {typeof props.match.params.id === 'undefined' && "Insert New Movie"}
                </Title>
            </Typography>
            <Form
                {...formItemLayout}
                form={form}
                name="movieForm"
                onFinish={onFinish}
                scrollToFirstError
            >

                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title !',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the Description !',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    name="year"
                    label="Year"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the Year !',
                        },
                    ]}
                >
                    <DatePicker picker="year" inputReadOnly/>
                </Form.Item>

                <Form.Item
                    name="duration"
                    label="Duration"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the Duration !',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="genre"
                    label="Genre"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the Genre !',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="rating"
                    label="Rating"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the Rating !',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="image_url"
                    label="Image URL"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the Image URL !',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default MovieForms