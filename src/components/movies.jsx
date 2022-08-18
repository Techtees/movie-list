import React, { Component} from 'react'
import { getMovies } from  "../services/fakeMovieService"
import Pagination from './common/pagination'
import ListGroup from './common/listGroup'
import { paginate } from './utils/paginate'
import { getGenres } from '../services/fakeGenreService'
import MovieTable from './movieTable'
import _ from 'lodash'


const navStyles = {
    marginLeft:'20px'

}

class Movies extends Component{
    state = {
      movies: [],
      genres:[],
      pageSize:5,
      currentPage:1,   
      sortColumn:{path:'title', order:'asc'}
    }
    componentDidMount(){
        const genres = [{_id: '',name:'All Genres'}, ...getGenres()]
        this.setState({ movies:getMovies(), genres:genres });
    }

    handleDelete = (movie)=> {
        const movies = this.state.movies.filter((m) => m._id !== movie._id)
        this.setState({movies: movies})
    }
    handlePageChange = (page)=> {
        this.setState({currentPage : page})

    }
    handleSort = (path) => {
        this.setState({path, sortColumn: { path, order: 'asc'}}) // 
    }
    handleLike = (movie) => {
        // function to handle the like toggle like : - movie object should not be changed directly, it should be clone into another array 
        // - then we find the index of the each items in the movie object 
        // - clone the movie index into anothe movie object
        //latly check if movies[index].liked = !movies[index].liked

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
        let {length: count}  = this.state.movies // destructured the length of the movies
        const {pageSize,currentPage, movies: allMovies, selectedGenre, sortColumn} = this.state // destructuring inputs
        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter((m)=> m.genre._id === selectedGenre._id) : allMovies // list group filter here to check if the genre of the list is smae as the movie genre
        const sorted = _.orderBy(filtered,[sortColumn.path],[sortColumn.order]) // lodash method to sorth the array. - passed the filtered movie data, sorthcolum.path ( which is from the raised event from movie table component) and also the order)
        const movies = paginate(sorted,currentPage,pageSize) //paginate function to help paginate the data into pages 
       
        return(
            <div className='container pt-4'>
                <h1>Movie Lists</h1>
                <div className="row col-md-12 pt-4">
                    <div className="col-md-3">
                        <ListGroup
                         items = {this.state.genres} 
                         selectedItem = {this.state.selectedGenre}
                         onSort={this.handleSort}
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
                            <MovieTable movies ={movies} onLike={this.handleLike} onDelete={this.handleDelete} onSort={this.handleSort} />
                            <Pagination itemCount={filtered.length} pageSize={pageSize} onPageChange={this.handlePageChange} currentPage={currentPage} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Movies