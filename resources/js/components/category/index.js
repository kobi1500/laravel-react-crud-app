import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import Edit from "./Edit";
import Add from "./Add";
import Listing from "./Listing";
export default class index extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <hr />
                    <Link to="/category" className="btn btn-primary my-5">
                        Listing
                    </Link>
                    &nbsp;
                    <Link to="/category/add" className="btn btn-primary my-5">
                        Add
                    </Link>
                    <Route exact path="/category" component={Listing} />
                    <Route exact path="/category/add" component={Add} />
                    <Route exact path="/category/edit/:id" component={Edit} />
                </div>
            </div>
        );
    }
}
