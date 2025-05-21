import './styles.css'
import './tokens.css'

export function HeaderNav(){
    return (
        <header>
            <nav>
                <h1>STICK_DRIFT</h1>
                <ul className="page-list">
                    <li><a href="index.html">HOME</a></li>
                    <li><a href="forums.html">FORUMS</a></li>
                    <li><a href="login.html">LOGIN/REGISTER</a></li>
                </ul>
            </nav>
        </header>
    )
};
export function Footer() {
    return (
        <div className="footer">
            <img className="instagram" src="instagram.svg" />
        </div>
    )
}
