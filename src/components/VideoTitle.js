import React from 'react'

const VideoTitle = (props) => {
    const {title,overview} = props;
  return (
    <div className='px-20 pt-[17%] lg:pt-[14%] sm:px-24 absolute 2xl:pt-[20%] text-white bg-gradient-to-r from-black w-screen aspect-video'>
        <h1 className='text-lg font-bold lg:text-6xl :text-3xl'>{title}</h1>
        <p className='text-base py-6 lg:text-lg  lg:w-1/2 '>{overview}</p>
        <div className=''>
            <button className='bg-white text-black lg:py-6 lg:px-16 lg:text-xl py-4 px-8 text-lg  rounded-lg hover:bg-opacity-80'>►Play</button>
            <button className='bg-gray-500 text-white lg:px-16 lg:py-6 lg:text-xl py-4 px-8 text-lg rounded-lg mx-4 hover:bg-opacity-80 '>More Info</button>
        </div>
      
    </div>
  )
}

export default VideoTitle
