import { ForumItem } from './ForumItem'
import '../styles.css'
import '../tokens.css'
import React from 'react'
import { nanoid } from 'nanoid'
import { ForumModal } from './ForumModal'
import { AddForumForm } from './AddForumForm'
import { useState } from 'react'
import type { IApiForumData } from "../../../../backend/src/shared/ApiForumData";



export function ForumBody() {
    const [forums, setForums] = React.useState<IApiForumData[]>([])
    const [forumModal, setForumModal] = useState(false)

    //Use action state

    function addForum(item: IApiForumData) {
        const newForum = {
            id: `forum-${nanoid()}`,
            name: item.name,
            content: item.content,
            game: item.game,
            author: item.author,
            comments: []
        }
        setForums([...forums, newForum])
    }



    function handleForumModal() {
        const currentModal = forumModal
        //No matter if true or false, do opposite
        setForumModal(!currentModal)
    }

    const initialForumList = forums?.map((f) =>
        f.id ? (
            <ForumItem
                id={f.id}
                key={f.id}
                name={f.name}
                content={f.content}
            />
        ) : null
    );



    return (
        <div className="forum-content">
            {forumModal ? (
                <ForumModal modalControl={handleForumModal}>
                    <AddForumForm submit={addForum} modalControl={handleForumModal} />
                </ForumModal>
            ) : null}
            <section className="forum-list">
                {initialForumList}
                <a className="add-button">
                    <button
                        onClick={handleForumModal}> + </button>
                </a>
            </section>
        </div>
    )
}