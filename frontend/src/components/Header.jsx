import React, { useState } from 'react'
import NewReleases from './NewReleases';

function Header() {
  const [currentSongImage, setCurrentSongImage] = useState(null);
  const [currentSongTitle, setCurrentSongTitle] = useState(null);
  const [currentSongArtist, setCurrentSongArtist] = useState(null);
  return (
    <>
    <header className='ralative bg-cover bg-no-repeat bg-top h-96 flex item-center justify-center text-white mt-2 rounded-2xl' 
    style = {{backgroundImage: `url( ${currentSongImage || 'https://thebushwickbookclubseattle.com/wp-content/uploads/2014/02/song-of-the-week.jpg'})`}}
    >
      <div className='absolute inset-0 bg-black opacity-40 rounded-2xl'></div>
      <div className='relative z-10 text-center'>
        <h1 className='text-4xl font-bold mb-2'>{currentSongTitle || 'Welcome to Music Stream'}</h1>
        <p className='text-lg'>{currentSongArtist || 'Discover your favorite songs'}</p>
      </div>
    </header>
      {/* <div className='absolute inset-0 bg-black opacity-40'></div>   */}
      <NewReleases
      setCurrentSongImage={setCurrentSongImage}
      setCurrentSongTitle={setCurrentSongTitle}
      setCurrentSongArtist={setCurrentSongArtist}
      />
  </>
  )
}

export default Header