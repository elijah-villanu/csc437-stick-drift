import { ForumItem } from './ForumItem'
import '../styles.css'
import '../tokens.css'

import { ForumModal } from './ForumModal'
import { AddForumForm } from './AddForumForm'
import { useState } from 'react'
import type { IApiForumData } from "../../../../backend/src/shared/ApiForumData";

interface IForumBodyProps{
    addForum:(item:IApiForumData) => void;
    data: IApiForumData[];
}

export function ForumBody(props:IForumBodyProps) {
    const [forumModal, setForumModal] = useState(false)

    function handleForumModal() {
        const currentModal = forumModal
        //No matter if true or false, do opposite
        setForumModal(!currentModal)
    }

    const initialForumList = props.data?.map((f) =>
        f.id ? (
            <ForumItem
                id={f.id}
                key={f.id}
                name={f.name}
                content={f.content}
                game={f.game}
                author={f.author}
            />
        ) : null
    );



    return (
        <div className="forum-content">
            {forumModal ? (
                <ForumModal modalControl={handleForumModal}>
                    <AddForumForm submit={props.addForum} modalControl={handleForumModal} />
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