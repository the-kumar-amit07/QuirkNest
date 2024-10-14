/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from 'react'
import { UserPen,Inbox,FileImage,CircleX,CircleUserRound } from 'lucide-react';
import { Button } from './index'
import { useDispatch, useSelector } from 'react-redux';
import authService from '../appwrite/auth'
import { logout } from '../store/authSlice';
import { Bounce, toast,ToastContainer} from 'react-toastify';
// import avatar from '../data/avatar.jpeg'



const UserProfile = ({ onclose }) => {
  
  const dispatch = useDispatch()
  const userData = useSelector((state)=> state.auth.userData)
  const [userName, setUserName] = useState('')
  const [userMail, setUserMail] = useState('')
  

  const userProfileData = [
    {
        icon: <UserPen/>,
        title: "My Profile",
        desc: "Account Settings",
        iconColor: "purple",
        iconBg: "none",
    },
    {
        icon: <Inbox />,
        title: "My Inbox",
        desc: "Messages & Emails",
        iconColor: "purple",
        iconBg: "none",
    },
    {
        icon: <FileImage />,
        title: "My Post",
        desc: "To-do and Daily Tasks",
        iconColor: "purple",
        iconBg: "none",
    },
  ];

  useEffect(() => {
    const userDetail =  () => {
      try {
        const user = userData
          if (user) {
            setUserName(user.name)
            setUserMail(user.email)
          }
        } catch (error) {
          console.error(error)
        }
    }
    userDetail();
  }, [userData])
  
  
  const handleLogout = () => {
    toast.promise(
      authService.logOut(),
      {
        pending: "Logging Out...",
        info: "Logged Out successfully!",
      }
    ) .then(() => {
      setTimeout(() => {
        dispatch(logout())
      }, 100);
      onclose()
    })
  }

  
  return (
    <div>
          <div className='nav-item absolute right-1 top-16 bg-white p-8 rounded-lg w-96 shadow-xl '>
      <div className='flex justify-between items-center'>
        <p className='font-semibold text-lg'>User Profile</p>
        <Button 
          textColor='text-black'
          size='2xl'
          onClick={onclose}
          className='bg-white'
        >
          <CircleX />
        </Button>

      </div>
      <div className='flex gap-5 items-center mt-6 border-color border-b-1 pb-6'>
        <CircleUserRound className='rounded-full h-20 w-20'  alt="user-profile" />
      <div>
        <p className='font-semibold text-xl '>{userName ? userName : 'Guest'}</p>
        <p className='text-gray-500 text-sm '>{userMail}</p> 
      </div>
    </div>
    <div>
      {userProfileData.map((item,index) => (
        <div key={index} 
          className='flex gap-5 border-b-1 border-color p-4 rounded-md hover:bg-purple-400 hover:text-white cursor-pointer' >
          <button 
          type='button'
          style={{color:item.iconColor,backgroundColor:item.iconBg}}
          className='text-xl rounded-lg p-3'>
            {item.icon}
          </button>    
          <div>
            <p className='font-semibold'>{item.title}</p>
            <p className='text-gray-500 text-sm'>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
    <div className='mt-5' >
      <Button
      // textColor= 'white'
      // bgColor= 'bg-purple-'
      width='full'
      onClick={handleLogout}
      className="text-sm font-semibold bg-purple-800 hover:bg-purple-900 w-full"
        >
          Logout
      </Button>
    </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />

    </div>
    
  
  )
}

export default UserProfile