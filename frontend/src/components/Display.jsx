import { useContext } from "react"
import { PlayerContext } from "../context/Player"
import { FaHeart } from 'react-icons/fa'
import { FaEllipsisH } from "react-icons/fa"

function Display() {
  const { songData, backendUrl } = useContext(PlayerContext)
  console.log('songData in display', songData);

  return (
    <div className="w-96 auto bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-xl px-3 mr-3 overflow-y-scroll">
      <div className="flex flex-row items-center justify-between py-2 mt-2 px-2">
        <h1 className="text-md font-bold ">top streames</h1>
        <div className="flex flex-row items-center bg-gray-400 px-1 py-1 rounded-lg space-x-2">
          <p className="bg-red-500 text-white rounded-lg px-2 py-1">Local</p>
          <p className=" text-white rounded-lg px-2 py-1">global</p>
        </div>
      </div>

      <div className="mt-3 overflow-y-scroll">
        {songData.map((song, index) => (
          <div
            key={song._id}
            className="flex flex-row items-center justify-between py-2 px-2 hover:bg-gray-800 rounded-lg cursor-pointer"
          >
            {/* Left Section */}
            <div className="flex flex-row items-center space-x-3">
              <p className="text-gray-400">{index + 1}</p>
              <img
                src={`${backendUrl}/upload/${song.imagePath}`}
                alt={song.title}
                className="w-15 h-15 rounded-lg object-cover"
              />
              <div className="flex flex-col">
                <p className="text-white font-semibold">{song.title}</p>
                <p className="text-gray-400 text-sm">{song.artist}</p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-row items-center space-x-3">
              <FaHeart className="text-gray-400 hover:text-red-500 cursor-pointer" />
              <FaEllipsisH className="text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

        )).slice(0, 5)}
      </div>
    </div>
  )
}

export default Display