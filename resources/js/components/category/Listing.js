import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import AlertSuccess from "./SuccessAlert";
import AlertError from "./ErrorAlert";
export default class Listing extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangeDisplayed: 3,
            alert_message: ""
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:3000/api/category").then(res => {
            this.setState({
                categories: res.data.data,
                itemsCountPerPage: res.data.per_page,
                totalItemsCount: res.data.total,
                activePage: res.data.current_page
            });
        });
    }

    onDelete(category_id) {
        axios
            .delete("http://localhost:3000/api/category/delete/" + category_id)
            .then(res => {
                var categories = this.state.categories;
                for (var i = 0; i < categories.length; i++) {
                    if (categories[i].id == category_id) {
                        categories.splice(i, 1);
                        this.setState({
                            categories
                        });
                    }
                }

                this.setState({
                    alert_message: "success"
                });
            })
            .catch(error => {
                this.setState({
                    alert_message: "error"
                });
            });
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        // this.setState({ activePage: pageNumber });
        axios
            .get("http://localhost:3000/api/category?page=" + pageNumber)
            .then(res => {
                this.setState({
                    categories: res.data.data,
                    itemsCountPerPage: res.data.per_page,
                    totalItemsCount: res.data.total,
                    activePage: res.data.current_page
                });
            });
    }

    render() {
        return (
            <div className="container pb-5">
                <hr />
                {this.state.alert_message == "success" ? (
                    <AlertSuccess message={"Category deleted successfully."} />
                ) : null}
                {this.state.alert_message == "error" ? (
                    <AlertError
                        message={"Error occured while deleting the category."}
                    />
                ) : null}
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Category</th>
                            <th scope="col">Status</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Updated At</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.categories.map(category => {
                            return (
                                <tr key={category.id}>
                                    <th scope="row"></th>
                                    <td>{category.name}</td>
                                    <td>
                                        {category.active
                                            ? "Active"
                                            : "Inactive"}
                                    </td>
                                    <td>{category.created_at}</td>
                                    <td>{category.updated_at}</td>
                                    <td>
                                        <Link
                                            to={`/category/edit/${category.id}`}
                                        >
                                            Edit
                                        </Link>{" "}
                                        |
                                        <a
                                            href="#"
                                            onClick={this.onDelete.bind(
                                                this,
                                                category.id
                                            )}
                                        >
                                            Delete
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="d-flex justify-content-center">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={this.state.pageRangeDisplayed}
                        onChange={this.handlePageChange}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
            </div>
        );
    }
}
