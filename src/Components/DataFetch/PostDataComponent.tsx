import React, { useState } from "react";
import axios from "axios";

interface Post {
  id: number;
  title: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

const PostDataFetch: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const [displayedCommentIds, setDisplayedCommentIds] = useState<number[]>([]);
  const [comments, setComments] = useState<{ [postId: number]: Comment[] }>({});

  const fetchComments = async (postId: number) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
      const fetchedComments: Comment[] = response.data;
      return fetchedComments;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const handleDisplayComment = async (postId: number) => {
    if (displayedCommentIds.includes(postId)) {
      setDisplayedCommentIds(prevIds => prevIds.filter(id => id !== postId));
    } else {
      setDisplayedCommentIds(prevIds => [...prevIds, postId]);
      if (!comments[postId]) {
        const fetchedComments = await fetchComments(postId);
        setComments(prevComments => ({
          ...prevComments,
          [postId]: fetchedComments,
        }));
      }
    }
  };

  return (
    <ul>
      {posts.map((post: Post) => (
        <div key={post.id} className="">
          <li className="font-bold">{post.id} | {post.title}</li>
          <p>{post.title}</p>
          <button onClick={() => handleDisplayComment(post.id)} className="border-2 border-gray-500 rounded-2xl hover:bg-gray-700 bg-gray-500 text-slate-50 px-2 my-1">
            Display Comments
          </button>
          {displayedCommentIds.includes(post.id) && comments[post.id] && (
            <ul>
              {comments[post.id].map((comment: Comment) => (
                <div key={comment.id} className="">
                  <li className="font-bold">{comment.id} | {comment.name}</li>
                  <p>{comment.body}</p>
                </div>
              ))}
            </ul>
          )}
        </div>
      ))}
    </ul>
  );
};

export default PostDataFetch;
