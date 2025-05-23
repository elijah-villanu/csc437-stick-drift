// /* eslint-disable @typescript-eslint/no-unused-vars */
import { ForumItem } from './ForumItem'
import '../styles.css'
import '../tokens.css'
import React from 'react'
import { nanoid } from 'nanoid'
import { ForumModal } from './ForumModal'
import { AddForumForm } from './AddForumForm'
import { useState } from 'react'

export interface IForumItem {
    name: string,
    content: string
}

interface IGameForumItem extends IForumItem {
    id: string,
}

interface IGameForumData {
    data: IGameForumItem[],
}

export function ForumBody(props: IGameForumData) {
    const [forums, setForums] = React.useState<IGameForumItem[]>(props.data)
    const [forumModal, setForumModal] = useState(false)

    function addForum(item: IForumItem) {
        const newForum = {
            id: `forum-${nanoid()}`,
            name: item.name,
            content: item.content
        }
        setForums([...forums, newForum])
    }



    function handleForumModal() {
        const currentModal = forumModal
        //No matter if true or false, do opposite
        setForumModal(!currentModal)
    }

    const initialForumList = forums?.map((f) => (
        <ForumItem
            id={f.id}
            key={f.id}
            name={f.name}
            content={f.content}
        />
    ))


    return (
        <div className="forum-content">
            {forumModal ? (
                <ForumModal modalControl={handleForumModal}>
                    <AddForumForm submit={addForum} modalControl={handleForumModal}/>
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