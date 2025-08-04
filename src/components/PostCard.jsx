import React from 'react'
import dbService from '../appwrite/config'
import { Link } from 'react-router-dom'


function PostCard({  $id,title,featuredImage}) {
    return (
        <Link to={`/post/${$id}`}>
                <div className='w-full rounded-xl p-4 bg-gray-300'>
                    <div className='w-full justify-center mb-4'>
                            <img src={dbService.getFilePreview(featuredImage)} alt={title}
                                className='rounded-xl border-gray-900'/>
                    </div>
                    <h2 className=' font-bold bg-purple-200'>{title}</h2>
                </div>
        </Link>
    )
}

export default PostCard
