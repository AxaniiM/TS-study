import React from "react";
import axios from "axios";
import { useState } from "react";

interface Comment {
    id: number;
    name: string;
    email: string;
    body: string;
}


const FetchAxios: React.FC = () => {
    const [comment, setComment] = useState<Comment[]>([])

    axios.get('https://jsonplaceholder.typicode.com/comments')
        .then(res => {
            const data: Comment[] = res.data.slice(0, 10)
            setComment(data)
        })
        .catch(err => console.log(err))

    return (
        <>
            <ul>
                {comment.map((comment: Comment, index: number) => (

                    <div key={index} className="git ">
                        <li>{comment.id} | {comment.name} </li>
                        <p>{comment.body}</p>
                    </div>
                ))}
            </ul>
        </>
    );
};



export default FetchAxios;