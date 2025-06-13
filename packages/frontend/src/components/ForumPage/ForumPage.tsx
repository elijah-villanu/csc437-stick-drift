import { HeaderNav } from "../Header";
import { Footer } from "../Footer";
import { Search } from "./Search";
import { ForumBody } from "./ForumBody";
import '../styles.css'
import '../tokens.css'
import type { IApiForumData } from "../../../../backend/src/shared/ApiForumData";
import React, { useRef, useEffect, useState } from 'react'
import { nanoid } from 'nanoid'


export function ForumPage(props: { authToken: string }) {
    const [forums, setForums] = React.useState<IApiForumData[]>([])
    const [isFetching, setIsFetching] = useState(true);
    const [errorOcc, setErrorOcc] = useState(false);
    const ref = useRef(0);

    async function handleAddForum(item: IApiForumData) {
        ref.current = ref.current + 1;
        const reqCount = ref.current;

        setErrorOcc(false)

        const newForum = {
            id: `forum${nanoid()}`,
            name: item.name,
            content: item.content,
            game: item.game,
            author: item.author,
            comments: []
        }
        setIsFetching(true)
        const response = await fetch("/api/forums", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${props.authToken}`
            },
            body: JSON.stringify(newForum)
        });
        if (reqCount === ref.current) {
            if (response.status >= 400) {
                setErrorOcc(true)
                return
            }else setIsFetching(false)
        } else return
        //Only set state if response was successful
        setForums([...forums, newForum])
    }

    async function handleSearch(query: string) {
        const params = new URLSearchParams();
        ref.current = ref.current + 1;
        const reqCount = ref.current;

        setErrorOcc(false)

        // If search box is empty, just fetch all forums
        if (query === "") {
            getAllForumsRequest();
            return;
        } else {
            // Request to get all forums based on the game tag
            params.append("game", query)

            setIsFetching(true)
            const response = await fetch(`/api/forums/search?${params}`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${props.authToken}` }
            });

            if (reqCount === ref.current) {
                setIsFetching(false)
            } else return;

            // Catches all error responses
            if (response.status >= 400) {
                if (reqCount === ref.current) {
                    setErrorOcc(true);
                    return;
                } else return;
            }

            const parsed = await response.json();
            if (parsed) {
                setForums(parsed)
                return;
            }
        }
    }


    async function getAllForumsRequest() {
        ref.current = ref.current + 1;
        const reqCount = ref.current;

        // Reset error state just in case
        setErrorOcc(false)

        try {
            setIsFetching(true)
            const response = await fetch('/api/forums', {
                method: "GET",
                headers: { "Authorization": `Bearer ${props.authToken}` }
            });

            // Check for subsequent requests
            // Ignore if not the most recent request
            if (reqCount === ref.current) {
                setIsFetching(false)
            } else return;

            if (response.status >= 400) {
                if (reqCount === ref.current) {
                    setErrorOcc(true);
                    return;
                } else return;
            }

            const parsed = await response.json();
            if (parsed) {
                if (reqCount === ref.current) {
                    setForums(parsed)
                } else return;
            }


        } catch (error) {
            if (reqCount === ref.current) {
                setErrorOcc(true)
                console.log(error)
            } else return;
        }

    }
    useEffect(() => {
        getAllForumsRequest();
    }, []);


    return (
        <div className="forum-page-body">
            <HeaderNav />
            <Search search={handleSearch} />
            {isFetching &&
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw", //Gives full overlay with transparent background
                    height: "100vh",
                    backgroundColor: "rgba(0,0,0,0.8)",
                    zIndex: 9999, //Makes sure above all elements
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
                    aria-live="polite">
                    <h1 style={{ color: "white" }}>LOADING...</h1></div>
            }
            {errorOcc && <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.8)",
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
                aria-live="polite">
                <h1 style={{ color: "red" }}>Error Occured</h1></div>}
            <ForumBody addForum={handleAddForum} data={forums} />
            <Footer />
        </div>
    )

}
