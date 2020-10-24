import React, { useContext } from "react"
import { Layout } from 'antd';
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
import { UserContext } from "../context/UserContext";

const Header = () => {
    const [user,] = useContext(UserContext)
    const { Content } = Layout;
    
    return (
        <Layout style={{ padding: '24px 24px' }}>
            <Content id="content" >
                <Switch>
                    <Route exact path="/login" component={Login} />
                    {user === null && <Route exact path="/register" component={Register} />}
                    {user !== null && <Route exact path="/changePass" component={ChangePassword} />}

                    <Route exact path="/" component={Home} />

                    <Route exact path="/Game/List" component={GameList} />
                    {user !== null && <Route exact path="/Game/Data" component={GameTable} />}
                    <Route path="/Game/Detail/:id" component={GameDetail} />
                    {user !== null && <Route path="/Game/Edit/:id" component={GameForms} />}
                    {user !== null && <Route exact path="/Game/Create" component={GameForms} />}

                    <Route exact path="/Movie/List" component={MovieList} />
                    {user !== null && <Route exact path="/Movie/Data" component={MovieTable} />}
                    <Route path="/Movie/Detail/:id" component={MovieDetail} />
                    {user !== null && <Route path="/Movie/Edit/:id" component={MovieForms} />}
                    {user !== null && <Route exact path="/Movie/Create" component={MovieForms} />}

                </Switch>
            </Content>
        </Layout>
    )
}

export default Header
