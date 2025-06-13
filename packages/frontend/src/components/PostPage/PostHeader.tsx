import '../styles.css'
import '../tokens.css'
import type { IApiForumData } from '../../../../backend/src/shared/ApiForumData'

interface IPostHeaderProps{
    data:IApiForumData
}

export function PostHeader(props:IPostHeaderProps) {
    const forumInfo = props.data

    return (
        <div className="post-heading">
            <h1>{forumInfo.name}</h1>
            <h2><b>GAME: {forumInfo.game}</b></h2>
            <section className="post-metadata">
                <img src="/profile.svg" alt="" aria-hidden="true" />
                <p>{forumInfo.author}</p>
                <img src="/heart_icon.svg" alt="Like this post"/>
                <p></p>
                <img src="/share_arrow.svg" alt="Share this post"/>
                <p></p>
            </section>
            <h2>
                {forumInfo.content}
            </h2>
            <hr />
        </div>

    )


}