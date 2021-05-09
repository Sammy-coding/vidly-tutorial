import React, { Component } from "react";
import MoviesTable from "../components/moviesTable";
import { deleteMovie, getMovies } from "../services/movieService";
import toast from 'react-toastify'
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listgroup";
import { getGenres } from "../services/genreService";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./searchForm";
import logger from '../services/logServices';

export default class Movies extends Component {
  state = {
    movies: [],
    count: 0,
    pageSize: 4,
    currentPage: 1,
    genres: [],
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const {data: genre} = await getGenres();
    const genres = [{ _id: "", name: "All Items" }, ...genre];

    const {data} = await getMovies(); 
    this.setState({ movies: data, genres });
  }

  handleDelete = async (movie) => {
    const original = this.state.movies;
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch(ex) {
      if(ex.response && ex.response.status === 404)
      toast.error('this message has already been deleted');

      console.log(logger);

      this.setState({movies: original});
    }

  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSelectedGenre = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleOnSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleChange = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getFilteredPage = () => {
    const {
      movies: allMovies,
      selectedGenre,
      sortColumn,
      currentPage,
      pageSize,
      searchQuery,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { data: movies, totalCount: filtered.length };
  };

  render() {
    const { length: count } = this.state.movies;

    const {
      genres,
      selectedGenre,
      sortColumn,
      pageSize,
      currentPage,
      searchQuery,
    } = this.state;

    if (count === 0) return <p>there are no movies in the database.</p>;

    const { totalCount, data } = this.getFilteredPage();

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleSelectedGenre}
          />
        </div>
        <div className="col">
          <Link
            className="nav-item nav-link"
            to="/movie/new"
            style={{ marginBottom: 20 }}
          >
            <button className="btn btn-primary">Movies</button>
          </Link>
          <SearchBox value={searchQuery} onChange={this.handleChange} />
          <p>Showing {totalCount} movies in the database.</p>
          <MoviesTable
            allMovies={data}
            sortColumn={sortColumn}
            onHandleLike={this.handleLike}
            onHandleDelete={this.handleDelete}
            onSort={this.handleOnSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
