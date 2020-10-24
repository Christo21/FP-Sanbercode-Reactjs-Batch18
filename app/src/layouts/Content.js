import React from "react"
import { Layout, Breadcrumb } from 'antd';
import { Switch, Route } from "react-router-dom";
import Login from "../pages/Profile/Login";
import Register from "../pages/Profile/Register";
import ChangePassword from "../pages/Profile/ChangePassword";
import MovieTable from "../pages/Movie/MovieTable";
import GameTable from "../pages/Game/GameTable";
import GameDetail from "../pages/Game/GameDetail";
import MovieDetail from "../pages/Movie/MovieDetail";
import GameForms from "../pages/Game/GameForm";
import GameList from "../pages/Game/GameList";
import MovieForms from "../pages/Movie/MovieForm";
import MovieList from "../pages/Movie/MovieList";
import Home from "../pages/Home";

const Header = () => {
    // const [user, setUser] = useContext(UserContext)

    // const handleLogout = () => {
    //     setUser(null)
    //     localStorage.removeItem("user")
    // }
    const { Content } = Layout;

    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Movie</Breadcrumb.Item>
                <Breadcrumb.Item>Detail</Breadcrumb.Item>
            </Breadcrumb>
            <Content id="content" >
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/changePass" component={ChangePassword} />

                    <Route exact path="/" component={Home} />

                    <Route exact path="/Game/List" component={GameList} />
                    <Route exact path="/Game/Data" component={GameTable} />
                    <Route path="/Game/Detail/:id" component={GameDetail} />
                    <Route path="/Game/Form/:id" component={GameForms} />
                    <Route exact path="/Game/Form" component={GameForms} />

                    <Route exact path="/Movie/List" component={MovieList} />
                    <Route exact path="/Movie/Data" component={MovieTable} />
                    <Route path="/Movie/Detail/:id" component={MovieDetail} />
                    <Route path="/Movie/Form/:id" component={MovieForms} />
                    <Route exact path="/Movie/Form" component={MovieForms} />

                </Switch>
            </Content>
        </Layout>

        // <header>
        //     <img id="logo" alt="Logo" src={logo} width="200px" />
        //     <nav>
        //         <ul>
        //             {/* <li><Link to="/">Home</Link></li>
        //             <li><Link to="/about">About </Link> </li>
        //             {user && <li><Link to="/movies">Movie List Editor </Link></li>}
        //             {user === null && <li><Link to="/login">Login </Link></li>}
        //             {user && <li><a style={{ cursor: "pointer" }} onClick={handleLogout}>Logout </a></li>} */}
        //         </ul>
        //     </nav>
        // </header>
    )
}

export default Header
