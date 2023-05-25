import React from "react";
import { useState, useEffect } from "react";


interface Post {
  id: number;
  title: string;
  body: string;
}

const FetchData: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);


  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then((data: Post[]) => setPosts(data.slice(0, 10)))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <ul>
        {posts.map((post: Post, index: number) => (

          <div key={index}>
            <li>{post.id} </li>
            <p>{post.title}</p>
          </div>
        ))}
      </ul>
    </>
  );
};



export default FetchData;