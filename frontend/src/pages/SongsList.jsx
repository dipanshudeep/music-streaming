import React, { use, useContext, useEffect, useState } from 'react'
import { PlayerContext } from '../context/Player.jsx'
import axios from 'axios';
import MusicCard from '../components/MusicCard.jsx';
function SongsList() {

  const {backendUrl} = useContext(PlayerContext)
  const [musics, setMusic] = useState([]);

  const fetchSongs = async () => {
    try {
      const data = await axios.get(`${backendUrl}/api/admin/get-music`);
      
      if (data.data.success){
        setMusic(data.data.musics);
      } 
    } catch (error) {
      console.error("Error fetching songs xx:", error);
      
    }}

  useEffect(() => {
    fetchSongs();
  }, []);

  return (

    <div className='px-4 py-6'>
      <h1 className='text-3xl font-bold text-center md-8'>music library</h1>
      <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4'>
        
        {musics.map((music)=>(
          
          <MusicCard key={music._id} music= {music} fetchSongs={ fetchSongs}/>
        ))}
      
      </div>
    </div>
  )
}

export default SongsList