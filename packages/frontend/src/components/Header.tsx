import { useEffect, useRef } from 'react'
import { Link } from 'react-router';
import './styles.css'
import './tokens.css'


export function HeaderNav() {
    // let [toggle,setToggle] = useState(false)
    const darkModeRef = useRef<HTMLInputElement>(null);
    // Checks localStorage on initial load
    useEffect(() => {
        const currentMode = localStorage.getItem("darkMode");
        if (currentMode === "true") {
            document.body.classList.add("dark-mode")
            if (darkModeRef.current) darkModeRef.current.checked = true;
        }
    }, [])
    function handleDarkModeToggle() {
        if (darkModeRef.current) {
            const isChecked = document.body.classList.toggle("dark-mode")
            localStorage.setItem("darkMode", String(isChecked))

        }

    }


    return (
        <header>
            <nav>
                <h1>STICK_DRIFT</h1>
                <ul className="page-list">
                    <li><Link to="/">HOME</Link></li>
                    <li><Link to="/forums">FORUMS</Link></li>
                    <li><Link to="/login">LOGIN/REGISTER</Link></li>
                    <li><label>
                        <input type="checkbox" ref={darkModeRef} onChange={handleDarkModeToggle} />
                        DARK MODE
                    </label></li>
                </ul>
            </nav>
        </header>
    )
};
