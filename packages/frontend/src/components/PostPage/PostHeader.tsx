import '../styles.css'
import '../tokens.css'

export function PostHeader() {
    return (
        <div className="post-heading">
            <h1>Stuck on the first world, also my switch runs warm on this game.</h1>
            <section className="post-metadata">
                <img src="/profile.svg" alt="" aria-hidden="true" />
                <p>user</p>
                <img src="/heart_icon.svg" alt="Like this post"/>
                <p>66</p>
                <img src="/share_arrow.svg" alt="Share this post"/>
                <p>2</p>
            </section>
            <h2>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure.
            </h2>
            <hr />
        </div>

    )


}