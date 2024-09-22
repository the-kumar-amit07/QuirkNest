/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login,logout } from './store/authSlice';
import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from './components';



function App() {
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch()
  useEffect(()=>{
    authService.getCurrentUser()
    .then(
      (userData) =>{
        if (userData) {
          dispatch(login({userData}))
        }else{
          dispatch(logout())
        }
      }
    )
    .finally(
      ()=>setLoading(false)
      )
  },[])
  
  return !loading ? (
    <>
      <div className='flex flex-col min-h-screen'>
      <div className='fixed w-full bg-white z-50'>
        <Navbar />
      </div>
      <main className='flex-grow mt-16'> {/* Add margin-top to avoid overlap with navbar */}
        <Outlet />
      </main>
      <Footer />
    </div>
    </>
  ) : null
}

export default App
