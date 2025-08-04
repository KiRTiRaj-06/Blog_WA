import React, { useEffect } from 'react'
import {PostForm , Container } from '../components'
import dbService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'


function EditPost() {
        const [post, setPosts] = React.useState([])
        const {slug} = useParams()
        const navigate = useNavigate()

        useEffect(()=> { 
            dbService.getAllPosts().then(
                (post) =>{
                    if(post){
                        setPosts(post)
                    }else {
                        navigate('/')
                    }
                }
            )
        } ,[slug,navigate])
  return post? (
    <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
    </div>
  ) : null
}

export default EditPost