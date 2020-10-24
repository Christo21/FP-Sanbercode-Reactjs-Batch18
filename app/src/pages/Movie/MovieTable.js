import React, { useContext, useEffect, useState } from "react"
import { Button, Divider, Select, Space, Table } from 'antd';
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { MovieContext } from "../../context/MovieContext";
import Search from "antd/lib/input/Search";

const MovieTable = () => {
    const [user,] = useContext(UserContext)
    const [movies, setMovies] = useContext(MovieContext)
    
    const [data, setData] = useState(null)
    const { Option } = Select
    const [category, setCategory] = useState("title")

    const [genreList, setGenreList] = useState([])
    const [durationList, setDurationList] = useState([])
    const [yearList, setYearList] = useState([])
    const [ratingList, setRatingList] = useState([])

    const [filteredInfo, setFilteredInfo] = useState({})
    const [sortedInfo, setSortedInfo] = useState({})

    useEffect(() => {
        if (data == null) {
            axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
                .then(res => {
                    let tempGenre = []
                    let tempDuration = []
                    let tempYear = []
                    let tempRating = []
                    let temp = []

                    setData(res.data.map(el => {
                        el.singlePlayer = el.singlePlayer === 1 ? "Yes" : "No"
                        el.multiplayer = el.multiplayer === 1 ? "Yes" : "No"

                        temp = el.genre !== null ? el.genre.split(', ') : ""
                        tempGenre = [...tempGenre, ...temp]
                        tempDuration = [...tempDuration, el.duration]
                        tempYear = [...tempYear, el.year]
                        tempRating = [...tempRating, el.rating]

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

                    tempGenre = Array.from(new Set(tempGenre)).sort()
                    tempDuration = Array.from(new Set(tempDuration)).sort()
                    tempYear = Array.from(new Set(tempYear)).sort()
                    tempRating = Array.from(new Set(tempRating)).sort()

                    setGenreList(tempGenre.map(el => { return { text: el, value: el } }))
                    setDurationList(tempDuration.map(el => { return { text: el, value: el } }))
                    setYearList(tempYear.map(el => { return { text: el, value: el } }))
                    setRatingList(tempRating.map(el => { return { text: el, value: el } }))
                })
        }
    }, [data, setData, setGenreList, setDurationList, setYearList, setRatingList])

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text, row) => <Link to={`/Movie/Detail/${row.id}`} >{text}</Link>,
            sorter: (a, b) => a.title.localeCompare(b.title),
            sortOrder: sortedInfo.columnKey === 'title' && sortedInfo.order,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            sorter: (a, b) => a.description.localeCompare(b.description),
            sortOrder: sortedInfo.columnKey === 'description' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            filters: [...yearList],
            filteredValue: filteredInfo.year || null,
            onFilter: (value, record) => record.year.toString().includes(value),
            sorter: (a, b) => a.year - b.year,
            sortOrder: sortedInfo.columnKey === 'year' && sortedInfo.order,
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            filters: [...durationList],
            filteredValue: filteredInfo.duration || null,
            onFilter: (value, record) => record.duration.toString().includes(value),
            sorter: (a, b) => a.duration - b.duration,
            sortOrder: sortedInfo.columnKey === 'duration' && sortedInfo.order,
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
            filters: [...genreList],
            filteredValue: filteredInfo.genre || null,
            onFilter: (value, record) => record.genre.includes(value),
            sorter: (a, b) => a.genre.localeCompare(b.genre),
            sortOrder: sortedInfo.columnKey === 'genre' && sortedInfo.order,
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            filters: [...ratingList],
            filteredValue: filteredInfo.rating || null,
            onFilter: (value, record) => record.rating.toString().includes(value),
            sorter: (a, b) => a.rating - b.rating,
            sortOrder: sortedInfo.columnKey === 'rating' && sortedInfo.order,
        },
        {
            title: 'Review',
            dataIndex: 'review',
            key: 'review',
            sorter: (a, b) => a.review - b.review,
            sortOrder: sortedInfo.columnKey === 'review' && sortedInfo.order,
        },
        {
            title: 'Action',
            key: 'id',
            render: (row) => (
                <Space size="middle">
                    <Link to={`/Movie/Edit/${row.id}`} >Edit</Link>
                    <Link onClick={() => { handleDelete(row.id) }}>Delete</Link>
                </Space>
            ),
        },

    ];

    const clearFilters = () => {
        setFilteredInfo({})
    }

    const clearSorter = () =>{
        setSortedInfo({})
    }

    const clearAll = () => {
        setFilteredInfo({})
        setSortedInfo({})
    }

    const select = (
        <Select defaultValue="title" className="select" onSelect={(val) => setCategory(val)}>
            <Option value="title" >Title</Option>
            <Option value="description">Description</Option>
            <Option value="year">Year</Option>
            <Option value="duration">Duration</Option>
            <Option value="genre">Genre</Option>
        </Select>
    )

    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters)
        setSortedInfo(sorter)
    }

    const handleDelete = (id) => {
        axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${id}`, {
            headers: { "Authorization": `Bearer ${user.token}` }
        })
            .then(() => {
                let newMovies = movies.filter(el => el.id !== id)
                setMovies([...newMovies])
                setData([...newMovies])
            })
    }

    const onChangeSearch = (event) => {
        let newMovies = [...movies]
        let value = event.target.value.toString().toLowerCase()

        if (category === 'title') {
            newMovies = movies.filter(el => el.title.toString().toLowerCase().indexOf(value) !== -1)
        }
        if (category === 'description') {
            newMovies = movies.filter(el => el.description.toString().toLowerCase().indexOf(value) !== -1)
        }
        if (category === 'year') {
            newMovies = movies.filter(el => el.year.toString().toLowerCase().indexOf(value) !== -1)
        }
        if (category === 'duration') {
            newMovies = movies.filter(el => el.duration.toString().toLowerCase().indexOf(value) !== -1)
        }
        if (category === 'genre') {
            newMovies = movies.filter(el => el.genre.toString().toLowerCase().indexOf(value) !== -1)
        }

        setData([...newMovies])
    }

    return (
        <>
            {
                data !== null &&
                <>
                    <Space style={{ marginBottom: 16 }}>
                        <Button onClick={clearFilters}>Clear Filters</Button>
                        <Button onClick={clearSorter}>Clear Sorter</Button>
                        <Button onClick={clearAll}>Clear All</Button>
                        <Search placeholder="Search Movies" onChange={onChangeSearch} enterButton addonBefore={select} style={{width:500}}/>
                        <Link to={`/Movie/Create`} ><Button type="primary">Add New Movie</Button></Link>
                    </Space>
                    <Divider></Divider>
                    <Table columns={columns} dataSource={data} onChange={handleChange} />
                </>
            }

        </>
    )
}

export default MovieTable
