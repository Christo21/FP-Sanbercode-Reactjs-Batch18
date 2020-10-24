import React, { useContext, useEffect, useState } from "react"
import { Button, Divider, Select, Space, Table } from 'antd';
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { GamesContext } from "../../context/GamesContext";
import Search from "antd/lib/input/Search";

const GameTable = () => {
    const [user,] = useContext(UserContext)
    const [games, setGames] = useContext(GamesContext)

    const [data, setData] = useState(null)
    const { Option } = Select
    const [category, setCategory] = useState("name")

    const [genreList, setGenreList] = useState([])
    const [platformList, setPlatformList] = useState([])
    const [releaseList, setReleaseList] = useState([])

    const [filteredInfo, setFilteredInfo] = useState({})
    const [sortedInfo, setSortedInfo] = useState({})

    useEffect(() => {
        if (data == null) {
            axios.get(`https://backendexample.sanbersy.com/api/data-game`)
                .then(res => {
                    let tempGenre = []
                    let tempPlatform = []
                    let tempRelease = []
                    let temp = []

                    setData(res.data.map(el => {
                        el.singlePlayer = el.singlePlayer === 1 ? "Yes" : "No"
                        el.multiplayer = el.multiplayer === 1 ? "Yes" : "No"

                        temp = el.genre.split(', ')
                        tempGenre = [...tempGenre, ...temp]

                        temp = el.platform.split(', ')
                        tempPlatform = [...tempPlatform, ...temp]

                        tempRelease = [...tempRelease, el.release]

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

                    tempGenre = Array.from(new Set(tempGenre)).sort()
                    tempPlatform = Array.from(new Set(tempPlatform)).sort()
                    tempRelease = Array.from(new Set(tempRelease)).sort()

                    setGenreList(tempGenre.map(el => { return { text: el, value: el } }))
                    setPlatformList(tempPlatform.map(el => { return { text: el, value: el } }))
                    setReleaseList(tempRelease.map(el => { return { text: el, value: el } }))
                })
        }
    }, [data, setData, setGenreList, setPlatformList, setReleaseList])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, row) => <Link to={`/Game/Detail/${row.id}`} >{text}</Link>,
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
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
            title: 'Single Player',
            dataIndex: 'singlePlayer',
            key: 'singlePlayer',
            filters: [
                { text: "Yes", value: "Yes" },
                { text: "No", value: "No" }
            ],
            filteredValue: filteredInfo.singlePlayer || null,
            onFilter: (value, record) => record.singlePlayer.includes(value),
            sorter: (a, b) => a.singlePlayer.localeCompare(b.singlePlayer),
            sortOrder: sortedInfo.columnKey === 'singlePlayer' && sortedInfo.order,
        },
        {
            title: 'Multi Player',
            dataIndex: 'multiplayer',
            key: 'multiplayer',
            filters: [
                { text: "Yes", value: "Yes" },
                { text: "No", value: "No" }
            ],
            filteredValue: filteredInfo.multiplayer || null,
            onFilter: (value, record) => record.multiplayer.includes(value),
            sorter: (a, b) => a.multiplayer.localeCompare(b.multiplayer),
            sortOrder: sortedInfo.columnKey === 'multiplayer' && sortedInfo.order,
        },
        {
            title: 'Platform',
            dataIndex: 'platform',
            key: 'platform',
            filters: [...platformList],
            filteredValue: filteredInfo.platform || null,
            onFilter: (value, record) => record.platform.includes(value),
            sorter: (a, b) => a.platform.localeCompare(b.platform),
            sortOrder: sortedInfo.columnKey === 'platform' && sortedInfo.order,
        },
        {
            title: 'Release',
            dataIndex: 'release',
            key: 'release',
            filters: [...releaseList],
            filteredValue: filteredInfo.release || null,
            onFilter: (value, record) => record.release.toString().includes(value),
            sorter: (a, b) => a.release - b.release,
            sortOrder: sortedInfo.columnKey === 'release' && sortedInfo.order,
        },
        {
            title: 'Action',
            key: 'id',
            render: (row) => (
                <Space size="middle">
                    <Link to={`/Game/Edit/${row.id}`} >Edit</Link>
                    <Link onClick={() => { handleDelete(row.id) }}>Delete</Link>
                </Space>
            ),
        },
    ];

    const clearFilters = () => {
        setFilteredInfo({})
    }

    const clearSorter = () => {
        setSortedInfo({})
    }

    const clearAll = () => {
        setFilteredInfo({})
        setSortedInfo({})
    }

    const select = (
        <Select defaultValue="name" className="select" onSelect={(val) => setCategory(val)}>
            <Option value="name" >Name</Option>
            <Option value="genre">Genre</Option>
            <Option value="platform">Platform</Option>
            <Option value="release">Release</Option>
        </Select>
    )

    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters)
        setSortedInfo(sorter)
    }

    const handleDelete = (id) => {
        axios.delete(`https://backendexample.sanbersy.com/api/data-game/${id}`, {
            headers: { "Authorization": `Bearer ${user.token}` }
        })
            .then(() => {
                let newGame = games.filter(el => el.id !== id)
                setData([...newGame])
                setGames([...newGame])
            })
    }

    const onChangeSearch = (event) => {
        let newGame = [...games]
        let value = event.target.value.toString().toLowerCase()

        if (category === 'name') {
            newGame = games.filter(el => el.name.toString().toLowerCase().indexOf(value) !== -1)
        }
        if (category === 'genre') {
            newGame = games.filter(el => el.genre.toString().toLowerCase().indexOf(value) !== -1)
        }
        if (category === 'platform') {
            newGame = games.filter(el => el.platform.toString().toLowerCase().indexOf(value) !== -1)
        }
        if (category === 'release') {
            newGame = games.filter(el => el.release.toString().toLowerCase().indexOf(value) !== -1)
        }

        setData([...newGame])
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
                        <Search placeholder="Search Games" onChange={onChangeSearch} enterButton addonBefore={select} style={{ width: 500 }} />
                        <Link to={`/Game/Create`} ><Button type="primary">Add New Game</Button></Link>
                    </Space>
                    <Divider></Divider>
                    <Table columns={columns} dataSource={data} onChange={handleChange} />
                </>
            }

        </>
    )
}

export default GameTable
