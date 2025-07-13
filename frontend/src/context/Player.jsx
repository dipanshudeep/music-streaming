import { createContext, use, useState } from "react";

const PlayerContext = createContext();
const PlayerContextProvider = ({children})=>{
    const backendUrl = `http://localhost:4000`;
   
    const [songData, setSongData] = useState([]);
   
    const fetchSongs = async () => {
        try {
            const {data} = await axios.get(`${backendUrl}/api/admin/get-music`)
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