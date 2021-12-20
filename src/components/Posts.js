import React from 'react'
import Post from './Post'
const Posts = (props) => {
    return (
        <>
        <h1>Posts</h1>
        {props.posts.map((post) => (
        <Post key={post.id} post={post} onDelete={props.onDelete} />
        ))}
        
        
    </>
    )
}

export default Posts
