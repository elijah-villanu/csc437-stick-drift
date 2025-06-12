import { HeaderNav } from "../Header";
import { Footer } from "../Footer";
import { Search } from "./Search";
import { ForumBody } from "./ForumBody";
import '../styles.css'
import '../tokens.css'

export function ForumPage() {
    
    return (
        <div className="forum-page-body">
            <HeaderNav />
            <Search />
            <ForumBody  />
            <Footer />
        </div>
    )

}


