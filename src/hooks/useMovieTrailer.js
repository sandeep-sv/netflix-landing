import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailer } from "../utils/movieSclice";
import { useEffect } from "react";

const useMovieTrailer = (id)=>{
    const dispatch = useDispatch();
    const getMovieVideos = async()=>{
        const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, API_OPTIONS);
        const json = await data.json();

        const trailers = json.results.filter((video)=>video.type==="Trailer");
        const trailer = trailers.length?trailers[0]: json.results[0];
        dispatch(addTrailer(trailer));

    }

    useEffect(()=>{
        getMovieVideos();
    },[]);


}

export default useMovieTrailer;