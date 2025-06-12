import '../styles.css'
import '../tokens.css'
import React from 'react'

export function Search() {
    const searchBarId = React.useId();

    return (
        <section className="search-bar-area-container">
                <form className='search-bar-area'>
                    <label htmlFor={searchBarId}></label>
                    <input id={searchBarId} type="search" placeholder="Search" />
                    <button className="search-button">x</button>
                </form>
        </section>
    )
}