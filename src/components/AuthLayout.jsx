/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loading from './index'

function Protected({
    children,
    authentication = true,
}) {
    const navigate = useNavigate()
    const [loader,setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)
    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate('/login')
        }else if(!authentication && authStatus !== authentication){
            navigate('/')
        }
        setLoader(false)
    },[authStatus,authentication,navigate])
  return (
    loader ? 
    <div>
        <Loading type = 'bars' colors= 'purple'/>
    </div> : 
    <>{children}</>


  )
}

export default Protected