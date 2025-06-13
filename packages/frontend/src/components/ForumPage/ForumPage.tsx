import { HeaderNav } from "../Header";
import { Footer } from "../Footer";
import { Search } from "./Search";
import { ForumBody } from "./ForumBody";
import '../styles.css'
import '../tokens.css'
import type { IApiForumData } from "../../../../backend/src/shared/ApiForumData";
import React, { useRef,useEffect } from 'react'
import { nanoid } from 'nanoid'


export function ForumPage() {
    const [forums, setForums] = React.useState<IApiForumData[]>([])
    // const [isFetching, setIsFetching] = useState(true);
    // const [errorOcc, setErrorOcc] = useState(false);
    const ref = useRef(0);

    function handleAddForum(item: IApiForumData) {
        const newForum = {
            id: `forum-${nanoid()}`,
            name: item.name,
            content: item.content,
            game: item.game,
            author: item.author,
            comments: []
        }
        setForums([...forums, newForum])
    }

    function handleSearch(query: string) {
        //Send request with query params
        console.log(query)
    }

    async function getAllForumsRequest() {
        ref.current = ref.current + 1;
        const reqCount = ref.current;

        // Reset error state just in case
        // setErrorOcc(false)

        try {
            // setIsFetching(true)
            const response = await fetch('/api/forums', {
                method: "GET"
                // headers: { "Authorization": `Bearer ${token}` }
            });

            // Check for subsequent requests
            // Ignore if not the most recent request
            if (reqCount === ref.current) {
                // setIsFetching(false)
            } else return;

            if (response.status >= 400) {
                if (reqCount === ref.current) {
                    // setErrorOcc(true);
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
                // setErrorOcc(true)
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
            <ForumBody addForum={handleAddForum} data={forums} />
            <Footer />
        </div>
    )

}
