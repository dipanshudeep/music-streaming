import { createContext, useEffect, useState } from "react";
import axios from "axios";

const PlayerContext = createContext();
const PlayerContextProvider = ({children})=>{
    const backendUrl = `https://music-streaming-q2j7.onrender.com`;
   
    const [songData, setSongData] = useState([]);
   
    const fetchSongs = async () => {
        try {
            const {data} = await axios.get(`${backendUrl}/api/admin/get-music`)
            if (data.success) {
                setSongData(data.musics);
                console.log("Fetched songs successfully:", data.musics);
            }
            
        } catch (error) {
            console.error("Error fetching songs:", error);
        }
    }

    useEffect(() => {
        fetchSongs();
    }, []);

    const values ={
        backendUrl,
        songData,
        fetchSongs
    }
    return (
        <PlayerContext.Provider value={values}> 
        {children}
        </PlayerContext.Provider>
    );
}

export {PlayerContext, PlayerContextProvider, };