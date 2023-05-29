import React, { useState } from "react";
import axios from "axios";
import ButtonDisplayItemsComponent from "./ButtonDisplayItemsComponent";
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
  body: string;
}

const PostContainer: React.FC = () => {
  const [isPostClicked, setIsPostClicked] = useState(false);
  const [postData, setPostData] = useState<Post[]>([]);

  const togglePostVisibility = () => {
    setIsPostClicked(prevState => !prevState);
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
  

  const renderPostComponent = () => {
    if (isPostClicked) {
      if (postData.length === 0) {
        fetchPosts();
      }
      return <PostDataFetch posts={postData}/>;
    }
    return null;
  };

  return (
    <div className="">
        <ButtonDisplayItemsComponent
          name="Post"
          onClick={togglePostVisibility}
        />
        {renderPostComponent()}
      </div>
  );
};

export default PostContainer;
