import React, { useContext } from "react"
import { Layout, Menu } from 'antd';
import { UserOutlined, CrownOutlined, PlaySquareOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Header = () => {
    const [user, setUser] = useContext(UserContext)
    const { Sider } = Layout;
    const { SubMenu } = Menu;

    const handleLogout = () => {
        setUser(null)
        localStorage.removeItem("user")
    }

    return (
        <Sider width={200} id="sidebar">
            <Menu
                mode="inline"
                style={{ height: '100%', borderRight: 0 }}
            >
                <SubMenu key="sub1" icon={<PlaySquareOutlined />} title="Movie">
                    <Menu.Item key="1"><Link to="/Movie/List">List</Link></Menu.Item>
                    {user !== null && <Menu.Item key="2"><Link to="/Movie/Create">Add New Movie</Link></Menu.Item>}
                    {user !== null && <Menu.Item key="3"><Link to="/Movie/Data">Data</Link></Menu.Item>}
                </SubMenu>
                <SubMenu key="sub2" icon={<CrownOutlined />} title="Game">
                    <Menu.Item key="4"><Link to="/Game/List">List</Link></Menu.Item>
                    {user !== null && <Menu.Item key="5"><Link to="/Game/Create">Add New Game</Link></Menu.Item>}
                    {user !== null && <Menu.Item key="6"><Link to="/Game/Data">Data</Link></Menu.Item>}
                </SubMenu>
                <SubMenu key="sub3" icon={<UserOutlined />} title="Profile">
                    {user === null && <Menu.Item key="7"><Link to="/login">Login</Link></Menu.Item>}
                    {user === null && <Menu.Item key="8"><Link to="/register">Register</Link></Menu.Item>}
                    {user !== null && <Menu.Item key="9"><Link to="/changePass">Change Password</Link></Menu.Item>}
                    {user !== null && <Menu.Item key="10"><Link to="/login" onClick={handleLogout}>Logout</Link></Menu.Item>}
                </SubMenu>
            </Menu>
        </Sider>
    )
}

export default Header
