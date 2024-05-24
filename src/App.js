import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, {useState, useEffect} from 'react';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavourites from './components/RemoveFavourites';

//App Component 
const App= ()=>{
  
  //create useState object to hold the movie results that come back from the search
  const [movies, setMovies]=useState([]);
  
  const [favourites, setFavourites]= useState([]);
  const [searchValue, setSearchValue]=useState('');

// Define an asynchronous function to fetch movie data from the OMDB API
const getMovieRequest= async (searchValue) => {
    const url= `https://www.omdbapi.com/?s=${searchValue}&apikey=8432d70a`;

    // Use the fetch API to make a request to the URL and wait for the response
    const response= await fetch(url);

     // Convert the response to JSON format and wait for the conversion to complete
    const responseJson= await response.json();

    console.log(responseJson);

    if(responseJson.Search){
        setMovies(responseJson.Search);
    }
};

useEffect(()=>{
  getMovieRequest(searchValue);
}, [searchValue]); //When the search value changes, getMovieRequest will be called

const saveToLocalStorage=(items)=>{
  localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
};

const addFavouriteMovie=(movie)=>{
  const newFavouriteList=[...favourites, movie];
  setFavourites(newFavouriteList);
  saveToLocalStorage(newFavouriteList);
};

const removeFavouriteMovie=(movie)=>{
  const newFavouriteList=favourites.filter(
    (favourite) => favourite.imdbID !== movie.imdbID
  );

  setFavourites(newFavouriteList);
}
  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading= 'MovieFinder'/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className='row'>
          <MovieList movies= {movies} 
          handleFavouritesClick={addFavouriteMovie} 
          favouriteComponent={AddFavorites}/>
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading= 'Favourites'/>
      </div>
      <div className='row'>
          <MovieList movies= {favourites} 
          handleFavouritesClick={removeFavouriteMovie} 
          favouriteComponent={RemoveFavourites}/>
      </div>
    </div>
  );
  
};
export default App;
