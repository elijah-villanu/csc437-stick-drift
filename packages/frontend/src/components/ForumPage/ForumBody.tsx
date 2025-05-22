/* eslint-disable @typescript-eslint/no-unused-vars */
import { ForumItem } from './ForumItem'
import '../styles.css'
import '../tokens.css'
import React from 'react'
// import { useState } from 'react'
import { nanoid } from 'nanoid'

interface IGameForumItem{
    id:string,
    name:string,
    content:string
}

interface IGameForumData{
    data:IGameForumItem[]
}

export function ForumBody(props:IGameForumData) {
    const [forums,setForums] = React.useState<IGameForumItem[]>(props.data)

    function addForum(){
        const newForum = {
            id:`forum-${nanoid()}`,
            name:"filler",
            content:"filler"
        }
        setForums([...forums,newForum])
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
            <section  className="forum-list">
                {initialForumList}
                <a className="add-button">
                    <button
                    onClick={addForum}> + </button>
                </a>
            </section>
        </div>
    )
}