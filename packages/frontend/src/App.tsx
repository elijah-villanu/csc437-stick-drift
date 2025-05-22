import { Route, Routes } from "react-router";
import { Home } from "./components/Home";
import { ForumPage } from "./components/ForumPage/ForumPage";


const FORUMS = [
  {
    id: "forum-0", name: "The Game is mid.Overhyped. Am I the only one?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure."
  }
];

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forums" element={<ForumPage data={FORUMS}/>} />
        </Routes>
    );
}



export default App;
