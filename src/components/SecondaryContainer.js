import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
    const movies = useSelector((store)=>store.movies)
    console.log(movies);
  return (
    movies.nowPlayingMovies&& 
    <div className='bg-black'>
      <div className='relative z-20 pl-12 bg-transparent xl:-mt-56 lg:-mt-12 md:-mt-8'>
       <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />
        <MovieList title={"Upcoming Movies"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Horror Movies"} movies={movies.nowPlayingMovies} />

      </div>
        
      
    </div>
  )
}

export default SecondaryContainer
