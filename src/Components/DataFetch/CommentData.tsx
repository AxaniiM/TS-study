import React from "react";

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

interface CommentDataFetchProps {
  isClicked: boolean;
  comments: Comment[];
}

const CommentDataFetch: React.FC<CommentDataFetchProps> = ({ isClicked, comments }) => {
  return (
    <>
      {isClicked && (
        <ul>
          {comments.map((comment: Comment, index: number) => (
            <div key={index} className="">
              <li className="font-bold">{comment.id} | {comment.name} </li>
              <p>{comment.body}</p>
            </div>
          ))}
        </ul>
      )}
    </>
  );
};

export default CommentDataFetch;
