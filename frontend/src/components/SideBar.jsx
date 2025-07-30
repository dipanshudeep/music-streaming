import React from 'react'
import { IoMdHome } from 'react-icons/io'
import {BsGrid1X2} from 'react-icons/bs'
import {CiHeart} from 'react-icons/ci'
import { CiHeadphones } from 'react-icons/ci'
function SideBar() {
  return (
    <div className='bg-gradient-to-l from-black to-gray-700'>
      <div className='mt-10 py-2 px-2'>
         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQckw9pAO9cZ97J8_qwkF9gtkZ-tvMOzy4Jqhb5zBPVdrLTPeYNrhbuDLs&s" alt="logo" onClick={()=> navigate('/')} className='mt-1 w-40 hidden md:block cursor-pointer rounded-2xl'/>
         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQckw9pAO9cZ97J8_qwkF9gtkZ-tvMOzy4Jqhb5zBPVdrLTPeYNrhbuDLs&s" alt="logo" onClick={()=> navigate('/')} className='mt-1 w-20 block md:hidden cursor-pointer'/>
      </div>
      <div className='flex flex-row items-center justify-center gap-5 py-2 px-2'>
        <div className='bg-red-500 w-full flex-row item-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer'>
          <IoMdHome className='text-2xl font-medium text-white' />
          <p className='text-white text-lg font-semibold hidden md:block'>Home</p>
        </div>
      </div>
      <div className='flex flex-row items-center justify-center gap-5 py-2 px-2'>
        <div className='hover:bg-red-500 w-full flex-row item-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer'>
          <BsGrid1X2 className='text-2xl font-medium text-white' />
          <p className='text-white text-lg font-semibold hidden md:block'>Browsr</p>
        </div>
      </div>
      <div className='flex flex-row items-center justify-center gap-5 py-2 px-2'>
        <div className='hover:bg-red-500 w-full flex-row item-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer'>
          <CiHeart className='text-2xl font-medium text-white' />
          <p className='text-white text-lg font-semibold hidden md:block'>Favorite</p>
        </div>
      </div>
      <div className='flex flex-row items-center justify-center gap-5 py-2 px-2'>
        <div className='hover:bg-red-500 w-full flex-row item-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer'>
          <CiHeadphones className='text-2xl font-medium text-white' />
          <p className='text-white text-lg font-semibold hidden md:block'>library</p>
        </div>
      </div>
    </div>
  )
}

export default SideBar