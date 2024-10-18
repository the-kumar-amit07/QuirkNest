/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Menu, X, CircleUserRound, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.jpg";
import { useSelector } from "react-redux";
import { Button, Input, UserProfile } from "./index";
// import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";

function Navbar() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileName, setProfileName] = useState("");
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick = (section) => {
    if (section === "userProfile") {
      setIsProfileOpen(!isProfileOpen);
    }
  };

  useEffect(() => {
    const name = () => {
      try {
        const user = userData;
        console.log("user : ", user);
        if (user) {
          const firstName = user.name.split(" ")[0];
          setProfileName(firstName);
        }
      } catch (error) {
        console.error(error);
      }
    };
    name();
  }, [userData]);

  // useEffect(() => {
  //   const name = async () => {
  //     try {
  //       const user = await authService.getCurrentUser()
  //       if (user) {
  //         const firstName = user.name.split(' ')[0]
  //         setUserName(firstName)
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   name()
  // },[])

  const searchUser = async (data) => {
    const { userName } = data;
    try {
      const user = await authService.searchByUsername(userName);
      if (user) {
        navigate(`/profile/${user.userName}`);
      } else {
        console.log("user not found");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while searching for the user");
    }
  };

  const menuItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Explore", slug: "/explore", active: true },
    { name: "My Posts", slug: "/all-post", active: authStatus },
    { name: "Create", slug: "/add-post", active: authStatus },
  ];

  const authMenuItems = [
    { name: "LogIn", slug: "/login", active: !authStatus },
    { name: "SignUp", slug: "/signup", active: !authStatus },
  ];

  return (
    <div className="relative w-full bg-white shadow-sm">
      <div className="mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center justify-between space-x-8">
          <Link to="/" className="flex items-center mt-1">
            <img src={Logo} alt="Logo" className="h-14 w-28 object-fill" />
          </Link>

          {/* Large Screen Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) =>
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => navigate(item.slug)}
                  className="text-base font-medium text-gray-700 hover:text-purple-900 transition"
                >
                  {item.name}
                </button>
              ) : null
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center w-[500px]">
          <form
            onSubmit={handleSubmit(searchUser)}
            className="flex w-full justify-between items-center space-x-2"
          >
            <Input
              placeholder="Search"
              type = "text"
              className="w-full h-10 px-4 py-2 text-sm bg-gray-100 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-900"
              {...register("userName", { required: true })}
            />
            {/* {error.userName && <p>{error.userName.message}</p>} */}
            <Button
              type="submit"
              className="bg-white  flex items-center justify-center rounded-r-lg  "
            >
              <Search className="h-8 w-8 object-cover text-gray-500 hover:text-purple-800" />
            </Button>
          </form>
        </div>

        {/* Auth Section */}
        <div className="hidden lg:flex items-center space-x-6">
          {authStatus ? (
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => handleClick("userProfile")}
            >
              <CircleUserRound className="h-10 w-10 rounded-full object-cover hover:text-purple-900" />
              <span className="text-sm text-gray-700 font-medium">
                Hi, {profileName ? profileName : "Guest"}
              </span>{" "}
              {/* Replace 'Amit' dynamically */}
            </div>
          ) : (
            authMenuItems.map(
              (item) =>
                item.active && (
                  <Button
                    className="text-white bg-purple-800 hover:bg-purple-900"
                    key={item.name}
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </Button>
                )
            )
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden z-50">
          {isMenuOpen ? (
            <X
              onClick={toggleMenu}
              className="h-6 w-6 cursor-pointer text-gray-800"
            />
          ) : (
            <Menu
              onClick={toggleMenu}
              className="h-6 w-6 cursor-pointer text-gray-800"
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-0 inset-x-0 z-40 bg-white p-4 shadow-lg rounded-lg">
          <nav className="space-y-4">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  toggleMenu();
                  navigate(item.slug);
                }}
                className="w-full text-left text-base font-medium text-gray-700 hover:text-black"
              >
                {item.name}
              </button>
            ))}
          </nav>
          <div className="mt-6">
            {authStatus ? (
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => handleClick("userProfile")}
              >
                <CircleUserRound className="h-10 w-10 rounded-full object-cover" />
                <span className="text-sm text-gray-700 font-medium">
                  Hi, {profileName ? profileName : "Guest"}
                </span>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                {authMenuItems.map(
                  (item) =>
                    item.active && (
                      <Button
                        key={item.name}
                        onClick={() => {
                          toggleMenu();
                          navigate(item.slug);
                        }}
                        className="w-full"
                      >
                        {item.name}
                      </Button>
                    )
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* User Profile Popup */}
      {isProfileOpen && <UserProfile onclose={() => setIsProfileOpen(false)} />}
    </div>
  );
}

export default Navbar;
