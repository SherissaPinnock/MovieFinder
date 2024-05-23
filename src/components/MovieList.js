import React from 'react';

const MovieList =(props)=>{
    const FavouriteComponent = props.favouriteComponent;
    return(
        <>
            {props.movies.map((movie, index)=> (
                <div className="image-container col-md-3" key={index}>
                    <div className="movie-item">
                        <img src={movie.Poster} alt="movie" className="img-fluid"></img>
                        <div 
                            onClick={()=> props.handleFavouritesClick(movie)}
                            className='overlay d-flex align-items-center justify-content-center'>
                            <FavouriteComponent/>
                        </div> 
                    </div>
                   
                </div>
            ))}
        </>
    );
};

export default MovieList;