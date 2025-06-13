import { HeaderNav } from "../Header";
import { Footer } from "../Footer";
import { PostHeader } from "./PostHeader";
import { CommentsContainer } from "./CommentsContainer";
import { PostComments } from "./PostComment";
import '../styles.css'
import '../tokens.css'
import React from "react";
import { useEffect } from "react";
import { nanoid } from "nanoid";
import { useParams } from "react-router";
import { type IApiForumData, type IApiCommentData } from "../../../../backend/src/shared/ApiForumData";


export function PostPage(props: { authToken: string }) {
    const [comments, setComments] = React.useState<IApiCommentData[]>([])
    const [forumData, setForumData] = React.useState<IApiForumData>()
    const { id } = useParams()

    const initialComments = comments?.map((comm) => (
        <CommentsContainer
            id={comm.id}
            key={comm.id}
            profile={comm.profile}
            content={comm.content}
        />
    ));

    async function getForumById() {
        const response = await fetch(`/api/forums/${id}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${props.authToken}` }
        });
        if (!response.ok) {
            return null;
        }
        const data = await response.json();

        // Although data is list, the query searches by id, can assume first is the correct item
        if (data) {
            const currentForum = data
            setForumData(currentForum)
        }

        const comments = data.comments as IApiCommentData[];
        setComments(comments)

    }

    async function addComment(commentContent: string) {
        const newComment = {
            id: `commid${nanoid()}`,
            profile: "temp",
            content: commentContent
        }
        const response = await fetch(`/api/forums/${id}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ props.authToken }`
            },
            body: JSON.stringify(newComment as IApiCommentData)
        });
        if (response.status >= 400) {
            console.log("error")
        }

        //Array spread syntax to append to existing comments
        setComments([...comments, newComment])
    }

    useEffect(() => {
        getForumById();
    }, []);


    return (
        <div className="forum-post-body">
            <HeaderNav />
            {forumData && <PostHeader data={forumData} />}
            <div className="comments-container">
                {initialComments}
            </div>
            <PostComments onSubmit={addComment} />
            <Footer />
        </div>
    )

}