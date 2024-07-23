/* eslint-disable no-unused-vars */
import React from 'react'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/Logo.jpg'
import { useSelector } from 'react-redux';


function Navbar() {

    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status)

    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen)
    }

    const menuItems = [
        {
          name: 'Home',
          slug: '/',
          active: true,
        },
        {
          name: 'About',
          slug: '/about',
          active: authStatus
        },
        {
          name: 'Post',
          slug: '/post',
          active: authStatus
        },
        {
            name: 'Add Post',
            slug: '/add-post',
            active: authStatus
        },
      ]

      const authMenuItems = [
        {
            name:'LogIn',
            slug:'/login',
            active: !authStatus
        },
        {
            name:"SignUp",
            slug:'/signup',
            active: !authStatus
        }
      ]
  
    return (
        <div className="relative w-full bg-white">
          <div className="mx-auto flex items-center justify-between px-4 py-2 sm:px-6 lg:px-4">
            <div className="inline-flex items-center space-x-2">
              <Link to='/'>
              <img src={Logo} alt="" className="rounded-sm h-32 w-32" />
              </Link>
            </div>
            <div className="hidden lg:block">
              <ul className="ml-12 inline-flex space-x-8">
                {menuItems.map((item) => 
                  item.active ? (
                    <li key={item.name}>
                    <button
                    onClick={()=> navigate(item.slug)}
                    className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
                     >
                      {item.name}
                      {/* <span>
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </span> */}
                    
                    </button>
                  </li>
                  ) : null
                )}
              </ul>
            </div>
            <div className="flex grow justify-end">
              <input
                className="flex h-10 w-[250px] rounded-md bg-gray-100 px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Serach"
              ></input>
            </div>
            <div className="ml-2 mt-2 hidden lg:block">
              <span className="relative inline-block">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
                  alt="Dan_Abromov"
                />
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-white"></span>
              </span>
            </div>
            <div className="ml-2 lg:hidden">
              <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
            </div>
            {isMenuOpen && (
              <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
                <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="px-5 pb-6 pt-5">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center space-x-2">
                        <Link
                        to='/'
                        >
                        <img src={Logo} alt="" className="rounded-sm h-32 w-32"  />
                        </Link>
                      </div>
                      <div className="-mr-2">
                        <button
                          type="button"
                          onClick={toggleMenu}
                          className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                          <span className="sr-only">Close menu</span>
                          <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-6">
                      <nav className="grid gap-y-4">
                        {menuItems.map((item) => (
                          <Link
                            key={item.name}
                            to={item.slug}
                            className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                          >
                            <button 
                            onClick={()=> navigate(item.slug)}
                              className="ml-3 text-base font-medium text-gray-900">
                              {item.name}
                            </button>
                            {/* <span>
                              <ChevronRight className="ml-3 h-4 w-4" />
                            </span> */}
                          </Link>
                        ))}
                      </nav>
                    </div>
                    <div className="ml-3 mt-4 flex items-center space-x-2">
                      <img
                        className="inline-block h-10 w-10 rounded-full"
                        src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
                        alt="Dan_Abromov"
                      />
                      <span className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">Dan Abromov</span>
                        <span className="text-sm font-medium text-gray-500">@dan_abromov</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )
}

export default Navbar;
