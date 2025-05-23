import { useState } from 'react'
import '../styles.css'
import '../tokens.css'

export function PostComments({onSubmit}:{onSubmit: (comm:string)=> void}) {
    const [textbox, setTextbox] = useState("")

    function handleTextbox(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const typed = event.target.value;
        setTextbox(typed)
    }

    function handleSubmit() {
        //Send comment content back to PostPage component
        onSubmit(textbox)
        //Reset box after submitted
        setTextbox("")
    }

    return (
        <div className="post-comments-container">
            <textarea
                id="comment-text-box"
                rows={5}
                cols={40}
                placeholder="Write here..."
                onChange={handleTextbox}
                value={textbox}
            ></textarea>
            <button className="post-comment-text"
                onClick={handleSubmit}>POST</button>
        </div>
    )
}