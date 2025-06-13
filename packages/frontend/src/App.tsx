import { Route, Routes } from "react-router";
import { Home } from "./components/Home";
import { ForumPage } from "./components/ForumPage/ForumPage";
import { PostPage } from "./components/PostPage/PostPage";
import { LoginPage } from "./components/LoginRegister/LoginPage";
import { useState } from "react";
import { ProtectedRoute } from "./ProtectedRoutes";

function App() {
  const [token, setToken] = useState("")

  function handleToken(newToken: string) {
    setToken(newToken)
  }


  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/forums" 
        element={<ProtectedRoute authToken={token}>
          <ForumPage authToken={token}/>
        </ProtectedRoute>} 
      />

      <Route
        path="/forums/:id"
        element={<ProtectedRoute authToken={token}>
          <PostPage authToken={token}/>
        </ProtectedRoute>}
      />

      <Route path="/login" element={<LoginPage isRegistering={false} addToken={handleToken} />} />
      <Route path="/register" element={<LoginPage isRegistering={true} addToken={handleToken} />} />
    </Routes >
  );
}

export default App;
