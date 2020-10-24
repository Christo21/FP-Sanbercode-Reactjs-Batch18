import React, { useContext } from "react"
import MovieList from "./Movie/MovieList";
import GameList from "./Game/GameList";
import { Carousel, Divider } from "antd";
import { MovieContext } from "../context/MovieContext";
import { GamesContext } from "../context/GamesContext";
import { Link } from "react-router-dom";

const Home = () => {
    const [movies,] = useContext(MovieContext)
    const [games,] = useContext(GamesContext)

    return (
        <>
            {
                movies != null &&
                games != null &&
                <Carousel autoplay>
                    {
                        movies.map(el => {
                            return (
                                <Link to={`/Movie/Detail/${el.id}`}>
                                    <div style={{ textAlign: "center" }}>
                                        <img alt="" src={el.image_url} className="carousel-img" />
                                    </div>
                                </Link>
                            )
                        })
                    }
                    {
                        games.map(el => {
                            return (
                                <Link to={`/Game/Detail/${el.id}`} >
                                    <img alt="" src={el.image_url} className="carousel-img" />
                                </Link>
                            )
                        })
                    }
                </Carousel>
            }


            <Divider><h1>Movies</h1></Divider>
            <MovieList />

            <Divider><h1>Games</h1></Divider>
            <GameList />
        </>
    )
}

export default Home