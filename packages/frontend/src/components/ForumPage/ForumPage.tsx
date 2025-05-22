import { HeaderNav } from "../Header";
import { Footer } from "../Footer";
import { Search } from "../Search";
import { ForumBody } from "./ForumBody";
import '../styles.css'
import '../tokens.css'

interface IGameForumItem{
    id:string,
    name:string,
    content:string
}

interface IGameForumData{
    data:IGameForumItem[]
}


export function ForumPage(props:IGameForumData) {
    return (
        <div className="forum-page-body">
            <HeaderNav />
            <Search />
            <ForumBody data={props.data}/>
            <Footer />
        </div>
    )

}


