import React from "react";

interface Post {
  id: number;
  title: string;
}

interface PostDataFetchProps {
  isClicked: boolean;
  posts: Post[];
}

const PostDataFetch: React.FC<PostDataFetchProps> = ({ isClicked, posts }) => {
  return (
    <>
      {isClicked && (
        <ul>
          {posts.map((post: Post, index: number) => (
            <div key={index} className="">
              <li className="font-bold">{post.id} | {post.title} </li>
              <p>{post.title}</p>
            </div>
          ))}
        </ul>
      )}
    </>
  );
};

export default PostDataFetch;
