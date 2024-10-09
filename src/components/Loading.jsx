/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import ReactLoading from 'react-loading';

function Loading({
    type,
    color
}) {
  return (
    <div>
        <ReactLoading type={type} color={color} height={100} width={100}/>
    </div>
  )
}

export default Loading