import React from 'react'
import { Route, Routes,BrowserRouter as Router } from 'react-router-dom'
import Login from '../Components/Login/Login';
import Registration from '../Components/Registration/Registration';
import Profile from '../Components/Profilepage/Profilepage';


const Routing = () => {
  return (
    <Router>
        <Routes>
             <Route path='/' element={<Login/>}/>
             <Route path='/registration' element={<Registration/>}/>
             <Route path='/profile' element={<Profile/>}/>
        </Routes>
    </Router>
  )
}

export default Routing;