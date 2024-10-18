/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout } from './components/index.js'
import {HomePage,LogInPage,SignUpPage,AllPostPage,AddPostPage,EditPostPage,PostPage, Explore, MyProfile, ChatPage} from './pages'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element:<HomePage/>
      },
      {
        path: "/explore",
        element: (
          <AuthLayout authentication>
            <Explore/>
          </AuthLayout>
        )
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication = {false}>
            <LogInPage/>
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication = {false}>
            <SignUpPage/>
          </AuthLayout>
        )
      },
      {
        path: "/all-post",
        element: (
          <AuthLayout authentication>
            {""}
            <AllPostPage/>
          </AuthLayout>
        )
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            {""}
            <AddPostPage/>
          </AuthLayout>
        )
      },
      {
        path: "/profile/:userName",
        element: (
          <AuthLayout authentication>
            {""}
            <MyProfile />
          </AuthLayout>
        )
      },
      {
        path: "/chat",
        element: (
          <AuthLayout authentication>
            {""}
            <ChatPage />
          </AuthLayout>
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            {""}
            <EditPostPage/>
          </AuthLayout>
        )
      },
      {
        path: "/post/:slug",
        element: <PostPage/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </>,
)
