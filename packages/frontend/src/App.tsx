import { Route, Routes } from "react-router";
import { Home } from "./components/Home";
import { ForumPage } from "./components/ForumPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forums" element={<ForumPage />} />
        </Routes>
    );
}



export default App;
