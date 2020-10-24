import React, { useContext } from "react"
import { Card, List, Avatar } from 'antd';
import { useHistory } from "react-router-dom";
import { MovieContext } from "../../context/MovieContext";

const MovieList = () => {
    const [movies,] = useContext(MovieContext)
    const history = useHistory();

    const redirect = (id) => {
        let path = "/Movie/Detail/" + id
        history.push(path);
    }

    return (
        <>
            {
                Array.isArray(movies) &&
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 3,
                        lg: 4,
                        xl: 5,
                        xxl: 6
                    }}

                    pagination={{
                        pageSize: 10,
                        position: "bottom"
                    }}

                    dataSource={movies}
                    renderItem={item => (
                        <List.Item onClick={() => { redirect(item.id) }}>
                            <Card
                                hoverable
                                bordered={false}
                                key={item.id}
                                style={{ height: 400 }}
                                cover={
                                    <img
                                        alt="We are Great!"
                                        src={item.image_url}
                                        className="card-img"
                                    />
                                }
                            >
                                <List.Item.Meta
                                    title={
                                        item.title.length > 20 ? item.title.substring(0, 20) + "..." : item.title
                                    }
                                    description={item.year}
                                    avatar=
                                    {<Avatar shape="circle" size="large" style={{ backgroundColor: "#f39c12" }}>
                                        {item.rating}
                                    </Avatar>} />
                            </Card>
                        </List.Item>
                    )}
                />
            }
        </>
    )
}

export default MovieList