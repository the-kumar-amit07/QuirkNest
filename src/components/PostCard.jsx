/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import appwriteServices from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({
    $id,title,featuredImage
})  {
    return (
      <div className="w-[300px] rounded-md border">
        <img
          src={appwriteServices.getFilePreview(featuredImage)}
          alt= {title}
          className="h-[200px] w-full rounded-t-md object-cover"
        />
        <div className="p-4">
          <h1 className="inline-flex items-center text-lg font-semibold">
            {title} &nbsp; <ArrowUpRight className="h-4 w-4" />
          </h1>
         
         <Link to={`/post/${$id}`}>
         <button
            type="button"
            className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Read
          </button></Link>
        </div>
      </div>
    )
  }
export default PostCard