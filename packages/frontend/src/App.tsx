import { Route, Routes } from "react-router";
import { Home } from "./components/Home";
import { ForumPage } from "./components/ForumPage/ForumPage";
import { PostPage } from "./components/PostPage/PostPage";
import { LoginPage } from "./components/LoginRegister/LoginPage";
import type { IApiForumData } from "../../backend/src/shared/ApiForumData"
import { useState } from "react";


function App() {
  const [forumData,setForumData] = useState<IApiForumData[]>([])
  const [isFetching,setIsFetching] = useState(true)
  const [errorOcc,setErrorOcc] = useState(false)

  function forumChangeData(updatedData:IApiForumData[]){
    setForumData([...updatedData])
  }
  console.log(forumData);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forums" element={<ForumPage data={forumData} />} />
      <Route path="/forums/:posts" element={<PostPage data={forumData[0].comments} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<LoginPage />} />
    </Routes>
  );
}



export default App;
