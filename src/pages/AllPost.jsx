import React, { useEffect } from 'react'
import dbService from '../appwrite/config'
import { Container, PostCard } from '../components'


function AllPost() {
        const [posts , setPosts] = React.useState([])
        
        useEffect(()=> {
            dbService.getAllPosts([]).then((post) => {
                if(post){
                    setPosts(post.documents)
                }
            })
        },[])
        
  return (
    <div className='w-full'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post)=>{
                        <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard  post={post} />
                        </div>
                    })}
                </div>
            </Container>
    </div>
  )
}

export default AllPost