/* eslint-disable no-unused-vars */
import React from 'react'
import { UserPen,Inbox,FileImage } from 'lucide-react';
import { Button } from '../components'
// import avatar from '../data/avatar.jpeg'



const UserProfile = () => {

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

  
  return (
    <div className='nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 shadow-xl '>
      <div className='flex justify-between items-center'>
        <p className='font-semibold text-lg dark:text-gray-200'>User Profile</p>
        <Button 
        color='rgb(153,171,180)'
        bgHoverColor='light-gray'
        size='2xl'
        borderRadius='50%'
        />
      </div>
      <div className='flex gap-5 items-center mt-6 border-color border-b-1 pb-6'>
        <img className='rounded-full h-20 w-20'  alt="user-profile" />
      <div>
        <p className='font-semibold text-xl dark:text-gray-200'>Amit Kumar Marndi</p>
        <p className='text-gray-500 text-sm dark:text-gray-400'>Developer</p> 
      </div>
    </div>
    <div>
      {userProfileData.map((item,index) => (
        <div key={index} 
          className='flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer dark:hover:bg-[#42464D]' >
          <button 
          type='button'
          style={{color:item.iconColor,backgroundColor:item.iconBg}}
          className='text-xl rounded-lg p-3 hover:bg-light-gray'>
            {item.icon}
          </button>    
          <div>
            <p className='font-semibold dark:text-gray-200'>{item.title}</p>
            <p className='text-gray-500 text-sm dark:text-gray-400'>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
    <div className='mt-5' >
      <Button
      color= 'white'
      bgColor= 'purple'
      text= 'Logout'
      borderRadius='10px'
      width='full'
      />
    </div>
    </div>
  
  )
}

export default UserProfile