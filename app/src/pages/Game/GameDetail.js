import React, { useEffect, useState } from "react"
// import { UserContext } from "../context/UserContext"
import { Col, Row } from 'antd';
import axios from "axios";
import Title from "antd/lib/typography/Title";

const GameDetail = (props) => {
    //   const [, setUser] = useContext(UserContext)
    const [data, setData] = useState(null)

    useEffect(() => {
        let id = props.match.params.id

        if (data === null && typeof id !== 'undefined') {
            axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`)
                .then(res => {
                    if (res.data.singlePlayer === 1 && res.data.multiplayer === 1) {
                        res.data.player = "Single Player, Multi Player"
                    } else if (res.data.singlePlayer === 1) {
                        res.data.player = "Single Player"
                    } else {
                        res.data.player = "Multi Player"
                    }
                    setData(res.data)
                })
        }
    }, [data, setData, props.match.params.id])

    return (
        <>
            {
                data!= null && 
                <>
                    <Title>{data.name}</Title>
                    <div style={{ display: "inline-flex", fontSize: 18, width: "100%" }}>
                        <img alt="We Are Great!" src={data.image_url} className="detail-img" />
                        <div style={{ width: "50%" }}>
                            <Row>
                                <Col span={6}><b>Release</b></Col>
                                <Col span={1}>:</Col>
                                <Col span={14}>{data.release}</Col>
                            </Row>
                            <Row>
                                <Col span={6}><b>Genre</b></Col>
                                <Col span={1}>:</Col>
                                <Col span={14}>{data.genre}</Col>
                            </Row>
                            <Row>
                                <Col span={6}><b>Play Mode</b></Col>
                                <Col span={1}>:</Col>
                                <Col span={14}>{data.player}</Col>
                            </Row>
                            <Row>
                                <Col span={6}><b>Platform</b></Col>
                                <Col span={1}>:</Col>
                                <Col span={14}>{data.platform}</Col>
                            </Row>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default GameDetail
