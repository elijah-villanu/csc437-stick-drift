import { useState } from "react";
import type { IApiForumData } from "../../../../backend/src/shared/ApiForumData";
import { nanoid } from "nanoid";


// Make sure using the same interface
interface IAddForumFormProps {
    submit: (forum: IApiForumData) => void;
    modalControl:() => void;
}


export function AddForumForm(props: IAddForumFormProps) {
    const [textbox, setTextbox] = useState("")
    const [title, setTitle] = useState("")
    const [game,setGame] = useState("")
    
    function handleTextbox(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const typed = event.target.value;
        setTextbox(typed)
    }
    function handleTitle(event: React.ChangeEvent<HTMLInputElement>) {
        const typedTitle = event.target.value;
        setTitle(typedTitle)
    }
    function handleGameTag(event: React.ChangeEvent<HTMLInputElement>){
        const gameTyped = event.target.value
        setGame(gameTyped)
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        console.log({ title, textbox })
        const newForum = {
            id:nanoid(),
            name: title,
            content: textbox,
            game:game,
            author:"temp",
            comments:[]
        }
        props.submit(newForum)

        //This closes the modal after a forum is made
        props.modalControl();
    }

    return (
        <form className="forum-form" onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={handleTitle} placeholder="Forum Title"/>
            <textarea rows={5}
                cols={40}
                placeholder="Write here..."
                onChange={handleTextbox}
                value={textbox}
            />
            <input type="game-tag" value={game} onChange={handleGameTag} placeholder="Tagged Game"/>
            <button type="submit">POST</button>
        </form>
    )
}