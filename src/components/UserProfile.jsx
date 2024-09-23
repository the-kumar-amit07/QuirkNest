/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { UserPen,Inbox,FileImage,CircleX,CircleUserRound } from 'lucide-react';
import { Button } from './index'
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth'
import { logout } from '../store/authSlice';
// import avatar from '../data/avatar.jpeg'



const UserProfile = ({ onclose }) => {
  
  const dispatch = useDispatch()

  const userProfileData = [
    {
        icon: <UserPen/>,
        title: "My Profile",
        desc: "Account Settings",
        iconColor: "#03C9D7",
        iconBg: "#E5FAFB",
    },
    {
        icon: <Inbox />,
        title: "My Inbox",
        desc: "Messages & Emails",
        iconColor: "rgb(0, 194, 146)",
        iconBg: "rgb(235, 250, 242)",
    },
    {
        icon: <FileImage />,
        title: "My Post",
        desc: "To-do and Daily Tasks",
        iconColor: "rgb(255, 244, 229)",
        iconBg: "rgb(254, 201, 15)",
    },
  ];
  
  const handleLogout = () => {
    authService.logOut().then(() => {
      dispatch(logout())
    })
  }

  
  return (
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
        <p className='font-semibold text-xl '>Amit Kumar Marndi</p>
        <p className='text-gray-500 text-sm '>Developer</p> 
      </div>
    </div>
    <div>
      {userProfileData.map((item,index) => (
        <div key={index} 
          className='flex gap-5 border-b-1 border-color p-4 hover:bg-purple-300 cursor-pointer' >
          <button 
          type='button'
          style={{color:item.iconColor,backgroundColor:item.iconBg}}
          className='text-xl rounded-lg p-3 hover:bg-purple-300'>
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
  
  )
}

export default UserProfile