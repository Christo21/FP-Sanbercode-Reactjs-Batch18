import React, { useContext } from "react"
import { Card, List } from 'antd';
import { useHistory } from "react-router-dom";
import { GamesContext } from "../../context/GamesContext";

const GameList = () => {
    const [games,] = useContext(GamesContext)
    const history = useHistory();

    const redirect = (id) => {
        let path = "/Game/Detail/" + id
        history.push(path);
    }

    return (
        <>
            {
                Array.isArray(games) &&
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

                    dataSource={games}
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
                                    title={item.name.length > 30 ? item.name.substring(0, 30) + '...' : item.name}
                                    description={item.release} />
                            </Card>
                        </List.Item>
                    )}
                />
            }
        </>
    )
}

export default GameList
