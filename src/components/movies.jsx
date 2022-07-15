import React, { Component} from 'react'
import { getMovies } from  "../services/fakeMovieService"



class Movies extends Component{
    state = {
      movies: getMovies()
    }

    handleDelete = (movie)=> {
        const movies = this.state.movies.filter((m) => m._id !== movie._id)
        this.setState({movies: movies})
    }

    render(){
        return(
            <div className='container pt-4'>
                <h1>Movie Lists</h1>
                <p className='badge badge-info'>See if movies are available in the table</p>
                <div className='pt-4'>
                    <p>Showing <span className='badge badge-dark'>{this.state.movies.length} </span> movies in the database</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Genre</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Rate</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.movies.map((movie)=> {
                                return(
                                    <tr key={movie._id}>
                                        <td>{movie.title}</td>
                                        <td>{movie.genre.name}</td>
                                        <td>{movie.numberInStock}</td>
                                        <td>{movie.dailyRentalRate}</td>
                                        <td><button onClick={() => this.handleDelete(movie)} className='btn btn-danger btn-sm'>Delete</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Movies