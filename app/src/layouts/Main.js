import React from "react"
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from 'antd';
import Header from "./Header"
import Sidebar from "./Sidebar"
import Content from "./Content"
import Footer from "./Footer"
import { UserProvider } from "../context/UserContext";
import { GamesProvider } from "../context/GamesContext";
import { MovieProvider } from "../context/MovieContext";

class Main extends React.Component {
    render() {
        return (
            <UserProvider>
                <GamesProvider>
                    <MovieProvider>
                        <Router>
                            <Layout style={{ minHeight: '100vh' }}>
                                <Header />
                                <Layout>
                                    <Sidebar />
                                    <Content />
                                </Layout>
                                <Footer />
                            </Layout>
                        </Router>
                    </MovieProvider>
                </GamesProvider>
            </UserProvider>
        )
    }
}

export default Main