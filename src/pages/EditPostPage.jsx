/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import appwriteServies from '../appwrite/config'
import { Container, PostCardForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom'


function EditPostPage() {
    const [post, setPost] = useState([])
    const { slug } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (slug) {
            appwriteServies.getPosts(slug)
                .then((post) => {
                    setPost(post)
                })
        } else {
            navigate('/')
        }
    },[slug,navigate])
    return post ? (
        <div className='py-8'>
            <Container>
                <PostCardForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPostPage