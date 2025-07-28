import React, { useContext } from 'react'
import { PlayerContext } from '../context/Player';
import {MdDelete} from 'react-icons/md';
import {IoIosMicrophone} from 'react-icons/io';
import axios from 'axios';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
function MusicCard({music, fetchSongs}) {
    console.log(music);
    
  const {backendUrl} = useContext(PlayerContext);
  const audioSrc = `${backendUrl}/upload/${music.filePath}`;
  const imageSrc = `${backendUrl}/upload/${music.imagePath}`; 
  // const audioSrc = `${backendUrl}/${music.filePath}`;
  // const imageSrc = `${backendUrl}/${music.imagePath}`; 
    console.log("xxxxx",audioSrc);
    console.log("xxxxx",imageSrc);
    
  const deleteSong = async () => {
    try {
      const {data} = await axios.delete(`${backendUrl}/api/admin/delete-music/${music._id}`);
      if (data.success) {
        toast.success("Song deleted successfully");
        fetchSongs();
      } else {
        console.error("Failed to delete song:", data.message);
      }
    } catch (error) {
      console.error("Error deleting song:", error);
      toast.error("Failed to delete song");
      
    }

  
}
  return (
    <div className='bg-gradient-to-b from-black to-gray-400 text-white shadow-lg overflow-hidden transition-transform transform relative rounded-lg'>
      <img
      src= {imageSrc}
      alt={music.title}
      className='w-full h-48 object-cover object-top hover:scale-105 transition-all duration-300' 
      />
      <div className='p-4'>
        <div className='flex flex-col items-center'>
          <h2 className='text-xl font-semibold'>{music.title}</h2> <MdDelete onClick={()=>deleteSong(music._id)} className='text-lg absolute top-4 hover:text-2xl transition-all'/>
        </div>
        <div className='flex items-center justify-start gap-2 mt-2'>
          <IoIosMicrophone />
          <span className='text-sm'>{music.artist}</span>
        </div>
        <p className='text-sm mt-2'><span className='text-white text-xs'>   uploaded at : </span> {new Date(music.createdAt).toLocaleString() }</p>
        <audio controls className='w-full mt-4'>
          <source src={audioSrc} className='w-full mt-3' />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
    
  )
}

export default MusicCard