import { HeaderNav } from "./Header";
import { Footer } from "./Footer";
import './styles.css'
import './tokens.css'

export function Home() {
    return (
        <div className="home-page-body">
            <HeaderNav />
            <div
                className="image-block"
            >
                <p className="Big font">
                    GAMING <br />DISCUSSIONS.<br />
                    PERIOD.
                </p>
            </div>
            <div
                className="welcome-text"
            >
                <h2>GOT OPINIONS? STUCK ON A GAME?</h2>
                <div className="welcome-body">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>
            <Footer />
        </div>

    )
}



