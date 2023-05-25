import React, { useState } from "react";
import axios from "axios";
import ButtonDisplayItemsComponent from "./ButtonDisplayItemsComponent";
import CommentDataFetch from "./DataFetch/CommentData";
import PostDataFetch from "./DataFetch/PostDataComponent";

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

interface Post {
  id: number;
  title: string;
}

const PostContainer: React.FC = () => {
  const [isCommentClicked, setIsCommentClicked] = useState(false);
  const [isPostClicked, setIsPostClicked] = useState(false);
  const [commentData, setCommentData] = useState<Comment[]>([]);
  const [postData, setPostData] = useState<Post[]>([]);

  const toggleCommentVisibility = () => {
    setIsCommentClicked(prevState => !prevState);
    setIsPostClicked(false);
  };

  const togglePostVisibility = () => {
    setIsPostClicked(prevState => !prevState);
    setIsCommentClicked(false);
  };

  const fetchComments = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then(res => {
        const commentData: Comment[] = res.data.slice(0, 10);
        setCommentData(commentData);
      })
      .catch(err => console.log(err));
  };

  const fetchPosts = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(res => {
        const postData: Post[] = res.data.slice(0,10);
        setPostData(postData);
      })
      .catch(err => console.log(err));
  };

  const renderCommentComponent = () => {
    if (isCommentClicked) {
      if (commentData.length === 0) {
        fetchComments();
      }
      return <CommentDataFetch comments={commentData} isClicked={isCommentClicked} />;
    }
    return null;
  };
  

  const renderPostComponent = () => {
    if (isPostClicked) {
      if (postData.length === 0) {
        fetchPosts();
      }
      return <PostDataFetch posts={postData} isClicked={isPostClicked} />;
    }
    return null;
  };

  return (
    <div className="">
      <div className="">
        <ButtonDisplayItemsComponent
          name="Comment"
          onClick={toggleCommentVisibility}
        />
        <ButtonDisplayItemsComponent
          name="Post"
          onClick={togglePostVisibility}
        />
      </div>
      <div className="">
        {renderCommentComponent()}
        {renderPostComponent()}
      </div>
    </div>
  );
};

export default PostContainer;
