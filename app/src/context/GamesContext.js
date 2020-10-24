import axios from "axios";
import React, { useState, createContext, useEffect } from "react";

export const GamesContext = createContext();

export const GamesProvider = props => {
    const [games, setGames] = useState(null)

    useEffect(() => {
        if (games === null || !Array.isArray(games)) {
            axios.get(`https://backendexample.sanbersy.com/api/data-game`)
                .then(res => {
                    setGames(res.data.map(el => {
                        el.singlePlayer = el.singlePlayer === 1 ? "Yes" : "No"
                        el.multiplayer = el.multiplayer === 1 ? "Yes" : "No"
                        
                        return {
                            id: el.id,
                            name: el.name,
                            genre: el.genre,
                            singlePlayer: el.singlePlayer,
                            multiplayer: el.multiplayer,
                            platform: el.platform,
                            release: el.release,
                            image_url: el.image_url
                        }
                    }))
                })
        }
    }, [games, setGames])

    return (
        <GamesContext.Provider value={[games, setGames]}>
            {props.children}
        </GamesContext.Provider>
    );
};
