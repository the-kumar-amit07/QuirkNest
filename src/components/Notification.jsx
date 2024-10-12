/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { CircleCheckBig,TriangleAlert,CircleX  } from 'lucide-react';
import Button from './Button';

const icons = {
    success: <CircleCheckBig />,
    warning: <TriangleAlert />,
    error:<CircleX />
}
function Notification({
    type='info',
    message,
    onClose =()=>{}

}) {
    return (
        <div>
            <div className={`flex m-10 p-16 text-white align-center rounded-md shadow-lg ${type}`}>
                {/* icons */}
                {icons[type]}
                {/* messege */}
                {message}
                {/* closeButton */}
                <Button className='flex items-center ml-5 cursor-pointer'>
                    <CircleCheckBig />
                </Button>
            </div>
        </div>
    )
}

export default Notification