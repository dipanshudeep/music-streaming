import React from 'react'
import { IoIosAddCircle }  from 'react-icons/io'
import { IoMusicalNotes } from 'react-icons/io5'
import { NavLink, useNavigate } from 'react-router-dom'



function SideBarAdmin() {
  const navigate = useNavigate()
  
  return (

    <div className='bg-gradient-to-t from-black to-gray-500 min-h-screen space-y-16 p-[1vw] item-centre flex flex-col'>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQckw9pAO9cZ97J8_qwkF9gtkZ-tvMOzy4Jqhb5zBPVdrLTPeYNrhbuDLs&s" alt="logo" onClick={()=> navigate('/')} className='mt-1 w-40 hidden md:block cursor-pointer rounded-2xl'/>
      {/* <img src="" alt="logo" onClick={()=> navigate('/')} className='mt-1 w-44 block md:hidden cursor-pointer'/> */}
      
      <div className='flex flex-col items-center gap-5 mt-10 py-2 px-2'>
        <NavLink to={'/add-music'} className={'flex items-center gap-2 text-white hover:text-gray-300 text-sm font-medium cursor-pointer'}>
          <IoIosAddCircle className='w-12 h-12 text-xl font-medium' />
          <p >add music</p>
        </NavLink>

        <NavLink to={'/list-song'} className={'flex items-center gap-2 text-white hover:text-gray-300 text-sm font-medium cursor-pointer'}>
          <IoMusicalNotes className='w-12 h-12 text-xl font-medium' />
          <p >list of songs</p>
        </NavLink>

      </div>
    </div>
  )
}

export default SideBarAdmin