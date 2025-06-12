import { HeaderNav } from "../Header";
import { Footer } from "../Footer";
import { PostHeader } from "./PostHeader";
import { CommentsContainer } from "./CommentsContainer";
import { PostComments } from "./PostComment";
import '../styles.css'
import '../tokens.css'
import React from "react";
import { nanoid } from "nanoid";
// import { useParams } from "react-router";
import type { IApiCommentData } from "../../../../backend/src/shared/ApiForumData";


export function PostPage(){
    const [comments,setComments] = React.useState<IApiCommentData[]>([])
    // const {forumid} = useParams()

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
                {initialComments}
            </div>
            <PostComments onSubmit={addComment}/>
            <Footer />
        </div>
    )

}