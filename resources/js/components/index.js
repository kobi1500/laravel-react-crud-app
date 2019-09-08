import React, { Component } from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router } from "react-router-dom";

export default class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Footer />
            </div>
        );
    }
}

if (document.getElementById("app")) {
    ReactDOM.render(
        <Router>
            <App />
        </Router>,
        document.getElementById("app")
    );
}
