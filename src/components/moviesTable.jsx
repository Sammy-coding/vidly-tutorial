import Like from "./common/like";
import React, { Component } from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  column = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movie/${movie._id}`}>
          {movie.title}
        </Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          liked={movie.liked}
          onClick={() => this.props.onHandleLike(movie)}
        />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onHandleDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          delete
        </button>
      ),
    },
  ];

  render() {
    const { allMovies, onSort, sortColumn } = this.props;
    return (
      <Table
        column={this.column}
        sortColumn={sortColumn}
        onSort={onSort}
        data={allMovies}
      />
    );
  }
}

export default MoviesTable;
