import '../styles.css'
import '../tokens.css'
import React, { useState } from 'react'

interface ISearchProps{
    search:(arg:string)=>void
}

export function Search(props:ISearchProps) {
    const searchBarId = React.useId();
    const [searchText,setSearchText] = useState("")

    function handleSearchText(event: React.ChangeEvent<HTMLInputElement>){
        const typed = event.target.value;
        setSearchText(typed)
    }

    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        // Prevent form default behavior of redirection
        e.preventDefault()
        props.search(searchText)
        // reset search state
        setSearchText("")
    }

    return (
        <section className="search-bar-area-container">
                <form className='search-bar-area' onSubmit={handleSubmit}>
                    <label htmlFor={searchBarId}></label>
                    <input id={searchBarId} type="search" placeholder="Search By Game Tag" 
                    onChange={handleSearchText}/>
                    <button type="submit" className="search-button">x</button>
                </form>
        </section>
    )
}