import React, { useContext } from "react"
import { Space, Table } from 'antd';
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { MovieContext } from "../../context/MovieContext";

const MovieTable = () => {
    const [user,] = useContext(UserContext)
    const [movies, setMovies] = useContext(MovieContext)

    const handleDelete = (id) => {
        axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${id}`, {
            headers: { "Authorization": `Bearer ${user.token}` }
        })
            .then(() => {
                let newMovies = movies.filter(el => el.id !== id)
                setMovies([...newMovies])
            })
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'id',
            render: (text, row) => <Link to={`/Movie/Detail/${row.id}`} >{text}</Link>,
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'id',
            sorter: (a, b) => a.description.localeCompare(b.description),
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'id',
            sorter: (a, b) => a.year - b.year,
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'id',
            sorter: (a, b) => a.duration - b.duration,
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'id',
            sorter: (a, b) => a.genre.localeCompare(b.genre),
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'id',
            sorter: (a, b) => a.rating - b.rating,
        },
        {
            title: 'Action',
            key: 'id',
            render: (row) => (
                <Space size="middle">
                    <Link to={`/Movie/Form/${row.id}`} >Edit</Link>
                    <Link onClick={() => { handleDelete(row.id) }}>Delete</Link>
                </Space>
            ),
        },

    ];

    return (
        movies != null && Array.isArray(movies) && <Table columns={columns} dataSource={movies} />
    )
}

export default MovieTable
