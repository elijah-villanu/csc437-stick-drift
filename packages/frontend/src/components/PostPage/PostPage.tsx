import { HeaderNav } from "../Header";
import { Footer } from "../Footer";
import { PostHeader } from "./PostHeader";
import { CommentsContainer } from "./CommentsContainer";
import { PostComments } from "./PostComment";
import '../styles.css'
import '../tokens.css'
import React from "react";
import { nanoid } from "nanoid";


interface IComment{
    id:string,
    profile:string,
    content:string
}

interface IPostPageProps{
    data:IComment[]
}

export function PostPage(props:IPostPageProps){
    const [comments,setComments] = React.useState<IComment[]>(props.data)

    const initialComments = comments?.map((comm) => (
        <CommentsContainer 
            id={comm.id}
            key={comm.id}
            profile={comm.profile}
            content={comm.content}
        />
    ));

    function addComment(commentContent:string){
        console.log(commentContent)
        const newComment = {
            id:`commid-${nanoid()}`,
            profile:"temp",
            content:commentContent
        }
        //Array spread syntax to append to existing comments
        setComments([...comments,newComment])
    }

    return(
        <div className="forum-post-body">
            <HeaderNav />
            <PostHeader />
            <div className="comments-container">
                <hr />
                {initialComments}
            </div>
            <PostComments onSubmit={addComment}/>
            <Footer />
        </div>
    )

}