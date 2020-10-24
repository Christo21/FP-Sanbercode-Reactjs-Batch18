import React, { useEffect, useState } from "react"
// import { UserContext } from "../context/UserContext"
import { Col, Row } from 'antd';
import axios from "axios";
import Title from "antd/lib/typography/Title";

const MovieDetail = (props) => {
    //   const [, setUser] = useContext(UserContext)
    const [data, setData] = useState(null)

    useEffect(() => {
        let id = props.match.params.id

        if (data === null && typeof id !== 'undefined') {
            axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`)
                .then(res => {
                    setData(res.data)
                })
        }
    }, [data, setData, props.match.params.id])

    return (
        <>
            {
                data!= null &&
                <>
                    <Title>{data.title}</Title>
                    <div style={{ display: "inline-flex", fontSize: 18, width: "100%" }}>
                        <img alt="We Are Great!" src={data.image_url} className="detail-img" />
                        <div style={{ width: "50%" }}>
                            <Row>
                                <Col span={6}><b>Year</b></Col>
                                <Col span={1}>:</Col>
                                <Col span={14}>{data.year}</Col>
                            </Row>
                            <Row>
                                <Col span={6}><b>Genre</b></Col>
                                <Col span={1}>:</Col>
                                <Col span={14}>{data.genre}</Col>
                            </Row>
                            <Row>
                                <Col span={6}><b>Duration</b></Col>
                                <Col span={1}>:</Col>
                                <Col span={14}>{data.duration} minutes</Col>
                            </Row>
                            <Row>
                                <Col span={6}><b>Rating</b></Col>
                                <Col span={1}>:</Col>
                                <Col span={14}>{data.rating}/10</Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col><b>Descriptions</b></Col>
                            </Row>
                            <Row>
                                <Col>{data.description}</Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col><b>Reviews</b></Col>
                            </Row>
                            <Row>
                                <Col>{data.review}</Col>
                            </Row>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default MovieDetail
