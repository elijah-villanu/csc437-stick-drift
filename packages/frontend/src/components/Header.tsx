import './styles.css'
import './tokens.css'

export function HeaderNav(){
    return (
        <header>
            <nav>
                <h1>STICK_DRIFT</h1>
                <ul className="page-list">
                    <li><a href="/">HOME</a></li>
                    <li><a href="/forums">FORUMS</a></li>
                    <li><a href="/login">LOGIN/REGISTER</a></li>
                </ul>
            </nav>
        </header>
    )
};
