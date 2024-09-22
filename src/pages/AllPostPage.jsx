/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import appwriteServices from '../appwrite/config';
import { Container, PostCard } from '../components';

function AllPostPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await appwriteServices.getAllPosts();
        if (response) {
          setPosts(response.documents);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className='w-full py-8 '>
      <Container>
        {loading ? (
          <div className='text-center py-10'>
            <h2 className='text-xl font-semibold text-gray-700'>Loading posts...</h2>
          </div>
        ) : (
          <div className='flex flex-wrap justify-center'>
            {posts.length === 0 ? (
              <h2 className='text-xl font-semibold text-gray-700'>No posts available</h2>
            ) : (
              posts.map((post) => (
                <div key={post.$id} className='p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                  <PostCard {...post} className="transition-transform duration-300 hover:scale-105" />
                </div>
              ))
            )}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPostPage;