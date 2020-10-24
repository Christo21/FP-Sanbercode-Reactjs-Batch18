import React from "react"
import { Layout } from 'antd';

class Footer extends React.Component {
    render() {
        const { Footer } = Layout;
        return (
            <Footer style={{ textAlign: "center" }}>
                Copyright &copy; 2020 by Christoper Jonathan
            </Footer>
        )
    }
}

export default Footer