import React from 'react'
import Header from './Header'
import useNowPlaying from '../hooks/useNowPlaying'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import Footer from './Footer';

const Browse = () => {

  useNowPlaying();
  usePopularMovies();

  
  return (
    <div>
        <Header />
        <MainContainer />
        <SecondaryContainer />
        <Footer />
    </div>
  )
}

export default Browse
