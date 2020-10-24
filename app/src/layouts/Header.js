import React, { useContext } from "react"
import logo from "../resources/img/logo.png"
import { Layout, Menu } from 'antd';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Header = () => {
    const [user, setUser] = useContext(UserContext)
    const { Header } = Layout;

    const handleLogout = () => {
        setUser(null)
        localStorage.removeItem("user")
    }

    return (
        <Header id="header">
            <img id="logo" alt="Logo" src={logo} />
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/Movie/List">Movie</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/Game/List">Game</Link></Menu.Item>

                {
                    user === null &&
                    <Link to="/login">
                        <Menu.Item style={{ float: 'right' }} key="4" icon={<LoginOutlined />} > Login</Menu.Item>
                    </Link>
                }
                {
                    user !== null &&
                    <Link to="/login" onClick={handleLogout}>
                        <Menu.Item style={{ float: 'right' }} key="5" icon={<LogoutOutlined />} > Logout</Menu.Item>
                    </Link>
                }
            </Menu>
        </Header>
    )
}

export default Header
