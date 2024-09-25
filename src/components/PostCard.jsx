/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import appwriteServices from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({
    $id, title, featuredImage
}) {
  if (!featuredImage) {
    console.error("Error: Missing featuredImage fileId");
    return <div>Error: No image available for this post</div>;
  }

  return (
    <div className="rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <img
        src={featuredImage ? appwriteServices.getFilePreview(featuredImage) : "path-to-placeholder.jpg"}
        alt={title}
        className="w-full h-auto object-cover"
      />
      <div className="p-4">
        <h1 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
          {title} <ArrowUpRight className="ml-2 h-5 w-5 text-gray-500" />
        </h1>
        <Link to={`/post/${$id}`}>
          <button
            type="button"
            className="w-full rounded-md bg-purple-700 px-3 py-2 text-sm font-semibold text-white hover:bg-purple-800 transition-colors"
          >
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PostCard;