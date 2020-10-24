import React, { useContext, useEffect, useState } from "react"
import { Form, Input, Button, Typography, Checkbox, Row, Col, DatePicker } from 'antd';
import Title from "antd/lib/typography/Title";
import axios from "axios";
import moment from "moment";
import { UserContext } from "../../context/UserContext";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { GamesContext } from "../../context/GamesContext";

const GameForms = (props) => {
    const [user,] = useContext(UserContext)
    const [games, setGames] = useContext(GamesContext)
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
        if (data && typeof id === 'undefined') {
            form.setFieldsValue({
                name: "",
                genre: "",
                platform: "",
                release: "",
                player: "",
                image_url: ""
            })
            setData(false)
        }
        if (!data && typeof id !== 'undefined') {
            axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`)
                .then(res => {
                    let player = []

                    if (res.data.singlePlayer === 1) {
                        player.push('singlePlayer')
                    }
                    if (res.data.multiplayer === 1) {
                        player.push('multiPlayer')
                    }

                    form.setFieldsValue({
                        name: res.data.name,
                        genre: res.data.genre,
                        platform: res.data.platform,
                        release: moment(res.data.release, 'YYYY'),
                        player: player,
                        image_url: res.data.image_url
                    })

                    setData(true)
                })
        }
    }, [form, data, setData, props.match.params.id])

    const onFinish = (values) => {
        let id = props.match.params.id
        let singlePlayer = 0;
        let multiplayer = 0;

        if (values.player[0] === "singlePlayer" || values.player[1] === "singlePlayer") {
            singlePlayer = 1
        }
        if (values.player[0] === "multiPlayer" || values.player[1] === "multiPlayer") {
            multiplayer = 1
        }

        let name = values.name
        let genre = values.genre
        let platform = values.platform
        let release = moment(values.release).year()
        let image_url = values.image_url

        if (typeof id !== 'undefined') {
            axios.put(`https://backendexample.sanbersy.com/api/data-game/${id}`,
                { name, genre, platform, release, image_url, singlePlayer, multiplayer },
                { headers: { "Authorization": `Bearer ${user.token}` } })
                .then(() => {
                    let index = games.findIndex(el => el.id === parseInt(id))
                    let newGames = [...games]
                    newGames[index] = {
                        id, name, genre, platform, release, image_url,
                        singlePlayer: singlePlayer === 1 ? "Yes" : "No",
                        multiplayer: multiplayer === 1 ? "Yes" : "No"
                    }
                    setGames(newGames)
                    setSubmit(true)
                })
        } else {
            axios.post(`https://backendexample.sanbersy.com/api/data-game`,
                { name, genre, platform, release, image_url, singlePlayer, multiplayer },
                { headers: { "Authorization": `Bearer ${user.token}` } })
                .then((res) => {
                    setGames([...games, {
                        id: res.data.id,
                        name, genre, platform, release, image_url,
                        singlePlayer: singlePlayer === 1 ? "Yes" : "No",
                        multiplayer: multiplayer === 1 ? "Yes" : "No"
                    }])
                    setSubmit(true)
                })
        }
    };

    const redirect = () => {
        if (submit === true) {
            return <Redirect to="/Game/Data" />;
        }
    }

    return (
        <>
            {redirect()}
            <Typography style={{ textAlign: "center", marginBottom: 40 }}>
                <Title>
                    {typeof props.match.params.id !== 'undefined' && "Edit Game"}
                    {typeof props.match.params.id === 'undefined' && "Insert New Game"}
                </Title>
            </Typography>
            <Form
                {...formItemLayout}
                form={form}
                name="gameForm"
                onFinish={onFinish}
                scrollToFirstError
            >

                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the Name !',
                            whitespace: true,
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
                    name="player"
                    label="Play Mode"
                    rules={[
                        {
                            required: true,
                            message: 'Please choose the Play Mode !',
                        },
                    ]}
                >
                    <Checkbox.Group>
                        <Row>
                            <Col span={24}>
                                <Checkbox
                                    value="singlePlayer"
                                    style={{
                                        lineHeight: '32px',
                                    }}
                                >
                                    Single Player
                                    </Checkbox>
                            </Col>
                            <Col span={24}>
                                <Checkbox
                                    value="multiPlayer"
                                    style={{
                                        lineHeight: '32px',
                                    }}
                                >
                                    Multi Player
                                    </Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                </Form.Item>

                <Form.Item
                    name="platform"
                    label="Platform"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the Platform !',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="release"
                    label="Release Year"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the Release Year !',
                        },
                    ]}
                >
                    <DatePicker picker="year" inputReadOnly />
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

export default GameForms