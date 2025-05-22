import { HeaderNav } from "./Header";
import { Footer } from "./Footer";
import './styles.css'
import './tokens.css'
import { Search } from "./Search";
import { ForumBody } from "./ForumBody";

export function ForumPage() {
    return (
        <div className="forum-page-body">
            <HeaderNav />
            <Search />
            <ForumBody />
            <Footer />
        </div>
    )

}