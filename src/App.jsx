/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login,logout } from './store/authSlice';
import { Outlet, useNavigate } from 'react-router-dom';
import { Footer, Navbar } from './components';



function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await authService.getCurrentUser()
        if (userData) {
          dispatch(login({userData}))
        }else{
          dispatch(logout())
        }
      } catch (error) {
        console.log("Error checking user session:", error);
        dispatch(logout());
      } finally {
        setLoading(false)
      }
    }
    checkUser()
  },[dispatch])
  
  return !loading ? (
    <>
      <div className='flex flex-col min-h-screen'>
      <div className='fixed w-full bg-white z-50'>
        <Navbar />
      </div>
      <main className='flex-grow mt-16'> {/* Add margin-top to avoid overlap with navbar */}
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
    </>
  ) : null
}

export default App
