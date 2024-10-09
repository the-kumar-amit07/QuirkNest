/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Loading }from './index'

export default function Protected({
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
            <div className='flex justify-center items-center h-screen'>
                <Loading type='cubes' color='purple' />
            </div>
            : 
    <>{children}</>
    )
}

