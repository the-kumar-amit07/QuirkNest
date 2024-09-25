/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import appwriteServices from '../appwrite/config';
import { Container, PostCard } from '../components';
import authService from '../appwrite/auth';
import Masonry from 'react-masonry-css';

function AllPostPage() {
  const [posts, setPosts] = useState([]);
  const [userId,setUserId] = useState('')
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          setUserId(user.$id)
          const userPosts = await appwriteServices.getUserPosts(user.$id)
          setPosts(userPosts.documents)
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Define the breakpoint columns for the Masonry layout
  const breakpointColumnsObj = {
    default: 5,
    1100: 4,
    800: 3,
    600: 2,
    400: 1
};

  return (
    <div className='w-full py-8  bg-gray-50 '>
      <Container>
        {loading ? (
          <div className='text-center py-10'>
            <h2 className='text-xl font-semibold text-gray-700'>Loading posts...</h2>
          </div>
        ) : (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className='my-masonry-grid'
              columnClassName="my-masonry-grid_column"
            >
            {posts.length === 0 ? (
              <h2 className='text-xl font-semibold text-gray-700'>No posts available</h2>
            ) : (
              posts.map((post) => (
                <div key={post.$id} className='mb-6 break-inside-avoid'>
                  <PostCard {...post} className="rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300" />
                </div>
              ))
            )}
          </Masonry>
        )}
      </Container>
    </div>
  );
}

export default AllPostPage;