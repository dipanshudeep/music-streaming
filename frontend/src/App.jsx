import {Route, Routes, useLocation} from 'react-router-dom'
import SideBarAdmin from './components/SideBarAdmin'
import SongsUpload from './pages/SongsUpload'
import SongsList from './pages/SongsList'
import SideBar from './components/SideBar'
import Header from './components/Header'
import Display from './components/Display'

function App() {
  const location =  useLocation()
  const adminPath = ['/add-music','/list-song']
  const isAdminPage = adminPath.includes(location.pathname) 
  return (
    <div className='flex relative h-screen'>
      {isAdminPage ? (
        <>
      <SideBarAdmin/>
      <div className='flex-1 overflow-y-scroll'>
        <Routes>
          <Route path='/add-music' element = {<SongsUpload/>}/>
          <Route path='/list-song' element = {<SongsList/>}/>
        </Routes>
      </div>
      </>) : (<>
      <SideBar/>
      <div className='flex-2 overflow-y-scroll bg-black  '>
         <Header/>
      </div>
      <div className='flex bg-black hidden lg:block p-2'>
        <Display/>
      </div>
      </>)}
    </div>
  )
}

export default App