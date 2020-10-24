import axios from "axios";
import React, { useState, createContext, useEffect } from "react";

export const MovieContext = createContext();

export const MovieProvider = props => {
    const [movies, setMovies] = useState(null)
    
    useEffect(() => {
        if (movies === null || !Array.isArray(movies)) {
            axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
                .then(res => {
                    setMovies(res.data.map(el => {
                        return {
                            id: el.id,
                            title: el.title,
                            description: el.description,
                            year: el.year,
                            duration: el.duration,
                            genre: el.genre,
                            rating: el.rating,
                            image_url: el.image_url,
                            review: el.review
                        }
                    }))
                })
        }
    }, [movies, setMovies])

    return (
        <MovieContext.Provider value={[movies, setMovies]}>
            {props.children}
        </MovieContext.Provider>
    );
};
