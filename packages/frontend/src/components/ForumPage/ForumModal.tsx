import { useRef } from 'react'
import '../styles.css'
import '../tokens.css'

interface IForumModalProps {
    children: React.ReactNode
    modalControl: () => void
}

export function ForumModal(props: IForumModalProps) {
    const innerModalRef = useRef<HTMLDivElement | null>(null);

    function outsideModalClick(event: React.MouseEvent<HTMLInputElement>) {
        const innerModal = innerModalRef.current;
        
        if (innerModal !== null) {
            // Needs to be node
            const click = event.target as Node;
            if (!innerModal.contains(click)) {
                //Close Modal if the click is outside
                props.modalControl()
            }
        }

    }


    return (
        <div className="forum-background" onClick={outsideModalClick}>
            <div className="forum-modal"  ref={innerModalRef}>
                <header>
                    <h1>ADD_FORUM</h1>
                    <button className="close-button" onClick={props.modalControl}>CLOSE</button>
                </header>
                {/* Pass in children components */}
                {props.children}
            </div>
        </div>
    )
}