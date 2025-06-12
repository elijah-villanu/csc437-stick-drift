import { Route, Routes } from "react-router";
import { Home } from "./components/Home";
import { ForumPage } from "./components/ForumPage/ForumPage";
import { PostPage } from "./components/PostPage/PostPage";
import { LoginPage } from "./components/LoginRegister/LoginPage";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forums" element={<ForumPage />} />
      <Route
        path="/forums/:posts"
        element={<PostPage />}
      />
      <Route path="/login" element={<LoginPage isRegistering={false} />} />
      <Route path="/register" element={<LoginPage isRegistering={true} />} />
    </Routes>
  );
}

export default App;
