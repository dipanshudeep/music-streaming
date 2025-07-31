import { use, useContext, useRef, useState } from "react"
import { FaPlay,FaPause } from "react-icons/fa"
import { PlayerContext } from "../context/Player"

function NewReleases({setCurrentSongImage, setCurrentSongTitle, setCurrentSongArtist}) {
  const {songData, backendUrl} = useContext(PlayerContext)
  const  [isPlaying, setIsPlaying] = useState(null);
  const [currentTime,setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(new Audio());
  // console.log('songData in new releases dffgdfghdfg', songData);
  
  

  const playClicked = (song) => {
    if (isPlaying === song._id){
      return
    }
    
    if (audioRef.current) {
      audioRef.current.pause();
    }
    console.log('song in playClicked inside new release', song);
    
    
    audioRef.current.src = `${backendUrl}/upload/${song.filePath}`;
    audioRef.current.play();
    // console.log("song ki id", song._id);
    
    // set to current and duration progress traking
    setIsPlaying(song._id);
      audioRef.current.onloadedmetadata = ()=>{
        setDuration(audioRef.current.duration);
    }
    audioRef.current.ontimeupdate = () =>{
      setCurrentTime(audioRef.current.currentTime);
      // console.log('current time ppppppppppppppppp', audioRef.current.currentTime);
      const imageurl = `${backendUrl}/upload/${song.imagePath}`.replace(/\\/g, '/');
      setCurrentSongImage(imageurl);
      setCurrentSongTitle(song.title);
      setCurrentSongArtist(song.artist);
      
    }
  }

  const pausedClicked = () => {
    if (audioRef.current){
      audioRef.current.pause()
      setIsPlaying(null);
      setCurrentSongImage(null);
      setCurrentSongTitle(null);
      setCurrentSongArtist(null);
    }
  }

  const handleVolume = (e) => {
    if (audioRef.current) {
      const volume = e.target.value / 100;
      audioRef.current.volume = volume;
      // setVolume(volume); // If you want to track volume state
    }}

    const handleProgressBar = (e) => {
      if (audioRef.current) {
        const progressbar = e.target;
        const newTime = (e.clientX - progressbar.getBoundingClientRect().left) / progressbar.offsetWidth * duration;
        audioRef.current.currentTime = newTime;
        // console.log("new time in handle progress bar", newTime);
        
        // setCurrentTime(newTime);
        
      }
    }




  return (
    <div className="mt-3 py-2 px2 mb-16 p-10 rounded-2xl">
      <div className="flex flex-row justify-between item-center text-white">
        <h1 className="text-lg font-bold">New Releases</h1>
          <p className="text-sm text-red-500 hover:text-white cursor-pointer mr-2">see more</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {songData.map((releases)=>(
          <div key={releases._id} className = "relative group">
            <img src={`${backendUrl}/upload/${releases.imagePath}`} alt="image" 
            className = "w-full h-40 object-cover object-top rounded-lg"/>
<div className="absolute h-40 w-full inset-0 flex items-end justify-end pr-4 py-2  rounded-lg">
              <button className="bg-red-500 p-3  rounded-full text-white hover:bg-red-600" 
              onClick={ () => {
                isPlaying === releases._id ? pausedClicked() : playClicked(releases)
              }}>
                {isPlaying === releases._id ? (
                  <FaPause className="w-4 h-4" />
                ) : (
                  <FaPlay className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="mt-2 text-white">
              <p className="text-sm font-semibold">{releases.title}</p>
              <p className="text-xs text-gray-300">{releases.artist}</p>
            </div>
            {
              isPlaying === releases._id && (
                <div className="bottom-4 w-full flex items-center justify-between z-10 text-white">
                <label htmlFor="volume" className="text-white">volume</label>
                <input 
                id="volume"
                type="range"
                min="0"
                max="100"
                onChange={handleVolume}
                defaultValue='100'
                className="w-16 h-5 cursor-pointer"
                />
                </div>  
              )}

              { isPlaying === releases._id && (
                <div className="mt-2 w-full h-1 bg-amber-700 cursor-pointer" 
                onClick={handleProgressBar} 
                
                style={{background: `linear-gradient(to right, #ff0000 ${currentTime/duration*100}%, #fff 0% )`}}>
                
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewReleases