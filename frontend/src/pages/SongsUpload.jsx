import React, { useContext, useState } from 'react'
import { PlayerContext } from '../context/Player';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
function SongsUpload() {

  const  {backendUrl} = useContext(PlayerContext); 
  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [song, setSong] = useState(false);
  const [songData, setSongData] = useState({
    title: '',
    artist: '',
    })

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', songData.title);
      formData.append('artist', songData.artist);
      formData.append('cover', image);
      formData.append('songs', song);
      
      const { data } = await axios.post(`${backendUrl}/api/songs/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (data.success) {
        toast.success("Song uploaded successfully!");
        navigate('/list-song');
        setSongData({ title: '', artist: '' });
        setImage(false);
        setSong(false);
      } 
      else {
        toast.error("Failed to upload song. Please try again.");
      }

    } catch (error) {
      console.error("Error uploading song:", error);
      toast.error("Failed to upload song. Please try again.");
      
    }}
  return (
    <div className='h-screen flex items-center '>
      <form action="" onSubmit={handleSubmit} className='flex flex-row gap-4 max-h-screen w-full max-w-xl mx-auto p-4 text-gray-600 sm:p-6 md:p-8 shadow-lg rounded-xl shadow-blackz '>
        <div className='flex flex-row gap-6 items-center justify-center flex-wrap w-full'>
          <div className='flex flex-col gap-2 items-center ring-1 ring-gray-300 rounded-lg p-2'>
            <p className='text-sm md:text-base'>Upload Songs</p>
            <input type="file" name="songs" id="songs" accept='audio/*' hidden />
            <label htmlFor="songs">
              <img src={`https://static.thenounproject.com/png/4311350-200.png`} className='w-24 h-24 md:w-32 md:h-32 cursor-pointer object-contain ' alt="imge" />
            </label> 
          </div>
          <div className='flex flex-col gap-2 items-center ring-1 ring-gray-300 rounded-lg p-2'>
            <p className='text-sm md:text-base'>Upload Cover</p>
            <input type="file" name="cover" id="cover" accept='image/*' hidden/>
            <label htmlFor="cover">
              <img src={`https://static.thenounproject.com/png/1337310-200.png`} className=' w-24 h-24 md:w-32 md:h-32 cursor-pointer object-contain' alt="image"/>
            </label>
          </div>
           <div className='flex flex-col gap-2 w-full'>
            <label htmlFor="title" className='text-sm md:text-base'>song name</label>
            <input type="text" name="title" id="title" placeholder='Enter song title' 
            className='bg-transparent w-full p-2.5 rounded-lg outline-none' required />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <label htmlFor="artist" className='text-sm md:text-base'>song name</label>
            <input type="text" name="artist" id="artist" placeholder='Enter song title' 
            className='bg-transparent w-full p-2.5 rounded-lg outline-none' required />
          </div>
          <button type='submit' className='text-sm md:text-base bg-black text-white py-2 px-6 md:px-8 rounded-lg shadow-lg hover:bg-gray-800 lg:w-full'>add </button> 
        </div>
      </form>
    </div>
  )
}

export default SongsUpload