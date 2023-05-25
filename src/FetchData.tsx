import React from "react";
import { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
}

const FetchData: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isClicked, setIsClicked] = useState(false)

  const toggleVisiblity = () => {
    setIsClicked(prevState => {
      if (prevState) {
        setPosts([])
      } else {
        fetchData()
      } return !prevState
    })
  }

  const fetchData = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then((data: Post[]) => setPosts(data.slice(0, 10)))
      .catch(err => console.log(err));
  };

  return (
    <>
      <button onClick={toggleVisiblity}>{isClicked? 'Hide Posts' : 'Display Posts'}</button>
    {isClicked && 
      <ul>
        {posts.map((post: Post, index: number) => (
          <div key={index}>
            <li>{post.id} | {post.title}</li>
          </div>
        ))}
      </ul>
      }
    </>
  );
};

export default FetchData;