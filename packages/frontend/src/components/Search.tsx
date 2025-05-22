import './styles.css'
import './tokens.css'

export function Search() {
    return (
        <section className="search-bar-area-container">
            <div className="search-bar-area">
                <input type="search" placeholder="Search" />
                <button className="search-button">x</button>
            </div>
        </section>
    )
}