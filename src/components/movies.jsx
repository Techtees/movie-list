import React, { Component} from 'react'
import { getMovies } from  "../services/fakeMovieService"
import Like from './common/like'
import Pagination from './common/pagination'
import ListGroup from './common/listGroup'
import { paginate } from './utils/paginate'
import { getGenres } from '../services/fakeGenreService'
import { filter } from 'lodash'


const navStyles = {
    marginLeft:'20px'

}

class Movies extends Component{
    state = {
      movies: [],
      genres:[],
      pageSize:5,
      currentPage:1,   
    }
    componentDidMount(){
        const genres = [{name:'All Genres'}, ...getGenres()]
        this.setState({ movies:getMovies(), genres:genres });
    }

    handleDelete = (movie)=> {
        const movies = this.state.movies.filter((m) => m._id !== movie._id)
        this.setState({movies: movies})
    }
    handlePageChange = (page)=> {
        this.setState({currentPage : page})

    }
    handleLike = (movie) => {
        const movies =  [ ...this.state.movies]
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
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
        })
    }
    handleGenreSelect=(genre) => {
        this.setState({selectedGenre: genre,currentPage: 1})
        console.log(genre)
    }

    render(){
        let {length: count}  = this.state.movies
        const {pageSize,currentPage, movies: allMovies, selectedGenre} = this.state
        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter((m)=> m.genre._id === selectedGenre._id) : allMovies
        const movies = paginate(filtered,currentPage,pageSize)
        return(
            <div className='container pt-4'>
                <h1>Movie Lists</h1>
                <div className="row col-md-12 pt-4">
                    <div className="col-md-3">
                        <ListGroup
                         items = {this.state.genres} 
                         selectedItem = {this.state.selectedGenre}
                         onItemSelect={this.handleGenreSelect} 
                         />
                        {/* <div className='border' style={{height:'230px', width:'200px',margin:'0 auto'}}>
                            <div className='border-bottom p-3'>
                                 <span style={navStyles}>All Genre</span>
                            </div>
                            <div className='border-bottom p-3'>
                                 <span style={navStyles}>Action</span>
                            </div>
                            <div className='border-bottom p-3'>
                                 <span style={navStyles}>Comedy</span>
                            </div>
                            <div className='p-3'>
                                 <span style={navStyles}>Thriller</span>
                            </div>
                        </div> */}
                    </div>
                    <div className='col'>
                        <div className=''>
                            <p>Showing <span className='badge badge-dark'>{filtered.length} </span> movies in the database</p>
                            {(count===0)  &&  <h6 className='mt-2'>There are no movies in the database</h6>}
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
                                    {movies.map((movie)=> {
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
                            <Pagination itemCount={filtered.length} pageSize={pageSize} onPageChange={this.handlePageChange} currentPage={currentPage} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Movies