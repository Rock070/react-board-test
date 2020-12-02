import PropTypes from 'prop-types';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getPosts } from `../../WebAPI.js`;


const HomePageTitle = styled.div`
  margin-top: 64px;
`

const PostContainer = styled.div`
  border-bottom: 1px solid rgba(0, 12, 34, 0.2)
  padding: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`

const PostTitle = styled.div`
  font-size: 24px;
`

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.8)
`

function Post({post}) {
  return (
      <PostContainer>
        <PostTitle>{post.title}</PostTitle>
        <PostDate>{newDate(post.createAt).toLocaleString()}</PostDate>
      </PostContainer>
  )
}

Post.PropTypes = {
  post: PropTypes.object
}
function HomePage() {
  const [posts, setPosts] = useState([])

  useEffect( ()=> {
    getPost.then( posts => setPost(posts))
  }, [])
  

  return (  
    <HomePageTitle>HomePage
      {post.map( post => { 
        <Post post={post} />
      })}
    </HomePageTitle>
    
  );
}
export default HomePage;