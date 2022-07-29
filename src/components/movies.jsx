import React, { Component} from 'react'
import { getMovies } from  "../services/fakeMovieService"
import Like from './common/like'



class Movies extends Component{
    state = {
      movies: getMovies()
    }

    handleDelete = (movie)=> {
        const movies = this.state.movies.filter((m) => m._id !== movie._id)
        this.setState({movies: movies})
    }
    handleLike = (movie) => {
        const movies =  [ ...this.state.movies]
        const index = movies.indexOf(movie);
        movies[index] = {... movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies})

        // if (movies[index].liked=== true){
        //     console.log("wow liked",movie.title) 
        // }
        // else{
        //     console.log("none")
        // }
    }
    iconHeart = () => {
        const icon = document.querySelector('.icon-white')
        icon.addEventListener('click',()=>{
            // icon.style.fill='#000'
            console.log("ll")
        })
    }

    render(){
        let {length: count}  = this.state.movies
        return(
            <div className='container pt-4'>
                <h1>Movie Lists</h1>
                <p className='badge badge-info'>See if movies are available in the table</p>
                <div className='pt-4'>
                    <p>Showing <span className='badge badge-dark'>{count} </span> movies in the database</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Genre</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Rate</th>
                                <th />
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {(count===0)  &&  <h6 className='mt-2'>There are no movies in the database</h6>}  
                            {this.state.movies.map((movie)=> {
                                return(
                                    <tr key={movie._id}>
                                        <td>{movie.title}</td>
                                        <td>{movie.genre.name}</td>
                                        <td>{movie.numberInStock}</td>
                                        <td>{movie.dailyRentalRate}</td>
                                        <td>
                                            <Like liked={movie.liked} onClick={()=> this.handleLike(movie)} />
                                        </td>
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