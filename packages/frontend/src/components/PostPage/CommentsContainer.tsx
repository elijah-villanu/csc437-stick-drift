import '../styles.css'
import '../tokens.css'

interface ICommentProps {
    id: string,
    profile: string,
    content: string
}

export function CommentsContainer(props: ICommentProps) {
    return (

        <section className="comment">
            <div className="comment-user">
                <div className="comment-user-info">
                    <img src="/profile.svg" alt="" />
                    <p>{props.profile}</p>
                </div>
                <hr />
                <p>
                    {props.content}
                </p>
            </div>
        </section>

    )
}